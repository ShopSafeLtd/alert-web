import React from 'react';

import View from './GroupList.view';
import useGroupList from './useGroupList';

const GroupList = (): JSX.Element => {
  const {
    addGroup,
    data,
    loading,
    order,
    pageSize,
    search,
    setOrder,
    setPageSize,
    setSearch,
    toggleAddGroup,
    updateGroupList,
  } = useGroupList();

  return (
    <View
      addGroup={addGroup}
      data={data}
      loading={loading}
      order={order}
      pageSize={pageSize}
      search={search}
      setOrder={setOrder}
      setPageSize={setPageSize}
      setSearch={setSearch}
      toggleAddGroup={toggleAddGroup}
      updateGroupList={updateGroupList}
    />
  );
};

export default GroupList;
