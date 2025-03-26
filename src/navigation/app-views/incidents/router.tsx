import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const AddIncident = lazy(() => import('views/incidents/AddIncident'));
const IncidentFeed = lazy(() => import('views/incidents/IncidentFeed'));
const ViewIncident = lazy(() => import('views/incidents/ViewIncident'));

const Incidents = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Incidents',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
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
      </Suspense>
    </RouteWrapper>
  );
};

export default Incidents;
