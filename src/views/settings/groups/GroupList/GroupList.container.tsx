import React from 'react';

import View from './GroupList.view';
import useGroupList from './useGroupList';

const GroupList = (): JSX.Element => {
  const {
    addGroup,
    data,
    loading,
    search,
    setSearch,
    toggleAddGroup,
    updateGroupList,
  } = useGroupList();

  return (
    <View
      addGroup={addGroup}
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      toggleAddGroup={toggleAddGroup}
      updateGroupList={updateGroupList}
    />
  );
};

export default GroupList;
