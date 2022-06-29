import React from 'react';
import View from './UserList.view';
import useUserList from './useUserList';

const UserList = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    groupsData,
    groupsLoading,
    selectedGroups,
    setSelectedGroups,
    addUser,
    toggleAddUser,
    updateUserList,
    updateExitingUserList,
  } = useUserList();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
      addUser={addUser}
      toggleAddUser={toggleAddUser}
      updateUserList={updateUserList}
      updateExitingUserList={updateExitingUserList}
    />
  );
};

export default UserList;
