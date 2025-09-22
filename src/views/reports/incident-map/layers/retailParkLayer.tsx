import type { CircleLayer, FillLayer, SymbolLayer } from 'react-map-gl';

import { retailParkGeoJSON } from '#/views/reports/incident-map/data/retailParkLocations';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

// Retail park area layer - shows a filled polygon effect at higher zooms
export const retailParkAreaLayer: FillLayer = {
  id: 'retail-park-areas',
  minzoom: 13,
  paint: {
    'fill-color': '#f59e0b', // Amber color for retail parks
    'fill-opacity': 0.1,
  },
  source: 'retail-parks',
  type: 'fill',
};

// Retail park marker layer - amber/orange squares to distinguish from other circular markers
export const retailParkMarkerLayer: CircleLayer = {
  id: 'retail-park-points',
  paint: {
    'circle-color': '#f59e0b', // Amber for retail/shopping
    'circle-opacity': 0.9,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      2, // Tiny at country level
      8,
      4, // Small at regional level
      11,
      7, // Medium at city level
      14,
      11, // Large at district level
      17,
      16, // Extra large at street level
    ],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      0.5,
      17,
      2.5,
    ],
  },
  source: 'retail-parks',
  type: 'circle',
};

// Retail park diamond/square outline for visual distinction
export const retailParkOutlineLayer: CircleLayer = {
  id: 'retail-park-outline',
  paint: {
    'circle-color': 'transparent',
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      4,
      8,
      7,
      11,
      12,
      14,
      18,
      17,
      24,
    ],
    'circle-stroke-color': '#f59e0b',
    'circle-stroke-opacity': 0.3,
    'circle-stroke-width': 1.5,
  },
  source: 'retail-parks',
  type: 'circle',
};

// Shopping cart icon layer (would require custom icon)
export const retailParkIconLayer: SymbolLayer = {
  id: 'retail-park-icons',
  layout: {
    'icon-allow-overlap': false,
    'icon-anchor': 'center',
    'icon-image': 'shop-15', // Mapbox default shop icon
    'icon-size': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 14, 1, 17, 1.5],
    'text-allow-overlap': false,
    'text-anchor': 'top',
    'text-field': '', // No text with icons to avoid clutter
    'text-optional': true,
  },
  minzoom: 12,
  paint: {
    'icon-opacity': 0.8,
  },
  source: 'retail-parks',
  type: 'symbol',
};

// Retail park name labels
export const retailParkNameLayer: SymbolLayer = {
  id: 'retail-park-names',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'name'],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-max-width': 12,
    'text-offset': [0, 1.2],
    'text-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10,
      8,
      12,
      10,
      15,
      12,
      17,
      14,
    ],
  },
  minzoom: 10,
  paint: {
    'text-color': '#d97706', // Darker amber
    'text-halo-blur': 0.5,
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.5,
  },
  source: 'retail-parks',
  type: 'symbol',
};

// Retail park postcode labels
export const retailParkPostcodeLayer: SymbolLayer = {
  id: 'retail-park-postcodes',
  layout: {
    'text-anchor': 'bottom',
    'text-field': ['get', 'postcode'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
    'text-offset': [0, -1.2],
    'text-size': 9,
  },
  minzoom: 13,
  paint: {
    'text-color': '#92400e', // Even darker amber
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'retail-parks',
  type: 'symbol',
};

interface RetailParkLayerProps {
  showIcons?: boolean;
  showLabels?: boolean;
  visible: boolean;
}

const RetailParkLayer: React.FC<RetailParkLayerProps> = ({
  showIcons = false,
  showLabels = true,
  visible,
}) => {
  if (!visible) return null;

  return (
    <>
      <Source data={retailParkGeoJSON} id="retail-parks" type="geojson">
        <Layer {...retailParkOutlineLayer} />
        <Layer {...retailParkMarkerLayer} />
        {showIcons && <Layer {...retailParkIconLayer} />}
        {showLabels && (
          <>
            <Layer {...retailParkNameLayer} />
            <Layer {...retailParkPostcodeLayer} />
          </>
        )}
      </Source>
    </>
  );
};

export default RetailParkLayer;
