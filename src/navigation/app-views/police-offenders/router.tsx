import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const AddPoliceOffender = lazy(
  () => import('views/police-offenders/AddPoliceOffender')
);
const PoliceOffenderFeed = lazy(
  () => import('views/police-offenders/police-offender-feed')
);
const ViewPoliceOffender = lazy(
  () => import('views/police-offenders/view-police-offender')
);

const PoliceOffenders = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Offenders',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route element={<PoliceOffenderFeed />} index />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceOffenders,
                }}
              >
                <ViewPoliceOffender />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Write,
                  model: PermissionModel.PoliceOffenders,
                }}
              >
                <AddPoliceOffender />
              </PermissionCheckWrapper>
            }
            path="add"
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceOffenders;
