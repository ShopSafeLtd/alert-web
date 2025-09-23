import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { CircleLayer, SymbolLayer } from 'react-map-gl';

import React from 'react';
import { Layer, Source } from 'react-map-gl';

// Color palette for different brands
// Using a diverse, visually distinct palette with maximum contrast
export const BRAND_COLORS = [
  '#FF0000', // Pure Red
  '#00FF00', // Pure Green
  '#0000FF', // Pure Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FF8C00', // Dark Orange
  '#9400D3', // Violet
  '#32CD32', // Lime Green
  '#FF1493', // Deep Pink
  '#1E90FF', // Dodger Blue
  '#FFD700', // Gold
  '#8B4513', // Saddle Brown
  '#00CED1', // Dark Turquoise
  '#FF69B4', // Hot Pink
  '#4B0082', // Indigo
  '#FA8072', // Salmon
  '#2E8B57', // Sea Green
  '#FF6347', // Tomato
  '#4682B4', // Steel Blue
  '#D2691E', // Chocolate
  '#6B8E23', // Olive Drab
  '#FF4500', // Orange Red
  '#DA70D6', // Orchid
  '#20B2AA', // Light Sea Green
];

// Function to generate consistent color for a brand
export const getBrandColor = (
  brandId: string | undefined,
  brandName: string | undefined
): string => {
  if (!brandId && !brandName) return BRAND_COLORS[0]; // Default indigo

  // Use brand ID or name to generate a consistent index
  const str = brandId || brandName || '';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.codePointAt(i) ?? 0;
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32-bit integer
  }

  return BRAND_COLORS[Math.abs(hash) % BRAND_COLORS.length];
};

// Business marker layer - color-coded by brand
export const businessMarkerLayer: CircleLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'business-points',
  paint: {
    'circle-color': [
      'case',
      ['has', 'brandColor'],
      ['get', 'brandColor'],
      '#6366f1', // Default indigo if no brand
    ],
    'circle-opacity': 0.9,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      2,
      8,
      4,
      11,
      7,
      14,
      10,
      17,
      14,
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
  source: 'businesses',
  type: 'circle',
};

// Business outer ring for visual emphasis - matches brand color
export const businessRingLayer: CircleLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'business-ring',
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
      16,
      17,
      22,
    ],
    'circle-stroke-color': [
      'case',
      ['has', 'brandColor'],
      ['get', 'brandColor'],
      '#6366f1',
    ],
    'circle-stroke-opacity': 0.3,
    'circle-stroke-width': 1.5,
  },
  source: 'businesses',
  type: 'circle',
};

// Business cluster layer - smaller sizes for less visual dominance
export const businessClusterLayer: CircleLayer = {
  filter: ['has', 'point_count'],
  id: 'business-clusters',
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#8b92f8', // Light indigo for small clusters
      10,
      '#6366f1', // Medium indigo
      50,
      '#4f46e5', // Darker indigo for large clusters
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      12, // Small clusters (was 20)
      50,
      18, // Medium clusters (was 30)
      200,
      25, // Large clusters (was 40)
    ],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': 1.5,
  },
  source: 'businesses',
  type: 'circle',
};

// Business cluster count
export const businessClusterCountLayer: SymbolLayer = {
  filter: ['has', 'point_count'],
  id: 'business-cluster-count',
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    'text-color': '#ffffff',
  },
  source: 'businesses',
  type: 'symbol',
};

// Business name labels with brand name
export const businessNameLayer: SymbolLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'business-names',
  layout: {
    'text-anchor': 'top',
    'text-field': [
      'concat',
      ['get', 'name'],
      [
        'case',
        ['all', ['has', 'brandName'], ['!=', ['get', 'brandName'], '']],
        ['concat', '\n', '(', ['get', 'brandName'], ')'],
        '',
      ],
    ],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-max-width': 14,
    'text-offset': [0, 1.2],
    'text-size': ['interpolate', ['linear'], ['zoom'], 11, 9, 13, 11, 16, 13],
  },
  minzoom: 11,
  paint: {
    'text-color': '#1e293b', // Dark slate for better readability
    'text-halo-blur': 0.5,
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.5,
  },
  source: 'businesses',
  type: 'symbol',
};

