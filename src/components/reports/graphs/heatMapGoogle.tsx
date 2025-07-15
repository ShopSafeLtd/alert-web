import type { LngLatBoundsLike } from 'mapbox-gl';
import type { MapRef } from 'react-map-gl';

import { Empty, Space, Switch, Typography } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Layer, Map, Source } from 'react-map-gl';

import { useStoreState } from '../../../state';

const ClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        10,
        '#f1f075',
        50,
        '#f28cb1',
        100,
        '#ff6b6b',
      ],
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'point_count'],
        // When point count is 2, radius is 15
        2,
        15,
        // When point count is 10, radius is 20
        10,
        20,
        // When point count is 50, radius is 25
        50,
        25,
        // When point count is 100, radius is 30
        100,
        30,
        // When point count is 500, radius is 40
        500,
        40,
        // When point count is 1000+, radius is 50
        1000,
        50,
      ],
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2,
    }}
    source="incidents"
    type="circle"
  />
);

const ClusterCountLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="cluster-count"
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['get', 'point_count'],
        2,
        12,
        100,
        14,
        1000,
        16,
      ],
    }}
    paint={{
      'text-color': '#ffffff',
      'text-halo-color': 'rgba(0, 0, 0, 0.5)',
      'text-halo-width': 1,
    }}
    source="incidents"
    type="symbol"
  />
);

const UnClusteredLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-point"
    paint={{
      'circle-color': '#11b4da',
      'circle-radius': 8,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1,
    }}
    source="incidents"
    type="circle"
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    paint={{
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3],
        ],
      },
      'heatmap-opacity': 0.3,
      'heatmap-radius': {
        stops: [
          [11, 15],
          [15, 30],
        ],
      },
      'heatmap-weight': 1,
      // 'heatmap-intensity': {
      //   stops: [
      //     [11, 1],
      //     [15, 3]
      //   ]
      // },
    }}
    source="incidents"
    type="heatmap"
  />
);

