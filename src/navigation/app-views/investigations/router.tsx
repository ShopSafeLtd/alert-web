import Loading from '#/components/shared-components/AntD/Loading';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy } from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const ListInvestigations = lazy(
  () =>
    import(
      '../../../views/investigations/ListInvestigations/ListInvestigations.container'
    )
);
const ViewInvestigation = lazy(
  () =>
    import(
      '../../../views/investigations/ViewInvestigation/ViewInvestigation.container'
    )
);
const FlowMapPage = lazy(
  () => import('../../../views/investigations/ViewInvestigation/FlowMapPage')
);
const InvestigationsLayout = lazy(
  () => import('../../../views/investigations/InvestigationsLayout')
);

const Investigations = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Investigations',
      })}
    >
      <Suspense fallback={<Loading cover="content" />}>
        <Routes>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Investigations,
                }}
              >
                <ListInvestigations />
              </PermissionCheckWrapper>
            }
            index
          />
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Investigations,
                }}
              >
                <InvestigationsLayout />
              </PermissionCheckWrapper>
            }
            path="view/:id"
          >
            <Route element={<ViewInvestigation />} index />
          </Route>
          <Route
            element={
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Investigations,
                }}
              >
                <InvestigationsLayout />
              </PermissionCheckWrapper>
            }
            path="view/:id/flow"
          >
            <Route element={<FlowMapPage />} index />
          </Route>
        </Routes>
      </Suspense>
    </RouteWrapper>
  );
};

export default Investigations;
