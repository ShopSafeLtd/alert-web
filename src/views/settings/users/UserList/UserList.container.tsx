import React from 'react';
import View from './UserList.view';
import useUserList from './useUserList';

const UserList = (): JSX.Element => {
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
    currentPage,
    currentPageSize,
    onPaginationChange,
    editUser,
    toggleEditUser,
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
      onPaginationChange={onPaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      editUser={editUser}
      toggleEditUser={toggleEditUser}
    />
  );
};

export default UserList;
