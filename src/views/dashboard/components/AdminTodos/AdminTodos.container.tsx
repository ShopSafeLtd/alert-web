import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import React from 'react';

import View from './AdminTodos.view';
import useAdminTodos from './useAdminTodos';

const AdminTodos = (): JSX.Element => {
  const {
    variables: { search: fullSearch },
  } = useDashboardContext();
  const {
    // onCompletedTodo,
    addTodo,
    data,
    fetchMoreScroll,
    loading,
    saving,
    setSearch,
    toggleAddTodo,
    updateTodoList,
  } = useAdminTodos({ fullSearch });

  return (
    <View
      // onCompletedTodo={onCompletedTodo}
      addTodo={addTodo}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      saving={saving}
      setSearch={setSearch}
      toggleAddTodo={toggleAddTodo}
      updateTodoList={updateTodoList}
    />
  );
};

export default AdminTodos;
