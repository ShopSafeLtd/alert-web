import React from 'react';
import { Route, Routes } from 'react-router';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import Dashboard from '#/views/dashboard/FeedItems.container';
import { DashboardProvider } from '#/views/dashboard/Dashboard.context';
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { useIntl } from 'react-intl';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const DashboardRouter = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Dashboard',
      })}
    >
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
    </RouteWrapper>
  );
};

export default DashboardRouter;