const HeatMapGoogle = ({
  data,
  emptyLabel,
  height,
  isPrinting,
  markers: _,
}: {
  data:
    | Array<{
        geoLat?: null | number | undefined;
        geoLng?: null | number | undefined;
      } | null>
    | null
    | undefined;
  emptyLabel: string;
  height?: string;
  isPrinting: boolean;
  label: string;
  markers?: Array<{
    key: string;
    label: string;
    position: {
      lat: number;
      lng: number;
    };
  }>;
}) => {
  const mapRef = useRef<MapRef>(null);
  const intl = useIntl();

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark' && !isPrinting;
  const [viewMode, setViewMode] = useState<'clusters' | 'heatmap'>('heatmap');
  const [zoom, setZoom] = useState(6);

  // Force re-render of source when zoom crosses threshold
  const zoomLevel = Math.floor(zoom / 2); // Group zoom levels

  // Calculate dynamic cluster radius based on zoom level
  const clusterRadius = useMemo(() => {
    // Higher zoom = smaller radius (more granular clusters)
    if (zoom < 5) return 120;
    if (zoom < 8) return 100;
    if (zoom < 10) return 80;
    if (zoom < 12) return 60;
    if (zoom < 14) return 40;
    if (zoom < 16) return 30;
    return 20;
  }, [zoom]);

  // Calculate bounds from data points
  const bounds = useMemo(() => {
    if (!data || data.length === 0) return null;

    const validPoints = data.filter((point) => point?.geoLat && point?.geoLng);
    if (validPoints.length === 0) return null;

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    for (const point of validPoints) {
      if (point?.geoLng && point?.geoLat) {
        minLng = Math.min(minLng, point.geoLng);
        maxLng = Math.max(maxLng, point.geoLng);
        minLat = Math.min(minLat, point.geoLat);
        maxLat = Math.max(maxLat, point.geoLat);
      }
    }

    // Add padding to bounds (about 10% on each side)
    const lngPadding = (maxLng - minLng) * 0.1;
    const latPadding = (maxLat - minLat) * 0.1;

    // If all points are at the same location, add a fixed padding
    const finalLngPadding = lngPadding || 0.01;
    const finalLatPadding = latPadding || 0.01;

    return [
      [minLng - finalLngPadding, minLat - finalLatPadding], // Southwest
      [maxLng + finalLngPadding, maxLat + finalLatPadding], // Northeast
    ] as LngLatBoundsLike;
  }, [data]);

  // Fit map to bounds when data changes
  useEffect(() => {
    if (bounds && mapRef.current) {
      const map = mapRef.current.getMap();
      if (map) {
        // Wait for map to be fully loaded
        if (map.isStyleLoaded()) {
          map.fitBounds(bounds, {
            duration: 1000, // Animation duration
            maxZoom: 15, // Don't zoom in too close
            padding: 50, // Additional padding in pixels
          });
        } else {
          map.once('styledata', () => {
            map.fitBounds(bounds, {
              duration: 1000,
              maxZoom: 15,
              padding: 50,
            });
          });
        }
      }
    }
  }, [bounds]);

  useEffect(() => {
    // Only move layers if we're in cluster mode
    if (viewMode === 'clusters') {
      mapRef.current?.moveLayer('unclustered-point');
      mapRef.current?.moveLayer('clusters');
      mapRef.current?.moveLayer('cluster-count');
    }
  }, [viewMode]);

  return (
    <div
      className="no-break"
      style={{ height: '100%', position: 'relative', width: '100%' }}
    >
      {data && data.length > 0 ? (
        <>
          <div
            style={{
              background: isDark
                ? 'rgba(30, 30, 30, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              borderRadius: 4,
              boxShadow: isDark
                ? '0 2px 4px rgba(0,0,0,0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)',
              padding: '8px 12px',
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 1,
            }}
          >
            <Space>
              <Typography.Text
                style={{ color: isDark ? '#ffffff' : undefined }}
              >
                {intl.formatMessage({ defaultMessage: 'View Mode:' })}
              </Typography.Text>
              <Switch
                checked={viewMode === 'clusters'}
                checkedChildren="Clusters"
                onChange={(checked) =>
                  setViewMode(checked ? 'clusters' : 'heatmap')
                }
                unCheckedChildren="Heatmap"
              />
            </Space>
          </div>
          <Map
            initialViewState={{
              latitude: 53.5,
              longitude: -2,
              zoom: 6,
            }}
            mapLib={mapboxgl}
            mapStyle={
              isDark
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            onError={() => {}}
            onZoom={(e) => setZoom(e.viewState.zoom)}
            preserveDrawingBuffer
            ref={mapRef}
            style={{ height, width: '100%' }} // will need to dynamically work out based on container size
          >
            <Source
              cluster={viewMode === 'clusters'}
              clusterMaxZoom={20}
              clusterMinPoints={2}
              clusterProperties={
                {
                  // Add custom cluster properties if needed
                }
              }
              clusterRadius={clusterRadius}
              data={{
                features:
                  data
                    ?.filter((latLng) => latLng?.geoLat && latLng.geoLng)
                    .map((latLng) => ({
                      geometry: {
                        coordinates: [latLng?.geoLng || 0, latLng?.geoLat || 0],
                        type: 'Point',
                      },
                      properties: {},
                      type: 'Feature',
                    })) || [],
                type: 'FeatureCollection',
              }}
              id="incidents"
              key={`incidents-${zoomLevel}-${viewMode}`}
              type="geojson"
            >
              {viewMode === 'clusters' ? (
                <>
                  {ClusterLayer}
                  {ClusterCountLayer}
                  {UnClusteredLayer}
                </>
              ) : (
                HeatMapLayer
              )}
            </Source>
          </Map>
        </>
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default HeatMapGoogle;
