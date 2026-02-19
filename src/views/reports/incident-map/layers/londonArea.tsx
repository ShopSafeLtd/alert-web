import type { FeatureCollection } from 'geojson';
import type { Expression } from 'mapbox-gl';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Popup, Source } from 'react-map-gl';

const lineLayer: LineLayer = {
  id: 'london-police-line',
  paint: {
    'line-color': '#000',
    'line-width': 1,
  },
  source: 'london-police',
  type: 'line',
};

const LondonPoliceLayer = ({
  colourMode,
  incidents,
  mapRef,
  useBcuColour,
  visible,
}: {
  colourMode: 'multi' | 'single';
  incidents: {
    lat: number;
    lng: number;
  }[];
  mapRef: React.RefObject<MapRef>;
  useBcuColour: boolean;
  visible: boolean;
}) => {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    bcu: string;
    incidentCount: number;
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  const getColour = (): Expression | string => {
    if (useBcuColour) {
      return ['get', 'regionColor'];
    }
    if (colourMode === 'multi') {
      return ['get', 'color'];
    }
    return '#3288bd';
  };

  const fillLayer: FillLayer = {
    id: 'london-police-fill',
    paint: {
      'fill-color': getColour(),
      'fill-opacity': 0.5,
    },
    source: 'london-police',
    type: 'fill',
  };

  useEffect(() => {
    if (!data || !mapRef.current) return;

    const map = mapRef.current.getMap();
    if (!map) return;

    const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['london-police-fill'],
      });
      if (features.length > 0) {
        const featureData = features[0];
        const { bcu, name } = featureData.properties as {
          bcu: string;
          name: string;
        };
        const [lng, lat] = e.lngLat.toArray();
        let count = 0;
        const boroughFeature = {
          geometry: featureData.geometry as
            | GeoJSON.MultiPolygon
            | GeoJSON.Polygon,
          properties: featureData.properties,
          type: 'Feature',
        } as GeoJSON.Feature<GeoJSON.MultiPolygon | GeoJSON.Polygon>;
        for (const { lat: ilat, lng: ilng } of incidents) {
          const incidentPoint = point([ilng, ilat]);
          if (booleanPointInPolygon(incidentPoint, boroughFeature)) {
            count += 1;
          }
        }
        setHoverInfo({ bcu, incidentCount: count, lat, lng, name });
      } else {
        setHoverInfo(null);
      }
    };

    const handleMouseLeave = () => setHoverInfo(null);

    map.on('mousemove', 'london-police-fill', handleMouseMove);
    map.on('mouseleave', 'london-police-fill', handleMouseLeave);

    return () => {
      map.off('mousemove', 'london-police-fill', handleMouseMove);
      map.off('mouseleave', 'london-police-fill', handleMouseLeave);
    };
  }, [data, mapRef, incidents]);

  useEffect(() => {
    fetch('/geojson/London_Boroughs.bcu.geojson')
      .then((res) => res.json())
      .then((json: FeatureCollection) => setData(json))
      .catch((error) => {
        console.error('Failed to load London boroughs:', error);
      });
  }, []);

  if (!data || !visible) return null;

  return (
    <>
      <Source data={data} id="london-police" type="geojson">
        <Layer {...fillLayer} />
        <Layer {...lineLayer} />
      </Source>
      {hoverInfo && (
        <Popup
          anchor="top-left"
          closeButton={false}
          closeOnClick={true}
          latitude={hoverInfo.lat}
          longitude={hoverInfo.lng}
        >
          <div style={{ margin: 10, padding: 5 }}>
            <strong>{hoverInfo.bcu}</strong>
            <br />
            {hoverInfo.name}
            <br />
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <FormattedMessage defaultMessage="Incidents " />{' '}
            {hoverInfo.incidentCount}
          </div>
        </Popup>
      )}
    </>
  );
};

export default LondonPoliceLayer;
