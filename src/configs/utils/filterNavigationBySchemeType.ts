import type { SchemeType } from 'graphql/types';
import type { NavItem } from '../NavigationConfig';

const DEV_ONLY_KEYS = ['store-colleague-dashboard', 'retail-admin-dashboard'];

const isDev = process.env.NODE_ENV === 'development';

/**
 * Filters navigation items based on scheme type
 * - POLICE_HUB: Show only police nav items
 * - DEFAULT/RETAIL_HUB: Show only non-police nav items
 * Dev-only items are hidden outside of development mode.
 */
export function filterNavigationBySchemeType(
  navItems: NavItem[],
  schemeType: SchemeType | undefined | null
): NavItem[] {
  const filtered = isDev
    ? navItems
    : navItems.filter((item) => !DEV_ONLY_KEYS.includes(item.key));

  if (!schemeType) {
    return filtered.filter((item) => !isPoliceNavItem(item.key));
  }

  if (schemeType === 'POLICE_HUB') {
    return filtered.filter((item) => isPoliceNavItem(item.key));
  }

  return filtered.filter((item) => !isPoliceNavItem(item.key));
}

/**
 * Checks if a navigation item is police-specific
 */
function isPoliceNavItem(key: string): boolean {
  const policeKeys = [
    'police-dashboard',
    'police-heatmap',
    'police-incidents',
    'police-offenders',
    'police-vehicles',
    'police-crime-groups',
    'police-settings',
  ];
  return policeKeys.includes(key);
}
