import React from 'react';
import { useParams } from 'react-router';

import RoleView from './Role.view';
import { useRole } from './useRole';

const ViewRoleContainer = ({ create = false }: { create?: boolean }) => {
  const { id } = useParams();
  const {
    changed,
    data,
    form,
    loading,
    onFinish,
    roleName,
    setChanged,
    submitting,
  } = useRole(id, create);
  return (
    <RoleView
      changed={changed}
      create={create}
      data={data}
      form={form}
      id={id || ''}
      loading={loading}
      onFinish={onFinish}
      roleName={roleName}
      setChanged={setChanged}
      submitting={submitting}
    />
  );
};

export default ViewRoleContainer;
