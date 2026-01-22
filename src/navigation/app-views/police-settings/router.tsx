import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceSettingsRedirect = lazy(
  () => import('views/police-settings/PoliceSettingsRedirect')
);
const PoliceUserList = lazy(() => import('views/police-settings/police-users'));
const PoliceRolesList = lazy(
  () => import('views/police-settings/police-roles')
);
const ViewUser = lazy(() => import('views/settings/users/UserDetail'));
const Role = lazy(() => import('views/roles/role/ViewRole.container'));
const ReportingAreas = lazy(
  () => import('views/police-settings/reporting-areas')
);
const GeographicalAreas = lazy(
  () => import('views/police-settings/geographical-areas')
);

const PoliceSettings = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Settings',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceSettings,
                }}
              >
                <PoliceSettingsRedirect />
              </PermissionCheckWrapper>
            }
            index
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={[
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.PoliceSettings,
                  },
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.Users,
                  },
                ]}
              >
                <PoliceUserList />
              </PermissionCheckWrapper>
            }
            path="users"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={[
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.PoliceSettings,
                  },
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.Users,
                  },
                ]}
              >
                <ViewUser />
              </PermissionCheckWrapper>
            }
            path="users/view/:id"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={[
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.PoliceSettings,
                  },
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.Roles,
                  },
                ]}
              >
                <PoliceRolesList />
              </PermissionCheckWrapper>
            }
            path="roles"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={[
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.PoliceSettings,
                  },
                  {
                    method: PermissionMethod.Write,
                    model: PermissionModel.Roles,
                  },
                ]}
              >
                <Role create />
              </PermissionCheckWrapper>
            }
            path="roles/create"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={[
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.PoliceSettings,
                  },
                  {
                    method: PermissionMethod.Read,
                    model: PermissionModel.Roles,
                  },
                ]}
              >
                <Role />
              </PermissionCheckWrapper>
            }
            path="roles/:id"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceSettings,
                }}
              >
                <ReportingAreas />
              </PermissionCheckWrapper>
            }
            path="reporting-areas"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceSettings,
                }}
              >
                <GeographicalAreas />
              </PermissionCheckWrapper>
            }
            path="geographical-areas"
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceSettings;
