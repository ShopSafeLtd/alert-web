import type { CircleLayer, SymbolLayer } from 'react-map-gl';

import { bcrpGeoJSON } from '#/views/reports/incident-map/data/bcrpLocations';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

// BCRP marker layer styling - using green to distinguish from cameras (red) and incidents (blue)
export const bcrpMarkerLayer: CircleLayer = {
  id: 'bcrp-points',
  paint: {
    'circle-color': '#059669', // Emerald green for BCRP partnerships
    'circle-opacity': 0.85,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      3, // Very small at country level
      8,
      5, // Small at regional level
      12,
      9, // Medium at city level
      16,
      15, // Large at street level
    ],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 16, 3],
  },
  source: 'bcrp',
  type: 'circle',
};

// BCRP outer ring for visual emphasis
export const bcrpRingLayer: CircleLayer = {
  id: 'bcrp-ring',
  paint: {
    'circle-color': 'transparent',
    'circle-opacity': 1,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      5,
      8,
      8,
      12,
      14,
      16,
      22,
    ],
    'circle-stroke-color': '#059669',
    'circle-stroke-opacity': 0.4,
    'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 5, 1, 16, 2],
  },
  source: 'bcrp',
  type: 'circle',
};

// BCRP initiative name labels (shown at medium zoom)
export const bcrpNameLayer: SymbolLayer = {
  id: 'bcrp-names',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'initiative'],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-max-width': 14,
    'text-offset': [0, 1.3],
    'text-size': ['interpolate', ['linear'], ['zoom'], 8, 9, 12, 11, 16, 13],
  },
  minzoom: 8,
  paint: {
    'text-color': '#047857', // Darker green
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.5,
  },
  source: 'bcrp',
  type: 'symbol',
};

// BCRP postcode labels (shown at higher zoom)
export const bcrpPostcodeLayer: SymbolLayer = {
  id: 'bcrp-postcodes',
  layout: {
    'text-anchor': 'bottom',
    'text-field': ['get', 'postcode'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
    'text-offset': [0, -1.3],
    'text-size': 10,
  },
  minzoom: 12,
  paint: {
    'text-color': '#065f46', // Even darker green
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'bcrp',
  type: 'symbol',
};

// BCRP address labels (shown at very high zoom)
export const bcrpAddressLayer: SymbolLayer = {
  id: 'bcrp-addresses',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'address'],
    'text-font': ['DIN Offc Pro Regular', 'Arial Unicode MS Regular'],
    'text-max-width': 16,
    'text-offset': [0, 2.3],
    'text-size': 9,
  },
  minzoom: 14,
  paint: {
    'text-color': '#6b7280', // Gray for address details
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'bcrp',
  type: 'symbol',
};

interface BCRPLayerProps {
  showDetailedLabels?: boolean;
  showLabels?: boolean;
  visible: boolean;
}

const BCRPLayer: React.FC<BCRPLayerProps> = ({
  showDetailedLabels = false,
  showLabels = true,
  visible,
}) => {
  if (!visible) return null;

  return (
    <>
      <Source data={bcrpGeoJSON} id="bcrp" type="geojson">
        <Layer {...bcrpRingLayer} />
        <Layer {...bcrpMarkerLayer} />
        {showLabels && (
          <>
            <Layer {...bcrpNameLayer} />
            <Layer {...bcrpPostcodeLayer} />
            {showDetailedLabels && <Layer {...bcrpAddressLayer} />}
          </>
        )}
      </Source>
    </>
  );
};

export default BCRPLayer;
