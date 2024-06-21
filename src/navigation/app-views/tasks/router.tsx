import React from 'react';
import { Route, Routes } from 'react-router';
import TodoList from 'views/adminTodo/Activities.container';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Tasks = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Tasks,
            method: PermissionMethod.Read,
          }}
        >
          <TodoList />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Tasks;
