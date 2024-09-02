import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import View from './Todo.view';
import useTodo from './useTodo';

const ViewTodo = ({
  confirmText,
  id,
  minimal = false,
  onClose,
  updateQuery,
  updateTodo,
}: {
  confirmText?: string;
  id: null | string;
  minimal?: boolean;
  onClose: () => void;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodo: (value: boolean, i?: string) => void;
}) => {
  const {
    availableUsers,
    documentList,
    documentUploadProps,
    form,
    loading,
    onSubmit,
    saving,
    setAvailableUsers,
    setUsers,
    todo,
    users,
  } = useTodo({
    id,
    onClose,
    updateQuery,
    updateTodo,
  });

  return (
    <View
      availableUsers={availableUsers}
      confirmText={confirmText}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      form={form}
      loading={loading}
      minimal={minimal}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      setAvailableUsers={setAvailableUsers}
      setUsers={setUsers}
      todo={todo}
      users={users}
    />
  );
};

export default ViewTodo;
