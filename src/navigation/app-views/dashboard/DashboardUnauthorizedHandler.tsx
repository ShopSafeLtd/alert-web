import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasPermission from '#/utils/has-permission';
import ReportOnly from '#/views/report-only/ReportOnly.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * DashboardUnauthorizedHandler component handles unauthorized dashboard access
 * by redirecting users to appropriate sections based on their permissions.
 *
 * Logic:
 * 1. If user has StockRemovalRequests read permissions → redirect to /app/stock-removal-requests
 * 2. Otherwise → show ReportOnly component (for users who can report incidents/offenders/vehicles)
 */
const DashboardUnauthorizedHandler = (): JSX.Element => {
  const permissions = useAtomValue(currentPermissionsAtom);

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

  // If user has stock removal permissions but not dashboard permissions,
  // redirect them to stock removal section
  if (hasStockRemovalPermission) {
    return <Navigate to="/app/stock-removal-requests" />;
  }

  // Otherwise, show the ReportOnly page for users who can report incidents/offenders/vehicles
  return <ReportOnly />;
};

export default DashboardUnauthorizedHandler;
