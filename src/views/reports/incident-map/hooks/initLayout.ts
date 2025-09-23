import type { MetaData } from '#/views/reports/types';
import type RGL from 'react-grid-layout';

// Initial layout for incident map report (minimal as it's a full-screen map)
export const IncidentMapLayout: RGL.Layout[] = [
  {
    h: 24,
    i: 'incidentMap',
    minH: 12,
    minW: 4,
    moved: false,
    static: false,
    w: 12,
    x: 0,
    y: 0,
  },
];

// Metadata structure to store all incident map settings
export const IncidentMapMetaData: MetaData[] = [
  {
    filters: {
      // Map settings
      cluster: true,

      // Date range
      dateRange: null,
      heatmapIntensity: 50,
      // Map view state
      mapViewState: {
        latitude: 55.37,
        longitude: 3.43,
        zoom: 5,
      },
      multiColour: 'single',
      selectedBrands: [],
      selectedGroups: [],

      selectedIncidentTypes: [],
      selectedIndustries: [],
      selectedPoliceAreas: [],
      // Filter selections
      selectedSchemes: [],
      showBCRP: false,
      showBusinesses: false,
      showCameras: false,
      showHeatmap: false,
      showLondonPolice: false,

      // Display toggles
      showMarkers: true,
      showPolice: false,
      showRetailParks: false,
      showUKDistricts: false,
      useBcu: false,

      viewMode: 'popup',
    },
    key: 'globalFilter',
    type: 'globalFilter',
  },
];

export default IncidentMapLayout;
