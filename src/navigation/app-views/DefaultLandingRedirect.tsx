import {
  currentPermissionsAtom,
  schemeTypeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import hasPermission from '#/utils/has-permission';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * DefaultLandingRedirect component intelligently redirects users to their appropriate landing page
 * based on their permissions and scheme type.
 *
 * Redirect logic:
 * For POLICE_HUB schemes:
 * 1. If user has PoliceDashboard read permissions → redirect to /police-dashboard
 * 2. Otherwise, if user has StockRemovalRequests read permissions → redirect to /stock-removal-requests
 * 3. Otherwise → redirect to /police-dashboard (will show unauthorized element)
 *
 * For DEFAULT/RETAIL_HUB schemes:
 * 1. If user has Dashboard read permissions → redirect to /dashboard
 * 2. Otherwise, if user has StockRemovalRequests read permissions → redirect to /stock-removal-requests
 * 3. Otherwise → redirect to /dashboard (will show ReportOnly or unauthorized element)
 */
const DefaultLandingRedirect = (): JSX.Element => {
  const permissions = useAtomValue(currentPermissionsAtom);
  const schemeType = useAtomValue(schemeTypeAtom);

  const hasPoliceDashboardPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.PoliceDashboard,
        },
        permissions,
      }),
    [permissions]
  );

  const hasDashboardPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.Dashboard,
        },
        permissions,
      }),
    [permissions]
  );

  const hasStockRemovalPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.StockRemovalRequests,
        },
        permissions,
      }),
    [permissions]
  );

  // For POLICE_HUB schemes, redirect to police dashboard
  if (schemeType === 'POLICE_HUB') {
    if (hasPoliceDashboardPermission) {
      return <Navigate to="police-dashboard" />;
    }

    if (hasStockRemovalPermission) {
      return <Navigate to="stock-removal-requests" />;
    }

    return <Navigate to="police-dashboard" />;
  }

  // For DEFAULT/RETAIL_HUB schemes, use standard dashboard
  if (hasDashboardPermission) {
    return <Navigate to="dashboard" />;
  }

  if (hasStockRemovalPermission) {
    return <Navigate to="stock-removal-requests" />;
  }

  return <Navigate to="dashboard" />;
};

export default DefaultLandingRedirect;
