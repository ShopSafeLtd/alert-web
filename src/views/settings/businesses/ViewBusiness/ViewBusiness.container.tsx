import React from 'react';

import View from './ViewBusiness.view';
import useViewBusiness from './useViewBusiness';

const ViewBusiness = () => {
  const {
    actionsData,
    addDemDevice,
    addTodo,
    addUserVisible,
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
    saving,
    setCompleteTodoVisible,
    setEditDeviceData,
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
    updateDeleteDemDeviceList,
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
      saving={saving}
      setCompleteTodoVisible={setCompleteTodoVisible}
      setEditDeviceData={setEditDeviceData}
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
      updateDeleteDemDeviceList={updateDeleteDemDeviceList}
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
