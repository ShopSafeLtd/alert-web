import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { APP_PREFIX_PATH } from '#/configs/AppConfig';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { schemeTypeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { DashboardProvider } from '#/views/dashboard/Dashboard.context';
import Dashboard from '#/views/dashboard/FeedItems.container';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router';

import DashboardUnauthorizedHandler from './DashboardUnauthorizedHandler';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const DashboardRouter = (): JSX.Element => {
  const intl = useIntl();
  const schemeType = useAtomValue(schemeTypeAtom);

  // Redirect to police dashboard for POLICE_HUB schemes
  if (schemeType === 'POLICE_HUB') {
    return <Navigate replace to={`${APP_PREFIX_PATH}/police-dashboard`} />;
  }

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
              unauthorizedElement={<DashboardUnauthorizedHandler />}
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
