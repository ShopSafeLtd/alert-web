import RouteWrapper from '#/navigation/utils/route-wrapper';
import MatchedShoesList from '#/views/singleShoe/SingleShoesList/MatchedShoesList.view';
import SingleShoesList from '#/views/singleShoe/SingleShoesList/SingleShoesList.container';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const SingleShoe = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'SingleShoe',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.SingleShoe,
              }}
            >
              <SingleShoesList />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.SingleShoe,
              }}
            >
              <MatchedShoesList />
            </PermissionCheckWrapper>
          }
          path="view"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default SingleShoe;
