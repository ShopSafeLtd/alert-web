import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceIncidentFeed = lazy(
  () => import('views/police-incidents/police-incident-feed')
);
const ViewPoliceIncident = lazy(
  () => import('views/police-incidents/view-police-incident')
);

const PoliceIncidents = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Incidents',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route element={<PoliceIncidentFeed />} index />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceIncidents,
                }}
              >
                <ViewPoliceIncident />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceIncidents;
