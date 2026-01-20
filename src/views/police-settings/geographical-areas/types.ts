export interface CircleGeometry {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  type: 'circle';
}

export interface PolygonGeometry {
  coordinates: [number, number][]; // [lng, lat] pairs in GeoJSON format
  type: 'polygon';
}

export type AreaGeometry = CircleGeometry | PolygonGeometry;

export interface GeographicalArea {
  areaType: string;
  circle?: { [key: string]: unknown } | CircleGeometry | null;
  color?: null | string;
  createdAt: Date;
  description?: null | string;
  id: string;
  name: string;
  polygon?: { [key: string]: unknown } | PolygonGeometry | null;
}

export interface GeographicalAreaFormData {
  color: string;
  description?: string;
  geometry: AreaGeometry | null;
  name: string;
}

export type DrawingMode = 'circle' | 'edit' | 'polygon' | null;
export type DrawerMode = 'create' | 'edit' | null;
