import React from 'react';
import { Route, Routes } from 'react-router';
import ListCrimeGroups from 'views/profiles/crime-groups/list-crime-groups';
import CreateCrimeGroup from 'views/profiles/crime-groups/create-crime-group';
import ViewCrimeGroup from 'views/profiles/crime-groups/view-crime-group';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const CrimeGroups = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.CrimeGroups,
            method: PermissionMethod.Read,
          }}
        >
          <ListCrimeGroups />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="create"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.CrimeGroups,
            method: PermissionMethod.Write,
          }}
        >
          <CreateCrimeGroup />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="view/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.CrimeGroups,
            method: PermissionMethod.Read,
          }}
        >
          <ViewCrimeGroup />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default CrimeGroups;
