import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import ViewActivities from 'views/adminTodo/TodoList/TodoList.container';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Tasks = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Tasks',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Tasks,
              }}
            >
              <ViewActivities />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Tasks,
              }}
            >
              <ViewActivities />
            </PermissionCheckWrapper>
          }
          index
          path="view/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Tasks;
