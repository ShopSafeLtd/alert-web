import type { FeatureCollection } from 'geojson';
import type { FillLayer, LineLayer } from 'react-map-gl';

import React, { useEffect, useState } from 'react';
import { Layer, Source } from 'react-map-gl';

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
  visible,
}: {
  colourMode: 'multi' | 'single';
  visible: boolean;
}) => {
  const [data, setData] = useState<FeatureCollection | null>(null);

  const fillLayer: FillLayer = {
    id: 'london-police-fill',
    paint: {
      'fill-color': colourMode === 'multi' ? ['get', 'color'] : '#3288bd',
      'fill-opacity': 0.5,
    },
    source: 'london-police',
    type: 'fill',
  };

  useEffect(() => {
    fetch('/geojson/London_Boroughs.coloured.geojson')
      .then((res) => res.json())
      .then((json: FeatureCollection) => setData(json))
      .catch((error) => {
        console.error('Failed to load London boroughs:', error);
      });
  }, []);

  console.log('LondonPoliceLayer data:', !!data, 'visible:', visible);
  if (!data || !visible) return null;

  return (
    <>
      <Source data={data} id="london-police" type="geojson">
        <Layer {...fillLayer} />
        <Layer {...lineLayer} />
      </Source>
    </>
  );
};

export default LondonPoliceLayer;
