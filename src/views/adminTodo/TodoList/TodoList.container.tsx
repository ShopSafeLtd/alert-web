import React from 'react';
import { useParams } from 'react-router-dom';

import View from './TodoList.view';
import useAdminTodos from './useTodoList';

const AdminTodos = (): JSX.Element => {
  const id = useParams().id || '';

  const {
    addTodo,
    canDelete,
    currentPage,
    currentPageSize,
    data,
    editTodo,
    groupsData,
    // groupsFilter,
    loading,
    onCompletedTodo,
    onDeleteTodo,
    onPaginationChange,
    // onTableChange,
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
    setUsersFilter,
    templateData,
    toggleAddTodo,
    toggleAllSchemes,
    toggleAllUsers,
    updateTodoList,
  } = useAdminTodos({ defaultOpen: id });

  return (
    <View
      addTodo={addTodo}
      canDelete={canDelete}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      data={data}
      editTodo={editTodo}
      groupsData={groupsData}
      // groupsFilter={groupsFilter}
      loading={loading}
      onCompletedTodo={onCompletedTodo}
      onDeleteTodo={onDeleteTodo}
      onPaginationChange={onPaginationChange}
      // onTableChange={onTableChange}
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
      setUsersFilter={setUsersFilter}
      templateData={templateData}
      toggleAddTodo={toggleAddTodo}
      toggleAllSchemes={toggleAllSchemes}
      toggleAllUsers={toggleAllUsers}
      updateTodoList={updateTodoList}
    />
  );
};

export default AdminTodos;
