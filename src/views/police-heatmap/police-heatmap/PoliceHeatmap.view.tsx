import LoadingOverlay from '#/components/shared-components/LoadingOverlay/LoadingOverlay';
import { useStoreState } from '#/state';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Layer, type MapRef, Map as MapboxMap, Source } from 'react-map-gl';

import type { DateRange } from './usePoliceHeatmap';

import PoliceHeatmapFilters from './components/PoliceHeatmapFilters';

interface Props {
  dateRange: DateRange;
  error: Error | undefined;
  geojsonData: GeoJSON.FeatureCollection;
  loading: boolean;
  onChangeDateRange: (value: DateRange) => void;
  setShowFilters: (value: boolean) => void;
  showFilters: boolean;
  totalCount: number;
}

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    position: 'relative',
    width: '100%',
  },
  errorContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    padding: 24,
  },
  toggleButton: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    left: 20,
    position: 'absolute',
    top: 20,
    zIndex: 10,
  },
});

const PoliceHeatmap: React.FC<Props> = ({
  dateRange,
  error,
  geojsonData,
  loading,
  onChangeDateRange,
  setShowFilters,
  showFilters,
  totalCount,
}) => {
  const classes = useStyles();
  const mapRef = useRef<MapRef>(null);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const mapStyle =
    currentTheme === 'dark'
      ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
      : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o';

  // Fit map to data bounds when data changes
  useEffect(() => {
    if (!mapRef.current || geojsonData.features.length === 0) return;

    const map = mapRef.current.getMap();

    // Wait for map to be loaded before fitting bounds
    const fitToBounds = () => {
      try {
        // Calculate bounds
        const coordinates = geojsonData.features.map((feature) => {
          const point = feature.geometry as GeoJSON.Point;
          return point.coordinates as [number, number];
        });

        if (coordinates.length === 0) return;

        // Create initial bounds from first coordinate
        const bounds = new mapboxgl.LngLatBounds(
          coordinates[0],
          coordinates[0]
        );
        // Extend bounds with remaining coordinates
        for (const coord of coordinates) {
          bounds.extend(coord);
        }

        console.log('Fitting to bounds:', bounds);

        map.fitBounds(bounds, {
          duration: 1000,
          maxZoom: 12,
          padding: {
            bottom: 100,
            left: showFilters ? 450 : 100,
            right: 100,
            top: 100,
          },
        });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    };

    // If map is already loaded, fit immediately
    if (map.isStyleLoaded()) {
      fitToBounds();
    } else {
      // Otherwise wait for load
      map.once('load', fitToBounds);
    }
  }, [geojsonData, showFilters]);

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Result
          extra={
            <Button onClick={() => window.location.reload()} type="primary">
              <FormattedMessage defaultMessage="Retry" />
            </Button>
          }
          status="error"
          subTitle={
            <FormattedMessage defaultMessage="There was an error loading the incident heatmap data. Please try again." />
          }
          title={<FormattedMessage defaultMessage="Failed to Load Heatmap" />}
        />
      </div>
    );
  }

  // Debug logging
  useEffect(() => {
    console.log('Heatmap data:', {
      firstFeature: geojsonData.features[0],
      totalFeatures: geojsonData.features.length,
    });
  }, [geojsonData]);

  return (
    <div className={classes.container}>
      <MapboxMap
        initialViewState={{
          latitude: 54.5, // UK center
          longitude: -3,
          zoom: 6,
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
      >
        <Source data={geojsonData} id="incidents-heatmap" type="geojson">
          <Layer
            id="heatmap-layer"
            paint={{
              // Color gradient from blue (low) to red (high)
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)',
              ],
              // Intensity increases with zoom
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3,
              ],
              // Opacity
              'heatmap-opacity': 0.8,
              // Radius increases with zoom
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                10,
                9,
                40,
              ],
              // Equal weight for all points
              'heatmap-weight': 1,
            }}
            type="heatmap"
          />
        </Source>
      </MapboxMap>

      {showFilters ? (
        <PoliceHeatmapFilters
          dateRange={dateRange}
          onChangeDateRange={onChangeDateRange}
          onClose={() => setShowFilters(false)}
          totalCount={totalCount}
        />
      ) : (
        <Button
          className={classes.toggleButton}
          icon={<EyeOutlined />}
          onClick={() => setShowFilters(true)}
          type="primary"
        >
          <FormattedMessage defaultMessage="Show Filters" />
        </Button>
      )}

      <LoadingOverlay visible={loading} />

      {!loading && geojsonData.features.length === 0 && (
        <div className={classes.errorContainer}>
          <Result
            status="info"
            subTitle={
              <FormattedMessage defaultMessage="No incidents match your current filters. Try expanding the date range or lowering the priority threshold." />
            }
            title={<FormattedMessage defaultMessage="No Incidents Found" />}
          />
        </div>
      )}
    </div>
  );
};

export default PoliceHeatmap;
