import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
const ListBusinesses = lazy(
  () => import('views/settings/businesses/ListBusinesses')
);
const ViewBusiness = lazy(
  () => import('views/settings/businesses/ViewBusiness')
);

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Businesses = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Businesses',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  method: PermissionMethod.Read,
                  model: PermissionModel.Businesses,
                },
              ]}
            >
              <ListBusinesses />
            </PermissionCheckWrapper>
          }
          path="*"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Businesses,
              }}
            >
              <ViewBusiness />
            </PermissionCheckWrapper>
          }
          path="/view/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Businesses;
