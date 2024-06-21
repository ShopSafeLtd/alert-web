import React from 'react';
import View from './Roles.view';
import useRoles from './useRoles';

const RolesContainer = () => {
  const { data, loading, fetchPage } = useRoles();
  return <View data={data} loading={loading} fetchPage={fetchPage} />;
};

export default RolesContainer;
