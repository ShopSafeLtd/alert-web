import ExportChecklistsContainer from '#/views/data-management/export-checklists/exportChecklists.container';
import ExportHome from '#/views/data-management/export-home/ExportHome.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Route, Routes } from 'react-router';
import ExportIncidents from 'views/data-management/export-incidents/exportIncidents.container';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const DataManagement = (): JSX.Element => (
  <Routes>
    <Route
      element={
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Read,
            model: PermissionModel.DataExport,
          }}
        >
          <ExportHome />
        </PermissionCheckWrapper>
      }
      index
    />
    <Route
      element={
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Read,
            model: PermissionModel.DataExport,
          }}
        >
          <ExportIncidents />
        </PermissionCheckWrapper>
      }
      path="export-incidents"
    />
    <Route
      element={
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Read,
            model: PermissionModel.DataExport,
          }}
        >
          <ExportChecklistsContainer />
        </PermissionCheckWrapper>
      }
      path="export-checklists"
    />
  </Routes>
);

export default DataManagement;
