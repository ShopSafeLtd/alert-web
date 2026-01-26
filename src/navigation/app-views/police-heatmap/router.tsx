import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceHeatmapView = lazy(() => import('views/police-heatmap'));

const PoliceHeatmap = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Incident Heatmap',
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
                <PoliceHeatmapView />
              </PermissionCheckWrapper>
            }
            index
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceHeatmap;