// Business public name labels (shown at higher zoom)
export const businessPublicNameLayer: SymbolLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'business-public-names',
  layout: {
    'text-anchor': 'bottom',
    'text-field': ['get', 'publicName'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
    'text-offset': [0, -1.2],
    'text-size': 9,
  },
  minzoom: 14,
  paint: {
    'text-color': '#6366f1',
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'businesses',
  type: 'symbol',
};

// Business full address labels (shown at very high zoom)
export const businessAddressLayer: SymbolLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'business-addresses',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'address'],
    'text-font': ['DIN Offc Pro Regular', 'Arial Unicode MS Regular'],
    'text-max-width': 16,
    'text-offset': [0, 2.2],
    'text-size': 8,
  },
  minzoom: 15,
  paint: {
    'text-color': '#6b7280', // Gray for address
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
  },
  source: 'businesses',
  type: 'symbol',
};

interface BusinessLayerProps {
  businessData: BusinessLocationsQuery | undefined;
  cluster?: boolean;
  showDetailedLabels?: boolean;
  showLabels?: boolean;
  visible: boolean;
}

const BusinessLayer: React.FC<BusinessLayerProps> = ({
  businessData,
  cluster = true,
  showDetailedLabels = false,
  showLabels = true,
  visible,
}) => {
  if (!visible || !businessData) return null;

  // Create GeoJSON with business properties including brand colors
  const businessGeoJSON = {
    features:
      businessData.listBusinesses.businesses.map((business) => {
        // Get the first brand if available
        const primaryBrand = business.brands?.[0];
        const brandColor = getBrandColor(primaryBrand, primaryBrand);

        return {
          geometry: {
            coordinates: [
              business.locations[0]?.geoLng || 0,
              business.locations[0]?.geoLat || 0,
            ],
            type: 'Point' as const,
          },
          properties: {
            address: business.locations[0]?.full || '',
            brandColor,
            brandCount: business.brands?.length || 0,
            brandId: primaryBrand || '',
            brandName: primaryBrand || '',
            fullName: business.fullName || '',
            id: business.id,
            name: business.name || business.fullName || 'Unknown Business',
            publicName: business.publicName || '',
          },
          type: 'Feature' as const,
        };
      }) || [],
    type: 'FeatureCollection' as const,
  };

  // When clustering is disabled, we need to use a different source configuration
  if (!cluster) {
    return (
      <Source
        cluster={false}
        data={businessGeoJSON}
        id="businesses"
        type="geojson"
      >
        {/* Simple layers without point_count filters for non-clustered view */}
        <Layer
          id="business-ring"
          paint={{
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
              16,
              17,
              22,
            ],
            'circle-stroke-color': ['get', 'brandColor'],
            'circle-stroke-opacity': 0.3,
            'circle-stroke-width': 1.5,
          }}
          source="businesses"
          type="circle"
        />
        <Layer
          id="business-points"
          paint={{
            'circle-color': ['get', 'brandColor'],
            'circle-opacity': 0.9,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              2,
              8,
              4,
              11,
              7,
              14,
              10,
              17,
              14,
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
          }}
          source="businesses"
          type="circle"
        />
        {showLabels && (
          <>
            <Layer {...businessNameLayer} filter={undefined} />
            {showDetailedLabels && (
              <>
                <Layer {...businessPublicNameLayer} filter={undefined} />
                <Layer {...businessAddressLayer} filter={undefined} />
              </>
            )}
          </>
        )}
      </Source>
    );
  }

  // Original clustering behavior
  return (
    <Source
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
      data={businessGeoJSON}
      id="businesses"
      type="geojson"
    >
      <Layer {...businessClusterLayer} />
      <Layer {...businessClusterCountLayer} />
      <Layer {...businessRingLayer} />
      <Layer {...businessMarkerLayer} />
      {showLabels && (
        <>
          <Layer {...businessNameLayer} />
          {showDetailedLabels && (
            <>
              <Layer {...businessPublicNameLayer} />
              <Layer {...businessAddressLayer} />
            </>
          )}
        </>
      )}
    </Source>
  );
};

export default BusinessLayer;
