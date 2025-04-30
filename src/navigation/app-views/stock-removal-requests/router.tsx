import RouteWrapper from '#/navigation/utils/route-wrapper';
import StockRemovalRequestsListView from '#/views/stock-removal-requests/stock-removal-requests-list/StockRemovalRequestsList.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const StockRemovalRequests = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'StockRemovalRequests',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.StockRemovalRequests,
              }}
            >
              <StockRemovalRequestsListView />
            </PermissionCheckWrapper>
          }
          index
        />
      </Routes>
    </RouteWrapper>
  );
};

export default StockRemovalRequests;
