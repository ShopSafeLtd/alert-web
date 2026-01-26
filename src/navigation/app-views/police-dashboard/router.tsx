import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceDashboardView = lazy(
  () => import('views/police-dashboard/PoliceDashboard')
);

const PoliceDashboard = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Dashboard',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceDashboard,
                }}
              >
                <PoliceDashboardView />
              </PermissionCheckWrapper>
            }
            index
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceDashboard;
