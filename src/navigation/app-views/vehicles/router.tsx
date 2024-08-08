import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import AddVehicle from 'views/profiles/Vehicles/AddVehicle';
import ListVehicles from 'views/profiles/Vehicles/ListVehicles';
import ViewVehicle from 'views/profiles/Vehicles/ViewVehicle';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Vehicles = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Vehicles',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Vehicles,
              }}
            >
              <ListVehicles />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Vehicles,
              }}
            >
              <ViewVehicle />
            </PermissionCheckWrapper>
          }
          path="view/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Vehicles,
              }}
            >
              <AddVehicle />
            </PermissionCheckWrapper>
          }
          path="add"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Vehicles;
