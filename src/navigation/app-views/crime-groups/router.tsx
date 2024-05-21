import React from 'react';
import { Route, Routes } from 'react-router';
import ListCrimeGroups from 'views/profiles/crime-groups/list-crime-groups';
import CreateCrimeGroup from 'views/profiles/crime-groups/create-crime-group';
import ViewCrimeGroup from 'views/profiles/crime-groups/view-crime-group';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const CrimeGroups = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Crime groups',
        id: '9iudu4',
      })}
    >
      <Routes>
        <Route
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.CrimeGroups,
                method: PermissionMethod.Read,
              }}
            >
              <ListCrimeGroups />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="create"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.CrimeGroups,
                method: PermissionMethod.Write,
              }}
            >
              <CreateCrimeGroup />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.CrimeGroups,
                method: PermissionMethod.Read,
              }}
            >
              <ViewCrimeGroup />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default CrimeGroups;
