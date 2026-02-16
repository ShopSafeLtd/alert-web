import type { FeatureCollection } from 'geojson';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Popup, Source } from 'react-map-gl';

const lineLayer: LineLayer = {
  id: 'police-line',
  paint: {
    'line-color': '#000',
    'line-width': 1,
  },
  source: 'police-data',
  type: 'line',
};

const PoliceLayer = ({
  colourMode,
  incidents,
  mapRef,
  visible,
}: {
  colourMode: 'multi' | 'single';
  incidents: {
    lat: number;
    lng: number;
  }[];
  mapRef: React.RefObject<MapRef>;
  visible: boolean;
}) => {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    incidentCount: number;
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  const fillLayer: FillLayer = {
    id: 'police-fill',
    paint: {
      'fill-color': colourMode === 'multi' ? ['get', 'color'] : '#3288bd',
      'fill-opacity': 0.5,
    },
    source: 'police-data',
    type: 'fill',
  };

  useEffect(() => {
    fetch('/geojson/Police_Areas.coloured.geojson')
      .then((res) => res.json())
      .then((json: FeatureCollection) => setData(json))
      .catch((error) => {
        console.error('Failed to load police areas:', error);
      });
  }, []);

  useEffect(() => {
    if (!data || !mapRef?.current) return;
    const map = mapRef.current.getMap();
    if (!map) return;

    const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['police-fill'],
      });
      if (features.length > 0) {
        const featureData = features[0];
        const { name } = featureData.properties as { name: string };
        const [lng, lat] = e.lngLat.toArray();
        const areaFeature = {
          geometry: featureData.geometry as
            | GeoJSON.MultiPolygon
            | GeoJSON.Polygon,
          properties: featureData.properties,
          type: 'Feature',
        } as GeoJSON.Feature<GeoJSON.MultiPolygon | GeoJSON.Polygon>;

        let count = 0;
        for (const { lat: ilat, lng: ilng } of incidents) {
          const incidentPoint = point([ilng, ilat]);
          if (booleanPointInPolygon(incidentPoint, areaFeature)) {
            count += 1;
          }
        }
        setHoverInfo({ incidentCount: count, lat, lng, name });
      } else {
        setHoverInfo(null);
      }
    };

    const handleMouseLeave = () => setHoverInfo(null);

    map.on('mousemove', 'police-fill', handleMouseMove);
    map.on('mouseleave', 'police-fill', handleMouseLeave);

    return () => {
      map.off('mousemove', 'police-fill', handleMouseMove);
      map.off('mouseleave', 'police-fill', handleMouseLeave);
    };
  }, [data, mapRef, incidents]);

  if (!data || !visible) return null;

  return (
    <>
      <Source data={data} id="police" type="geojson">
        <Layer {...fillLayer} />
        <Layer {...lineLayer} />
      </Source>
      {hoverInfo && (
        <Popup
          anchor="bottom-right"
          closeButton={false}
          closeOnClick={true}
          latitude={hoverInfo.lat}
          longitude={hoverInfo.lng}
        >
          <div style={{ margin: 10, padding: 5 }}>
            <strong>{hoverInfo.name}</strong>
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

export default PoliceLayer;
