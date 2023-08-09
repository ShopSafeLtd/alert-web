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
    toggleAllUsers,
    toggleAllSchemes,
    setSelectedTodo,
    selectedTodo,
  } = useAdminTodos();

  return (
    <View
      selectedTodo={selectedTodo}
      setSelectedTodo={setSelectedTodo}
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
      toggleAllUsers={toggleAllUsers}
      toggleAllSchemes={toggleAllSchemes}
    />
  );
};

export default AdminTodos;
