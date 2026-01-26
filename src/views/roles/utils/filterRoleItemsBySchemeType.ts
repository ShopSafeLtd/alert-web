import type { PermissionModel, SchemeType } from 'graphql/types';

interface RoleItem {
  [key: string]: unknown;
  key: PermissionModel;
}

/**
 * Filters permission model items based on scheme type
 * - POLICE_HUB schemes: Show only POLICE_ models
 * - DEFAULT/RETAIL_HUB schemes: Show only non-POLICE models
 */
export function filterRoleItemsBySchemeType<T extends RoleItem>(
  items: T[],
  schemeType: SchemeType | null | undefined
): T[] {
  // If schemeType is not available, return all non-POLICE items (safe default)
  if (!schemeType) {
    return items.filter((item) => !isPolicePermissionModel(item.key));
  }

  // For POLICE_HUB schemes, show only POLICE_ models
  if (schemeType === 'POLICE_HUB') {
    return items.filter((item) => isPolicePermissionModel(item.key));
  }

  // For DEFAULT and RETAIL_HUB, show only non-POLICE models
  return items.filter((item) => !isPolicePermissionModel(item.key));
}

/**
 * Checks if a permission model is a POLICE-specific model
 */
function isPolicePermissionModel(model: PermissionModel): boolean {
  const policeModels = [
    'POLICE_DASHBOARD',
    'POLICE_INCIDENTS',
    'POLICE_OFFENDERS',
    'POLICE_VEHICLES',
    'POLICE_CRIME_GROUPS',
    'POLICE_SETTINGS',
  ];

  return policeModels.includes(model as string);
}
