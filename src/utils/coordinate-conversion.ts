/**
 * Coordinate conversion utilities for geographical data
 * Handles conversions between different coordinate formats (lat/lng, GeoJSON, display strings)
 */

/**
 * Formats latitude and longitude for display
 * Example: formatLatLng(51.5074, -0.1278) => "51.5074° N, 0.1278° W"
 *
 * @param lat Latitude (-90 to 90)
 * @param lng Longitude (-180 to 180)
 * @param precision Number of decimal places (default: 4)
 * @returns Formatted coordinate string
 */
export const formatLatLng = (
  lat: number,
  lng: number,
  precision: number = 4
): string => {
  const latDirection = lat >= 0 ? 'N' : 'S';
  const lngDirection = lng >= 0 ? 'E' : 'W';

  const latAbs = Math.abs(lat).toFixed(precision);
  const lngAbs = Math.abs(lng).toFixed(precision);

  return `${latAbs}° ${latDirection}, ${lngAbs}° ${lngDirection}`;
};

/**
 * Converts coordinates from [lat, lng] format to GeoJSON [lng, lat] format
 * CRITICAL: GeoJSON uses [longitude, latitude] order, not [latitude, longitude]
 *
 * @param coords Array of [lat, lng] pairs
 * @returns Array of [lng, lat] pairs (GeoJSON format)
 */
export const toGeoJSON = (coords: [number, number][]): number[][] =>
  coords.map(([lat, lng]) => [lng, lat]);

/**
 * Converts coordinates from GeoJSON [lng, lat] format to [lat, lng] format
 *
 * @param coords Array of [lng, lat] pairs (GeoJSON format)
 * @returns Array of [lat, lng] pairs
 */
export const fromGeoJSON = (coords: number[][]): [number, number][] =>
  coords.map(([lng, lat]) => [lat, lng] as [number, number]);

/**
 * Formats radius in meters to human-readable string
 * Example: formatRadius(1500) => "1.5km"
 * Example: formatRadius(500) => "500m"
 *
 * @param radiusMeters Radius in meters
 * @returns Formatted radius string
 */
export const formatRadius = (radiusMeters: number): string => {
  if (radiusMeters >= 1000) {
    const km = radiusMeters / 1000;
    return `${km.toFixed(km >= 10 ? 0 : 1)}km`;
  }
  return `${Math.round(radiusMeters)}m`;
};

/**
 * Parses radius from string to meters
 * Example: parseRadius("1.5km") => 1500
 * Example: parseRadius("500m") => 500
 *
 * @param radiusString Radius string (e.g., "1.5km", "500m")
 * @returns Radius in meters, or null if invalid
 */
export const parseRadius = (radiusString: string): null | number => {
  const match = radiusString.match(/^(\d+\.?\d*)\s*(km|m)$/i);

  if (!match) {
    return null;
  }

  const value = Number.parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === 'km') {
    return value * 1000;
  }

  return value;
};

/**
 * Calculates approximate distance between two coordinates using Haversine formula
 * Returns distance in meters
 *
 * @param lat1 First latitude
 * @param lng1 First longitude
 * @param lat2 Second latitude
 * @param lng2 Second longitude
 * @returns Distance in meters
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6_371_000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Calculates the center point (centroid) of a polygon
 *
 * @param coordinates Array of [lng, lat] pairs in GeoJSON format
 * @returns Center point as [lng, lat]
 */
export const calculatePolygonCenter = (
  coordinates: number[][]
): [number, number] => {
  if (coordinates.length === 0) {
    return [0, 0];
  }

  let totalLng = 0;
  let totalLat = 0;
  let count = 0;

  // Exclude the last point if it's the same as the first (closing point)
  const lastPoint = coordinates.at(-1);
  const pointsToAverage =
    coordinates.length > 1 &&
    lastPoint &&
    coordinates[0][0] === lastPoint[0] &&
    coordinates[0][1] === lastPoint[1]
      ? coordinates.slice(0, -1)
      : coordinates;

  for (const [lng, lat] of pointsToAverage) {
    totalLng += lng;
    totalLat += lat;
    count += 1;
  }

  return [totalLng / count, totalLat / count];
};

/**
 * Formats a geographical area for display
 *
 * @param areaType Type of area ("CIRCLE" or "POLYGON")
 * @param circle Circle data (if applicable)
 * @param polygon Polygon data (if applicable)
 * @returns Human-readable description
 */
export const formatAreaDescription = (
  areaType: string,
  circle?: { latitude: number; longitude: number; radiusMeters: number } | null,
  polygon?: { coordinates: number[][] } | null
): string => {
  if (areaType === 'CIRCLE' && circle) {
    return `Circle: ${formatRadius(circle.radiusMeters)} radius at ${formatLatLng(
      circle.latitude,
      circle.longitude
    )}`;
  }

  if (areaType === 'POLYGON' && polygon) {
    const pointCount = polygon.coordinates.length - 1; // Exclude closing point
    return `Polygon: ${pointCount} points`;
  }

  return '';
};
