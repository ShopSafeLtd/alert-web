import React from 'react';
import { useParams } from 'react-router';

import RoleView from './Role.view';
import { useRole } from './useRole';

const ViewRoleContainer = ({ create = false }: { create?: boolean }) => {
  const { id } = useParams();
  const {
    changed,
    clearAll,
    data,
    form,
    loading,
    onDelete,
    onFinish,
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
      clearAll={clearAll}
      create={create}
      data={data}
      form={form}
      id={id || ''}
      loading={loading}
      onDelete={onDelete}
      onFinish={onFinish}
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
