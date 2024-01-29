import React from 'react';
import { Route, Routes } from 'react-router';
// import ReviewIncident from 'views/incidents/ReviewIncident ';
import ListInvestigations from '../../../views/investigations/ListInvestigations/ListInvestigations.container';
import ViewInvestigation from '../../../views/investigations/ViewInvestigation/ViewInvestigation.container';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const Investigations = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Investigations,
            method: PermissionMethod.Read,
          }}
        >
          <ListInvestigations />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="view/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Investigations,
            method: PermissionMethod.Read,
          }}
        >
          <ViewInvestigation />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Investigations;
