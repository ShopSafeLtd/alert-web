import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/generated';
import React from 'react';

import View from './AddTodo.view';
import useAddTodo from './useAddTodo';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTodoMutation>;
}

const AddTodo = ({ update, onClose }: Props): JSX.Element => {
  const { onSubmit, saving, adminUsersData, usersLoading } = useAddTodo({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      adminUsersData={adminUsersData}
      usersLoading={usersLoading}
    />
  );
};

export default AddTodo;
