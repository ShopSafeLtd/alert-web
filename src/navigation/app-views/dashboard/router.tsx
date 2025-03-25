import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { DashboardProvider } from '#/views/dashboard/Dashboard.context';
import Dashboard from '#/views/dashboard/FeedItems.container';
import ReportOnly from '#/views/report-only/ReportOnly.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

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
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dashboard,
              }}
              unauthorizedElement={<ReportOnly />}
            >
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            </PermissionCheckWrapper>
          }
          index
        />
      </Routes>
    </RouteWrapper>
  );
};

export default DashboardRouter;
