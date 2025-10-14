import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import CreateCrimeGroup from 'views/profiles/crime-groups/create-crime-group';
import ListCrimeGroups from 'views/profiles/crime-groups/list-crime-groups';
import ViewCrimeGroup from 'views/profiles/crime-groups/view-crime-group';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const CrimeGroups = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Crime groups',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.CrimeGroups,
              }}
            >
              <ListCrimeGroups />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.CrimeGroups,
              }}
            >
              <CreateCrimeGroup />
            </PermissionCheckWrapper>
          }
          path="create"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.CrimeGroups,
              }}
            >
              <ViewCrimeGroup />
            </PermissionCheckWrapper>
          }
          path="view/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default CrimeGroups;
