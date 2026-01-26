import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PoliceCrimeGroupFeed = lazy(
  () => import('views/police-crime-groups/police-crime-group-feed')
);
const ViewPoliceCrimeGroup = lazy(
  () => import('views/police-crime-groups/view-police-crime-group')
);

const PoliceCrimeGroups = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Crime Groups',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route element={<PoliceCrimeGroupFeed />} index />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.PoliceCrimeGroups,
                }}
              >
                <ViewPoliceCrimeGroup />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          />
          {/* Remove "add" route - read-only intelligence view */}
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default PoliceCrimeGroups;
