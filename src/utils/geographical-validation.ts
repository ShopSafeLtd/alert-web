/**
 * Validation utilities for geographical data (coordinates, circles, polygons)
 */

export interface CircleData {
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

export interface PolygonData {
  coordinates: number[][];
}

export interface ValidationResult {
  errors: string[];
  valid: boolean;
}

/**
 * Validates a latitude value
 * @param lat Latitude value to validate
 * @returns true if valid (-90 to 90)
 */
export const isValidLatitude = (lat: number): boolean =>
  typeof lat === 'number' && !Number.isNaN(lat) && lat >= -90 && lat <= 90;

/**
 * Validates a longitude value
 * @param lng Longitude value to validate
 * @returns true if valid (-180 to 180)
 */
export const isValidLongitude = (lng: number): boolean =>
  typeof lng === 'number' && !Number.isNaN(lng) && lng >= -180 && lng <= 180;

/**
 * Validates a radius value in meters
 * @param radiusMeters Radius value to validate
 * @returns true if valid (1 to 100,000 meters)
 */
export const isValidRadius = (radiusMeters: number): boolean =>
  typeof radiusMeters === 'number' &&
  !Number.isNaN(radiusMeters) &&
  radiusMeters >= 1 &&
  radiusMeters <= 100_000;

/**
 * Validates a circle geographical area
 * @param circle Circle data to validate
 * @returns Validation result with errors if any
 */
export const validateCircle = (circle: CircleData): ValidationResult => {
  const errors: string[] = [];

  if (!isValidLatitude(circle.latitude)) {
    errors.push(
      `Invalid latitude: ${circle.latitude}. Must be between -90 and 90.`
    );
  }

  if (!isValidLongitude(circle.longitude)) {
    errors.push(
      `Invalid longitude: ${circle.longitude}. Must be between -180 and 180.`
    );
  }

  if (!isValidRadius(circle.radiusMeters)) {
    errors.push(
      `Invalid radius: ${circle.radiusMeters}. Must be between 1 and 100,000 meters.`
    );
  }

  return {
    errors,
    valid: errors.length === 0,
  };
};

/**
 * Validates a polygon geographical area
 * @param polygon Polygon data to validate
 * @returns Validation result with errors if any
 */
export const validatePolygon = (polygon: PolygonData): ValidationResult => {
  const errors: string[] = [];

  if (!polygon.coordinates || !Array.isArray(polygon.coordinates)) {
    errors.push('Polygon must have a coordinates array.');
    return { errors, valid: false };
  }

  const { coordinates } = polygon;

  // Check minimum points (4 for a closed polygon: 3 unique points + 1 closing point)
  if (coordinates.length < 4) {
    errors.push(
      `Polygon must have at least 4 points (including closing point). Found ${coordinates.length}.`
    );
  }

  // Check maximum points
  if (coordinates.length > 100) {
    errors.push(
      `Polygon has too many points. Maximum is 100, found ${coordinates.length}.`
    );
  }

  // Validate each coordinate
  for (const [index, coord] of coordinates.entries()) {
    if (!Array.isArray(coord) || coord.length !== 2) {
      errors.push(
        `Invalid coordinate at index ${index}. Expected [longitude, latitude].`
      );
      continue;
    }

    const [lng, lat] = coord;

    if (!isValidLongitude(lng)) {
      errors.push(
        `Invalid longitude at index ${index}: ${lng}. Must be between -180 and 180.`
      );
    }

    if (!isValidLatitude(lat)) {
      errors.push(
        `Invalid latitude at index ${index}: ${lat}. Must be between -90 and 90.`
      );
    }
  }

  // Check if polygon is closed (first point equals last point)
  if (coordinates.length >= 2) {
    const first = coordinates[0];
    const last = coordinates.at(-1);

    if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
      errors.push(
        'Polygon must be closed (first point must equal last point).'
      );
    }
  }

  return {
    errors,
    valid: errors.length === 0,
  };
};

/**
 * Validates coordinate pair
 * @param lat Latitude
 * @param lng Longitude
 * @returns Validation result with errors if any
 */
export const validateCoordinates = (
  lat: number,
  lng: number
): ValidationResult => {
  const errors: string[] = [];

  if (!isValidLatitude(lat)) {
    errors.push(`Invalid latitude: ${lat}. Must be between -90 and 90.`);
  }

  if (!isValidLongitude(lng)) {
    errors.push(`Invalid longitude: ${lng}. Must be between -180 and 180.`);
  }

  return {
    errors,
    valid: errors.length === 0,
  };
};
