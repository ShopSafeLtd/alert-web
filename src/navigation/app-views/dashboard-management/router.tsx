import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import ListDashboards from '#/views/dashboard-management/Dashboards';
import ViewDashboardEditor from '#/views/dashboard-management/ViewEditDashboard/ViewDashboardEditor';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const DashboardManagement = (): JSX.Element => {
  const intl = useIntl();

  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Dashboard Management',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dashboards,
              }}
            >
              <ListDashboards />
            </PermissionCheckWrapper>
          }
          index
        />

        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dashboards,
              }}
            >
              <ViewDashboardEditor />
            </PermissionCheckWrapper>
          }
          path="edit/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default DashboardManagement;
