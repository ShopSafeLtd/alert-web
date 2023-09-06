import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './Todo.view';
import useTodo from './useTodo';
import type { UpdateTaskMutation } from '../../../../graphql/generated';

const ViewTodo = ({
  id,
  onClose,
  updateTodo,
  confirmText,
  updateQuery,
}: {
  id: string | null;
  onClose: () => void;
  updateTodo: (value: boolean, i?: string) => void;
  confirmText?: string;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
}) => {
  const {
    todo,
    form,
    onSubmit,
    saving,
    availableUsers,
    users,
    setUsers,
    setAvailableUsers,
    loading,
  } = useTodo({
    id,
    onClose,
    updateTodo,
    updateQuery,
  });
  return (
    <View
      todo={todo}
      form={form}
      onSubmit={onSubmit}
      saving={saving}
      availableUsers={availableUsers}
      users={users}
      setUsers={setUsers}
      setAvailableUsers={setAvailableUsers}
      loading={loading}
      onClose={onClose}
      confirmText={confirmText}
    />
  );
};

export default ViewTodo;
