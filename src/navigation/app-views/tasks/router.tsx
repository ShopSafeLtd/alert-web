import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Route, Routes } from 'react-router';
import ViewActivities from 'views/adminTodo/TodoList/TodoList.container';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Tasks = (): JSX.Element => (
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
  </Routes>
);

export default Tasks;
