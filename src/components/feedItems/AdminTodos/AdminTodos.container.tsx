import React from 'react';

import View from './AdminTodos.view';
import useAdminTodos from './useAdminTodos';

interface Props {
  fullSearch: string;
  groupsFilter: string[];
}
const AdminTodos = ({ fullSearch, groupsFilter }: Props): JSX.Element => {
  const {
    data,
    loading,
    saving,
    onCompletedTodo,
    addTodo,
    toggleAddTodo,
    updateTodoList,
    setSearch,
    onPaginationChange,
    currentPage,
    currentPageSize,
  } = useAdminTodos({ fullSearch, groupsFilter });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      onCompletedTodo={onCompletedTodo}
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
