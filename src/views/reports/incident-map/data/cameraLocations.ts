export interface CameraLocation {
  address: string;
  id: string;
  latitude: null | number;
  longitude: null | number;
  postcode: string;
}

export const cameraLocations: CameraLocation[] = [
  {
    address: 'B&M, Crostons Retail Park, Wood Street, Bury, BL8 1LB',
    id: 'cam-001',
    latitude: 53.596_302,
    longitude: -2.309_688,
    postcode: 'BL8 1LB',
  },
  {
    address: 'B&M, Whitworth Road, Rochdale, OL12 0EU',
    id: 'cam-002',
    latitude: 53.621_448,
    longitude: -2.154_062,
    postcode: 'OL12 0EU',
  },
  {
    address: 'B&M, Wilfred Street, Swinton, Salford, M27 6AN',
    id: 'cam-003',
    latitude: 53.514_273,
    longitude: -2.337_395,
    postcode: 'M27 6AN',
  },
  {
    address: 'Cheetham Hill Retail Park, Queens Road, Manchester, M8 8BB',
    id: 'cam-004',
    latitude: 53.499_031,
    longitude: -2.238_758,
    postcode: 'M8 8BB',
  },
  {
    address: 'Go Outdoors, Angouleme Way, Bury, BL9 0BB',
    id: 'cam-005',
    latitude: 53.591_232,
    longitude: -2.292_352,
    postcode: 'BL9 0BB',
  },
  {
    address: 'Go Outdoors, Stockport Road, Stockport, SK3 0TQ',
    id: 'cam-006',
    latitude: 53.400_792,
    longitude: -2.191_434,
    postcode: 'SK3 0TQ',
  },
  {
    address: 'Homebase, Stockport Road East, Bredbury, Stockport, SK6 2BN',
    id: 'cam-007',
    latitude: 53.423_061,
    longitude: -2.119_229,
    postcode: 'SK6 2BN',
  },
  {
    address: 'Office Outlet, 57-89 Great Portwood Street, Stockport, SK1 2AS',
    id: 'cam-008',
    latitude: null, // Missing coordinates
    longitude: null,
    postcode: 'SK1 2AS',
  },
  {
    address: 'Rochdale Exchange Shopping Centre, Newgate, Rochdale, OL16 1YL',
    id: 'cam-009',
    latitude: 53.619_287,
    longitude: -2.156_911,
    postcode: 'OL16 1YL',
  },
  {
    address:
      'Sports Direct, Unit 6, Altrincham Retail Park, Altrincham, WA14 5GR',
    id: 'cam-010',
    latitude: 53.400_854,
    longitude: -2.356_125,
    postcode: 'WA14 5GR',
  },
  {
    address: 'Trinity Retail Park, Bradford Street, Bolton, BL2 1HY',
    id: 'cam-011',
    latitude: 53.572_224,
    longitude: -2.418_404,
    postcode: 'BL2 1HY',
  },
  {
    address: 'Wickes, Moor Street, Bury, BL9 5AQ',
    id: 'cam-012',
    latitude: 53.597_616,
    longitude: -2.291_142,
    postcode: 'BL9 5AQ',
  },
  {
    address: 'Wickes, Wynne Avenue, Swinton, Salford, M27 8FU',
    id: 'cam-013',
    latitude: 53.524_492,
    longitude: -2.334_399,
    postcode: 'M27 8FU',
  },
];

// Filter out locations without valid coordinates
export const validCameraLocations = cameraLocations.filter(
  (location) => location.latitude !== null && location.longitude !== null
);

// Create GeoJSON data for the camera locations
export const cameraGeoJSON = {
  features: validCameraLocations.map((location) => ({
    geometry: {
      coordinates: [location.longitude!, location.latitude!],
      type: 'Point' as const,
    },
    properties: {
      address: location.address,
      id: location.id,
      postcode: location.postcode,
    },
    type: 'Feature' as const,
  })),
  type: 'FeatureCollection' as const,
};
