import type { SchemeType } from 'graphql/types';
import type { NavItem } from '../NavigationConfig';

/**
 * Filters navigation items based on scheme type
 * - POLICE_HUB: Show only police nav items
 * - DEFAULT/RETAIL_HUB: Show only non-police nav items
 */
export function filterNavigationBySchemeType(
  navItems: NavItem[],
  schemeType: SchemeType | undefined | null
): NavItem[] {
  if (!schemeType) {
    return navItems.filter((item) => !isPoliceNavItem(item.key));
  }

  if (schemeType === 'POLICE_HUB') {
    return navItems.filter((item) => isPoliceNavItem(item.key));
  }

  return navItems.filter((item) => !isPoliceNavItem(item.key));
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
