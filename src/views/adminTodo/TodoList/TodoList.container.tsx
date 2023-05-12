import React from 'react';

import View from './TodoList.view';
import useAdminTodos from './useTodoList';

const AdminTodos = (): JSX.Element => {
  const {
    data,
    loading,
    saving,
    onCompletedTodo,
    onUncompletedTodo,
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
      onCompletedTodo={onCompletedTodo}
      onUncompletedTodo={onUncompletedTodo}
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
