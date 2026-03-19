import type { CircleLayer, SymbolLayer } from 'react-map-gl';

// Incident marker layer - main incident points with refined styling
export const incidentMarkerLayer: CircleLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'unclustered-point',
  paint: {
    'circle-color': [
      'case',
      ['>', ['get', 'incidentCount'], 1],
      '#ef4444', // Red for multiple incidents at same location
      '#3b82f6', // Blue for single incident
    ],
    'circle-opacity': 0.9,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      3,
      8,
      5,
      11,
      8,
      14,
      11,
      17,
      15,
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
  source: 'incidents',
  type: 'circle',
};

// Incident outer ring for visual emphasis
export const incidentRingLayer: CircleLayer = {
  filter: ['!', ['has', 'point_count']],
  id: 'incident-ring',
  paint: {
    'circle-color': 'transparent',
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      5,
      8,
      8,
      11,
      13,
      14,
      17,
      17,
      23,
    ],
    'circle-stroke-color': [
      'case',
      ['>', ['get', 'incidentCount'], 1],
      '#ef4444', // Red ring for multiple incidents
      '#3b82f6', // Blue ring for single incident
    ],
    'circle-stroke-opacity': 0.3,
    'circle-stroke-width': 1.5,
  },
  source: 'incidents',
  type: 'circle',
};

// Incident pulse effect layer (for higher importance incidents)
export const incidentPulseLayer: CircleLayer = {
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['>', ['get', 'incidentCount'], 2], // Only for locations with 3+ incidents
  ],
  id: 'incident-pulse',
  paint: {
    'circle-color': 'transparent',
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      8,
      8,
      12,
      11,
      18,
      14,
      24,
      17,
      32,
    ],
    'circle-stroke-color': '#ef4444',
    'circle-stroke-opacity': 0.15,
    'circle-stroke-width': 1,
  },
  source: 'incidents',
  type: 'circle',
};

// Incident cluster layer with improved styling
export const incidentClusterLayer: CircleLayer = {
  filter: ['has', 'point_count'],
  id: 'clusters',
  paint: {
    'circle-color': [
      'step',
      ['get', 'incidentCount'],
      '#60a5fa', // Light blue for small clusters
      10,
      '#3b82f6', // Medium blue
      50,
      '#2563eb', // Darker blue
      200,
      '#1e40af', // Deep blue for large clusters
      500,
      '#1e3a8a', // Very deep blue for huge clusters
    ],
    'circle-opacity': 0.95,
    'circle-radius': [
      'step',
      ['get', 'incidentCount'],
      14, // Small clusters
      10,
      18, // 10-49 incidents
      50,
      24, // 50-199 incidents
      200,
      30, // 200-499 incidents
      500,
      38, // 500+ incidents
    ],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': [
      'step',
      ['get', 'incidentCount'],
      1.5,
      50,
      2,
      200,
      2.5,
    ],
  },
  source: 'incidents',
  type: 'circle',
};

// Cluster outer ring for visual hierarchy
export const clusterRingLayer: CircleLayer = {
  filter: ['has', 'point_count'],
  id: 'cluster-ring',
  paint: {
    'circle-color': 'transparent',
    'circle-radius': [
      'step',
      ['get', 'incidentCount'],
      20, // Small clusters
      10,
      26, // 10-49 incidents
      50,
      34, // 50-199 incidents
      200,
      42, // 200-499 incidents
      500,
      52, // 500+ incidents
    ],
    'circle-stroke-color': [
      'step',
      ['get', 'incidentCount'],
      '#60a5fa',
      10,
      '#3b82f6',
      50,
      '#2563eb',
      200,
      '#1e40af',
      500,
      '#1e3a8a',
    ],
    'circle-stroke-opacity': 0.25,
    'circle-stroke-width': 1.5,
  },
  source: 'incidents',
  type: 'circle',
};

// Incident cluster count with better typography
export const incidentClusterCountLayer: SymbolLayer = {
  filter: ['has', 'point_count'],
  id: 'cluster-count',
  layout: {
    'text-field': ['to-string', ['get', 'incidentCount']],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-size': [
      'step',
      ['get', 'incidentCount'],
      12, // Small text for small clusters
      50,
      13,
      200,
      14,
      500,
      16, // Larger text for huge clusters
    ],
  },
  paint: {
    'text-color': '#ffffff',
    'text-halo-blur': 0.5,
    'text-halo-color': [
      'step',
      ['get', 'incidentCount'],
      '#60a5fa',
      10,
      '#3b82f6',
      50,
      '#2563eb',
      200,
      '#1e40af',
      500,
      '#1e3a8a',
    ],
    'text-halo-width': 1,
  },
  source: 'incidents',
  type: 'symbol',
};

// Individual incident count label (only show when zoomed past clusters)
export const incidentCountLayer: SymbolLayer = {
  filter: [
    'all',
    ['!', ['has', 'point_count']], // Not a cluster
    ['>', ['get', 'incidentCount'], 1], // More than one incident at this location
  ],
  id: 'incident-count',
  layout: {
    'symbol-placement': 'point',
    'text-allow-overlap': true,
    'text-anchor': 'center',
    'text-field': ['to-string', ['get', 'incidentCount']],
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-ignore-placement': true,
    'text-offset': [0, 0],
    'text-size': ['interpolate', ['linear'], ['zoom'], 14, 11, 15, 13, 20, 15],
  },
  minzoom: 14, // Only show when zoomed in past cluster threshold
  paint: {
    'text-color': '#ffffff',
    'text-halo-blur': 0,
    'text-halo-color': '#ef4444',
    'text-halo-width': 3,
  },
  source: 'incidents',
  type: 'symbol',
};

// Export all layers as a group for easy import
export const incidentLayers = {
  clusterRingLayer,
  incidentClusterCountLayer,
  incidentClusterLayer,
  incidentCountLayer,
  incidentMarkerLayer,
  incidentPulseLayer,
  incidentRingLayer,
};
