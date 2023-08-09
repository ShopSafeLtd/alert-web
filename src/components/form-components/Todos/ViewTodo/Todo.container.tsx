import React from 'react';
import View from './Todo.view';
import useTodo from './useTodo';

const ViewTodo = ({
  id,
  onClose,
  updateTodo,
}: {
  id: string | null;
  onClose: () => void;
  updateTodo: (value: boolean, i?: string) => void;
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
    />
  );
};

export default ViewTodo;
