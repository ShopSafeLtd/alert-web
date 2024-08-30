import React from 'react';

import type { ListData } from '../useActivities';

import View from './TodoList.view';
import useAdminTodos from './useTodoList';

interface Props {
  loading: boolean;
  templateData: ListData[];
}
const AdminTodos = ({
  loading: TemplateLoading,
  templateData,
}: Props): JSX.Element => {
  const {
    addTodo,
    canDelete,
    currentPage,
    currentPageSize,
    data,
    editTodo,
    groupsData,
    groupsFilter,
    loading,
    onCompletedTodo,
    onDeleteTodo,
    onPaginationChange,
    onTableChange,
    onUncompletedTodo,
    saving,
    selectTemplate,
    selectedTemplate,
    selectedTodo,
    setEditTodo,
    setGroupsFilter,
    setSearch,
    setSelectedTodo,
    setStatusMode,
    toggleAddTodo,
    toggleAllSchemes,
    toggleAllUsers,
    updateTodoList,
    userData,
  } = useAdminTodos({ templateData });

  return (
    <View
      addTodo={addTodo}
      canDelete={canDelete}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      data={data}
      editTodo={editTodo}
      groupsData={groupsData}
      groupsFilter={groupsFilter}
      loading={loading || TemplateLoading}
      onCompletedTodo={onCompletedTodo}
      onDeleteTodo={onDeleteTodo}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      onUncompletedTodo={onUncompletedTodo}
      saving={saving}
      selectTemplate={selectTemplate}
      selectedTemplate={selectedTemplate}
      selectedTodo={selectedTodo}
      setEditTodo={setEditTodo}
      setGroupsFilter={setGroupsFilter}
      setSearch={setSearch}
      setSelectedTodo={setSelectedTodo}
      setStatusMode={setStatusMode}
      templateData={templateData}
      toggleAddTodo={toggleAddTodo}
      toggleAllSchemes={toggleAllSchemes}
      toggleAllUsers={toggleAllUsers}
      updateTodoList={updateTodoList}
      userData={userData}
    />
  );
};

export default AdminTodos;
