import type { CircleLayer, SymbolLayer } from 'react-map-gl';

import { cameraGeoJSON } from '#/views/reports/incident-map/data/cameraLocations';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

// Camera marker layer styling with pulsing effect
export const cameraMarkerLayer: CircleLayer = {
  id: 'camera-points',
  paint: {
    'circle-color': '#dc2626', // Red color for security cameras
    'circle-opacity': 0.85,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      8,
      4, // Very small at low zoom
      12,
      8, // Medium at mid zoom
      16,
      14, // Large at high zoom
    ],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 8, 1, 16, 3],
  },
  source: 'cameras',
  type: 'circle',
};

// Camera pulse layer for visual emphasis
export const cameraPulseLayer: CircleLayer = {
  id: 'camera-pulse',
  paint: {
    'circle-color': '#dc2626',
    'circle-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.2, 16, 0.3],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      8,
      8,
      12,
      16,
      16,
      24,
    ],
    'circle-stroke-color': '#dc2626',
    'circle-stroke-opacity': 0.4,
    'circle-stroke-width': 1,
  },
  source: 'cameras',
  type: 'circle',
};

// Camera icon layer (alternative to circle markers)
export const cameraIconLayer: SymbolLayer = {
  id: 'camera-icons',
  layout: {
    'icon-allow-overlap': true,
    'icon-anchor': 'bottom',
    // You can replace this with a custom camera icon if available
    'icon-image': 'marker-15',
    'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.8, 15, 1.5],
    'text-allow-overlap': false,
    'text-anchor': 'top',
    'text-field': ['get', 'postcode'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.5],
    'text-optional': true, // Only show text when there's room
    'text-size': ['interpolate', ['linear'], ['zoom'], 10, 0, 12, 10, 15, 12],
  },
  minzoom: 10, // Don't show icons at very low zoom levels
  paint: {
    'icon-opacity': 0.9,
    'text-color': '#4c1d95', // Dark purple for text
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'cameras',
  type: 'symbol',
};

// Camera label layer for showing postcodes
export const cameraPostcodeLayer: SymbolLayer = {
  id: 'camera-postcodes',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'postcode'],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 1.2],
    'text-size': ['interpolate', ['linear'], ['zoom'], 10, 9, 14, 11, 16, 13],
  },
  minzoom: 10,
  paint: {
    'text-color': '#991b1b', // Dark red
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.5,
  },
  source: 'cameras',
  type: 'symbol',
};

// Camera label layer for showing addresses at high zoom
export const cameraLabelLayer: SymbolLayer = {
  id: 'camera-labels',
  layout: {
    'text-anchor': 'bottom',
    'text-field': ['get', 'address'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
    'text-max-width': 12,
    'text-offset': [0, -1.8],
    'text-size': 10,
  },
  minzoom: 14, // Only show detailed labels at very high zoom
  paint: {
    'text-color': '#7f1d1d', // Darker red
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.2,
  },
  source: 'cameras',
  type: 'symbol',
};

interface CameraLayerProps {
  showLabels?: boolean;
  useIcons?: boolean;
  visible: boolean;
}

const CameraLayer: React.FC<CameraLayerProps> = ({
  showLabels = true,
  useIcons = false,
  visible,
}) => {
  if (!visible) return null;

  return (
    <>
      <Source data={cameraGeoJSON} id="cameras" type="geojson">
        {useIcons ? (
          <>
            <Layer {...cameraIconLayer} />
            {showLabels && (
              <>
                <Layer {...cameraPostcodeLayer} />
                <Layer {...cameraLabelLayer} />
              </>
            )}
          </>
        ) : (
          <>
            <Layer {...cameraPulseLayer} />
            <Layer {...cameraMarkerLayer} />
            {showLabels && (
              <>
                <Layer {...cameraPostcodeLayer} />
                <Layer {...cameraLabelLayer} />
              </>
            )}
          </>
        )}
      </Source>
    </>
  );
};

export default CameraLayer;
