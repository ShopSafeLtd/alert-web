import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import ListDashboards from '#/views/dashboard-management/Dashboards';
import ViewDashboardEditor from '#/views/dashboard-management/ViewEditDashboard/ViewDashboardEditor';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Route, Routes } from 'react-router';

const DashboardManagement = (): JSX.Element => (
  <Routes>
    <PermissionCheckWrapper
      permission={{
        method: PermissionMethod.Read,
        model: PermissionModel.Dashboards,
      }}
    >
      <Route element={<ListDashboards />} index />
    </PermissionCheckWrapper>
    <PermissionCheckWrapper
      permission={{
        method: PermissionMethod.Read,
        model: PermissionModel.Dashboards,
      }}
    >
      <Route element={<ViewDashboardEditor />} path="edit/:id" />
    </PermissionCheckWrapper>
  </Routes>
);

export default DashboardManagement;
