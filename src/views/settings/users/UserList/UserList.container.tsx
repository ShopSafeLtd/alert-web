import React from 'react';

import View from './UserList.view';
import useUserList from './useUserList';

interface Props {
  basePath?: string;
}

const UserList = ({ basePath }: Props): JSX.Element => {
  const {
    addUser,
    bulkInviteConfirm,
    bulkInviting,
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
    selectedGroups,
    selectedUserIds,
    setOrder,
    setSearch,
    setSelectedGroups,
    setSelectedUserIds,
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

  return (
    <View
      addUser={addUser}
      basePath={basePath}
      bulkInviteConfirm={bulkInviteConfirm}
      bulkInviting={bulkInviting}
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
      selectedGroups={selectedGroups}
      selectedUserIds={selectedUserIds}
      setOrder={setOrder}
      setSearch={setSearch}
      setSelectedGroups={setSelectedGroups}
      setSelectedUserIds={setSelectedUserIds}
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
