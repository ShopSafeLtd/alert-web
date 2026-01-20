export interface CircleGeometry {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  type: 'circle';
}

export interface PolygonGeometry {
  coordinates: [number, number][]; // [lng, lat] pairs
  type: 'polygon';
}

export type AreaGeometry = CircleGeometry | PolygonGeometry;

export interface GeographicalArea {
  areaType: 'circle' | 'polygon';
  circle?: CircleGeometry;
  color: string;
  createdAt: Date;
  createdBy?: {
    fullName: string;
    id: string;
  };
  description?: string;
  id: string;
  name: string;
  polygon?: PolygonGeometry;
  updatedAt?: Date;
}

export interface ReportingAreaFormData {
  color: string;
  description?: string;
  geometry: AreaGeometry | null;
  name: string;
}

export type DrawingMode = 'circle' | 'edit' | 'polygon' | null;
export type DrawerMode = 'create' | 'edit' | null;
