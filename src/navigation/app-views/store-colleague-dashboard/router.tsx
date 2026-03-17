import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const StoreColleagueDashboardView = lazy(
  () => import('views/store-colleague-dashboard/StoreColleagueDashboard')
);

const StoreColleagueDashboard = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Store Dashboard',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  // TODO: swap to PermissionModel.StoreDashboard once codegen emits it
                  model: PermissionModel.Dashboard,
                }}
              >
                <StoreColleagueDashboardView />
              </PermissionCheckWrapper>
            }
            index
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default StoreColleagueDashboard;
