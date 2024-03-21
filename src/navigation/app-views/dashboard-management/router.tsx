import React from 'react';
import { Route, Routes } from 'react-router';
import ViewDashboardEditor from '#/views/dashboard-management/ViewEditDashboard/ViewDashboardEditor';
import ListDashboards from '#/views/dashboard-management/Dashboards';

const DashboardManagement = (): JSX.Element => (
  <Routes>
    <Route index element={<ListDashboards />} />
    <Route path="edit/:id" element={<ViewDashboardEditor />} />
  </Routes>
);

export default DashboardManagement;
