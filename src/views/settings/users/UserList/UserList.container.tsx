import React from 'react';
import View from './UserList.view';
import useUserList from './useUserList';

const UserList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    groups,
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
    userStatus,
    setUserStatus,
    userRole,
    setUserRole,
    order,
    setOrder,
    sortFilter,
    toggleSortFilter,
    clearFilters,
  } = useUserList();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      groups={groups}
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
      userStatus={userStatus}
      setUserStatus={setUserStatus}
      userRole={userRole}
      setUserRole={setUserRole}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      order={order}
      setOrder={setOrder}
      clearFilters={clearFilters}
    />
  );
};

export default UserList;
