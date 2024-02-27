import React from 'react';
import { Route, Routes } from 'react-router';
import { PermissionMethod, PermissionModel } from 'graphql/generated';
import Dashboard from '#/views/dashboard/FeedItems.container';
import { DashboardProvider } from '#/views/dashboard/Dashboard.context';
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const DashboardRouter = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Read,
          }}
          unauthorizedElement={<div />}
        >
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default DashboardRouter;
