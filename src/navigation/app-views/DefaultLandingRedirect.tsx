import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasPermission from '#/utils/has-permission';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * DefaultLandingRedirect component intelligently redirects users to their appropriate landing page
 * based on their permissions.
 *
 * Redirect logic:
 * 1. If user has Dashboard read permissions → redirect to /dashboard
 * 2. Otherwise, if user has StockRemovalRequests read permissions → redirect to /stock-removal-requests
 * 3. Otherwise → redirect to /dashboard (will show ReportOnly or unauthorized element)
 */
const DefaultLandingRedirect = (): JSX.Element => {
  const permissions = useAtomValue(currentPermissionsAtom);

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

  // If user has dashboard permissions, go to dashboard (default behavior)
  if (hasDashboardPermission) {
    return <Navigate to="dashboard" />;
  }

  // If user doesn't have dashboard permissions but has stock removal permissions,
  // redirect them directly to stock removal
  if (hasStockRemovalPermission) {
    return <Navigate to="stock-removal-requests" />;
  }

  // Otherwise, redirect to dashboard (will show unauthorized page or ReportOnly)
  return <Navigate to="dashboard" />;
};

export default DefaultLandingRedirect;
