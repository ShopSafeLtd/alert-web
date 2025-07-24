import type { FeatureCollection } from 'geojson';
import type { FillLayer, LineLayer } from 'react-map-gl';

import React, { useEffect, useState } from 'react';
import { Layer, Source } from 'react-map-gl';

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
  visible,
}: {
  colourMode: 'multi' | 'single';
  visible: boolean;
}) => {
  const [data, setData] = useState<FeatureCollection | null>(null);

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

  if (!data || !visible) return null;

  return (
    <>
      <Source data={data} id="police" type="geojson">
        <Layer {...fillLayer} />
        <Layer {...lineLayer} />
      </Source>
    </>
  );
};

export default PoliceLayer;
