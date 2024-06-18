import React from 'react';

import View from './TodoList.view';
import useAdminTodos from './useTodoList';
import type { ListData } from '../useActivities';

interface Props {
  templateData: ListData[];
  loading: boolean;
}
const AdminTodos = ({
  templateData,
  loading: TemplateLoading,
}: Props): JSX.Element => {
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
    selectTemplate,
    selectedTemplate,
    onTableChange,
    groupsFilter,
    setGroupsFilter,
    groupsData,
  } = useAdminTodos({ templateData });

  return (
    <View
      selectedTemplate={selectedTemplate}
      selectTemplate={selectTemplate}
      selectedTodo={selectedTodo}
      setSelectedTodo={setSelectedTodo}
      data={data}
      loading={loading || TemplateLoading}
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
      templateData={templateData}
      onTableChange={onTableChange}
      groupsFilter={groupsFilter}
      setGroupsFilter={setGroupsFilter}
      groupsData={groupsData}
    />
  );
};

export default AdminTodos;
