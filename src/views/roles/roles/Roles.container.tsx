import React from 'react';

import View from './Roles.view';
import useRoles from './useRoles';

const RolesContainer = () => {
  const { data, fetchPage, loading } = useRoles();
  return <View data={data} fetchPage={fetchPage} loading={loading} />;
};

export default RolesContainer;
