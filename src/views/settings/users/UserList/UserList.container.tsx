import React from 'react';

import View from './UserList.view';
import useUserList from './useUserList';

const UserList = (): JSX.Element => {
  const {
    addUser,
    clearFilters,
    currentPage,
    currentPageSize,
    data,
    editUser,
    groups,
    groupsLoading,
    loading,
    onPaginationChange,
    order,
    search,
    selectedGroups,
    setOrder,
    setSearch,
    setSelectedGroups,
    setUserRole,
    setUserStatus,
    sortFilter,
    toggleAddUser,
    toggleEditUser,
    toggleSortFilter,
    updateExitingUserList,
    updateUserList,
    userRole,
    userStatus,
  } = useUserList();
  console.log(data);

  return (
    <View
      addUser={addUser}
      clearFilters={clearFilters}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      data={data}
      editUser={editUser}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      onPaginationChange={onPaginationChange}
      order={order}
      search={search}
      selectedGroups={selectedGroups}
      setOrder={setOrder}
      setSearch={setSearch}
      setSelectedGroups={setSelectedGroups}
      setUserRole={setUserRole}
      setUserStatus={setUserStatus}
      sortFilter={sortFilter}
      toggleAddUser={toggleAddUser}
      toggleEditUser={toggleEditUser}
      toggleSortFilter={toggleSortFilter}
      updateExitingUserList={updateExitingUserList}
      updateUserList={updateUserList}
      userRole={userRole}
      userStatus={userStatus}
    />
  );
};

export default UserList;
