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
