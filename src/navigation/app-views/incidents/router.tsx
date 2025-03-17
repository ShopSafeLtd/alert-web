import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import AddIncident from 'views/incidents/AddIncident';
import IncidentFeed from 'views/incidents/IncidentFeed';
import ViewIncident from 'views/incidents/ViewIncident';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Incidents = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Incidents',
      })}
    >
      <Routes>
        <Route element={<IncidentFeed />} index />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Incidents,
              }}
            >
              <ViewIncident />
            </PermissionCheckWrapper>
          }
          path="view/:id"
        />

        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Incidents,
              }}
            >
              <AddIncident />
            </PermissionCheckWrapper>
          }
          path="add/:investigationId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Incidents,
              }}
            >
              <AddIncident />
            </PermissionCheckWrapper>
          }
          path="add"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Incidents;
