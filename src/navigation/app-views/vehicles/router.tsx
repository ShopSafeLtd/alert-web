import React from 'react';
import { Route, Routes } from 'react-router';
import AddVehicle from 'views/profiles/Vehicles/AddVehicle';
import ListVehicles from 'views/profiles/Vehicles/ListVehicles';
import ViewVehicle from 'views/profiles/Vehicles/ViewVehicle';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const Vehicles = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Vehicles,
            method: PermissionMethod.Read,
          }}
        >
          <ListVehicles />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="view/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Vehicles,
            method: PermissionMethod.Read,
          }}
        >
          <ViewVehicle />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="add"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Vehicles,
            method: PermissionMethod.Write,
          }}
        >
          <AddVehicle />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Vehicles;
