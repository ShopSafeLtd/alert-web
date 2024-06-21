import React from 'react';
import { useParams } from 'react-router';
import RoleView from './Role.view';
import { useRole } from './useRole';

const ViewRoleContainer = ({ create = false }: { create?: boolean }) => {
  const { id } = useParams();
  const {
    form,
    changed,
    setChanged,
    submitting,
    onFinish,
    data,
    roleName,
    loading,
  } = useRole(id, create);
  return (
    <RoleView
      id={id || ''}
      create={create}
      form={form}
      changed={changed}
      setChanged={setChanged}
      submitting={submitting}
      onFinish={onFinish}
      data={data}
      roleName={roleName}
      loading={loading}
    />
  );
};

export default ViewRoleContainer;
