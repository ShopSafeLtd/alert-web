import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceVehicleFeed = lazy(
  () => import('views/police-vehicles/police-vehicle-feed')
);
const ViewPoliceVehicle = lazy(
  () => import('views/police-vehicles/view-police-vehicle')
);

const PoliceVehicles = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Vehicles',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route element={<PoliceVehicleFeed />} index />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceVehicles,
                }}
              >
                <ViewPoliceVehicle />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceVehicles;
