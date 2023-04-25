import React from 'react';

import View from './TodoList.view';
import useAdminTodos from './useTodoList';

const AdminTodos = (): JSX.Element => {
  const {
    data,
    loading,
    saving,
    onCompleteTodo,
    onUnCompleteTodo,
    addTodo,
    toggleAddTodo,
    updateTodoList,
    setSearch,
    onPaginationChange,
    currentPage,
    currentPageSize,
  } = useAdminTodos();

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      onCompleteTodo={onCompleteTodo}
      onUnCompleteTodo={onUnCompleteTodo}
      addTodo={addTodo}
      toggleAddTodo={toggleAddTodo}
      updateTodoList={updateTodoList}
      setSearch={setSearch}
      onPaginationChange={onPaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
    />
  );
};

export default AdminTodos;
