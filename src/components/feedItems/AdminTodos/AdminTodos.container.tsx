import React from 'react';

import View from './AdminTodos.view';
import useAdminTodos from './useAdminTodos';

interface Props {
  fullSearch: string;
}
const AdminTodos = ({ fullSearch }: Props): JSX.Element => {
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
  } = useAdminTodos({ fullSearch });

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
