import React from 'react';
import { Route, Routes } from 'react-router';
// import ReviewIncident from 'views/incidents/ReviewIncident ';
import ListInvestigations from '../../../views/investigations/ListInvestigations/ListInvestigations.container';
import ViewInvestigation from '../../../views/investigations/ViewInvestigation/ViewInvestigation.container';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const Investigations = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Investigations',
      })}
    >
      <Routes>
        <Route
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Investigations,
                method: PermissionMethod.Read,
              }}
            >
              <ListInvestigations />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Investigations,
                method: PermissionMethod.Read,
              }}
            >
              <ViewInvestigation />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Investigations;
