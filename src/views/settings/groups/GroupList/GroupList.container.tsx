import React from 'react';
import View from './GroupList.view';
import useGroupList from './useGroupList';

const GroupList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    addGroup,
    toggleAddGroup,
    updateGroupList,
  } = useGroupList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addGroup={addGroup}
      toggleAddGroup={toggleAddGroup}
      updateGroupList={updateGroupList}
    />
  );
};

export default GroupList;
