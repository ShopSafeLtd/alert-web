import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
// import EditOffender from 'views/profiles/offenders/EditOffender';
const AddOffender = lazy(() => import('views/profiles/offenders/AddOffender'));
const OffenderFeed = lazy(
  () => import('views/profiles/offenders/OffenderFeed')
);
const ViewOffender = lazy(
  () => import('views/profiles/offenders/ViewOffender')
);
const CompareOffender = lazy(
  () => import('views/profiles/offenders/CompareOffender')
);

const Offenders = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Offenders',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Offenders,
                }}
              >
                <OffenderFeed />
              </PermissionCheckWrapper>
            }
            index
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Offenders,
                }}
              >
                <ViewOffender />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Write,
                  model: PermissionModel.Offenders,
                }}
              >
                <AddOffender />
              </PermissionCheckWrapper>
            }
            path="add"
          />
          {/* <Route
          path="edit/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Edit,
              }}
            >
              <EditOffender reviewed={false} />
            </PermissionCheckWrapper>
          }
        /> */}
          {/* <Route
          path="review/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Edit,
              }}
              unauthorizedElement={<div />}
            >
              <EditOffender reviewed />
            </PermissionCheckWrapper>
          }
        /> */}
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Offenders,
                }}
              >
                <CompareOffender />
              </PermissionCheckWrapper>
            }
            path="compare/:id"
          />
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default Offenders;
