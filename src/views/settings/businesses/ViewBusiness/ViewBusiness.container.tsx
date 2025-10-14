import React from 'react';

import View from './ViewBusiness.view';
import useViewBusiness from './useViewBusiness';

const ViewBusiness = () => {
  const {
    actionsData,
    addDemDevice,
    addTodo,
    addUserVisible,
    bulkInviteConfirm,
    bulkInviting,
    businessId,
    completeTodoVisible,
    data,
    deleteConfirm,
    editDeviceData,
    editVisible,
    evidenceData,
    evidenceLoading,
    inviteUserVisible,
    linkDemVisible,
    loading,
    onEditAddress,
    onRemoveBusiness,
    onRemoveDevice,
    saving,
    selectedUserIds,
    setCompleteTodoVisible,
    setEditDeviceData,
    setSelectedUserIds,
    setViewTodoVisible,
    templatesData,
    templatesLoading,
    toggleAddDemDevice,
    toggleAddTodo,
    toggleAddUser,
    toggleEdit,
    toggleInviteUser,
    toggleLinkDem,
    updateAddUsersToBusiness,
    updateDeleteEvidenceList,
    updateDemDeviceList,
    updateTodo,
    updateTodoList,
    updateUsersList,
    updateUsersListExisting,
    usersData,
    usersLoading,
    viewTodoVisible,
  } = useViewBusiness();

  return (
    <View
      actionsData={actionsData}
      addDemDevice={addDemDevice}
      addTodo={addTodo}
      addUserVisible={addUserVisible}
      bulkInviteConfirm={bulkInviteConfirm}
      bulkInviting={bulkInviting}
      businessId={businessId}
      completeTodoVisible={completeTodoVisible}
      data={data}
      deleteConfirm={deleteConfirm}
      editDeviceData={editDeviceData}
      editVisible={editVisible}
      evidenceData={evidenceData}
      evidenceLoading={evidenceLoading}
      inviteUserVisible={inviteUserVisible}
      linkDemVisible={linkDemVisible}
      loading={loading}
      onEditAddress={onEditAddress}
      onRemoveBusiness={onRemoveBusiness}
      onRemoveDevice={onRemoveDevice}
      saving={saving}
      selectedUserIds={selectedUserIds}
      setCompleteTodoVisible={setCompleteTodoVisible}
      setEditDeviceData={setEditDeviceData}
      setSelectedUserIds={setSelectedUserIds}
      setViewTodoVisible={setViewTodoVisible}
      templatesData={templatesData}
      templatesLoading={templatesLoading}
      toggleAddDemDevice={toggleAddDemDevice}
      toggleAddTodo={toggleAddTodo}
      toggleAddUser={toggleAddUser}
      toggleEdit={toggleEdit}
      toggleInviteUser={toggleInviteUser}
      toggleLinkDem={toggleLinkDem}
      updateAddUsersToBusiness={updateAddUsersToBusiness}
      updateDeleteEvidenceList={updateDeleteEvidenceList}
      updateDemDeviceList={updateDemDeviceList}
      updateTodo={updateTodo}
      updateTodoList={updateTodoList}
      updateUsersList={updateUsersList}
      updateUsersListExisting={updateUsersListExisting}
      usersData={usersData}
      usersLoading={usersLoading}
      viewTodoVisible={viewTodoVisible}
    />
  );
};

export default ViewBusiness;
