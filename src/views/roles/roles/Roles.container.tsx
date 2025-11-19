import React from 'react';

import View from './Roles.view';
import useRoles from './useRoles';

const RolesContainer = () => {
  const {
    data,
    fetchPage,
    loading,
    order,
    pageSize,
    search,
    setOrder,
    setPageSize,
    setSearch,
  } = useRoles();
  return (
    <View
      data={data}
      fetchPage={fetchPage}
      loading={loading}
      order={order}
      pageSize={pageSize}
      search={search}
      setOrder={setOrder}
      setPageSize={setPageSize}
      setSearch={setSearch}
    />
  );
};

export default RolesContainer;
