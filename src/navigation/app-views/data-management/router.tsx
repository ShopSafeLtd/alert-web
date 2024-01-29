import React from 'react';
import { Route, Routes } from 'react-router';
import ExportIncidents from 'views/data-management/export-incidents/exportIncidents.container';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const DataManagement = (): JSX.Element => (
  <Routes>
    <Route
      path="export-incidents"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Read,
          }}
        >
          <ExportIncidents />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default DataManagement;
