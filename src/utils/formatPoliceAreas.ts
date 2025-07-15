import type { PoliceForce } from 'graphql/types';

/**
 * Formats an array of PoliceForce enums into a human-readable string
 * @param policeAreas - Array of PoliceForce enum values
 * @returns Formatted string of police areas
 */
export function formatPoliceAreas(
  policeAreas: PoliceForce[] | null | undefined
): string {
  if (!policeAreas || !Array.isArray(policeAreas) || policeAreas.length === 0) {
    return '';
  }

  // Convert enum values to human-readable format
  const formatted = policeAreas.map((area) =>
    // Convert SNAKE_CASE to Title Case
    area
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  );

  // Handle different array lengths
  if (formatted.length === 1) {
    return formatted[0];
  } else if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`;
  } else {
    const lastArea = formatted.pop();
    return `${formatted.join(', ')}, and ${lastArea}`;
  }
}

/**
 * Formats police areas for display in a list/table format
 * @param policeAreas - Array of PoliceForce enum values
 * @returns Array of formatted strings
 */
export function formatPoliceAreasList(
  policeAreas: PoliceForce[] | null | undefined
): string[] {
  if (!policeAreas || !Array.isArray(policeAreas) || policeAreas.length === 0) {
    return [];
  }

  return policeAreas.map((area) =>
    // Convert SNAKE_CASE to Title Case
    area
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  );
}
