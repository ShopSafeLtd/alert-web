import React from 'react';

import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import View from './AdminTodos.view';
import useAdminTodos from './useAdminTodos';

const AdminTodos = (): JSX.Element => {
  const {
    variables: { search: fullSearch },
  } = useDashboardContext();
  const {
    data,
    loading,
    saving,
    // onCompletedTodo,
    addTodo,
    toggleAddTodo,
    updateTodoList,
    setSearch,
    fetchMoreScroll,
  } = useAdminTodos({ fullSearch });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      // onCompletedTodo={onCompletedTodo}
      addTodo={addTodo}
      toggleAddTodo={toggleAddTodo}
      updateTodoList={updateTodoList}
      setSearch={setSearch}
      fetchMoreScroll={fetchMoreScroll}
    />
  );
};

export default AdminTodos;
