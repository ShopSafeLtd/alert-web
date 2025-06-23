import React from 'react';
import { useParams } from 'react-router';

import RoleView from './Role.view';
import { useRole } from './useRole';

const ViewRoleContainer = ({ create = false }: { create?: boolean }) => {
  const { id } = useParams();
  const {
    changed,
    checklistsData,
    clearAll,
    data,
    foldersData,
    form,
    loading,
    onChecklistsToggle,
    onDelete,
    onFinish,
    onFoldersToggle,
    onSelectChecklist,
    onSelectFolder,
    onSettingsToggle,
    roleName,
    setAll,
    setChanged,
    showDelete,
    submitting,
    toggleShowDelete,
  } = useRole(id, create);
  return (
    <RoleView
      changed={changed}
      checklistsData={checklistsData}
      clearAll={clearAll}
      create={create}
      data={data}
      foldersData={foldersData}
      form={form}
      id={id || ''}
      loading={loading}
      onChecklistsToggle={onChecklistsToggle}
      onDelete={onDelete}
      onFinish={onFinish}
      onFoldersToggle={onFoldersToggle}
      onSelectChecklist={onSelectChecklist}
      onSelectFolder={onSelectFolder}
      onSettingsToggle={onSettingsToggle}
      roleName={roleName}
      setAll={setAll}
      setChanged={setChanged}
      showDelete={showDelete}
      submitting={submitting}
      toggleShowDelete={toggleShowDelete}
    />
  );
};

export default ViewRoleContainer;
