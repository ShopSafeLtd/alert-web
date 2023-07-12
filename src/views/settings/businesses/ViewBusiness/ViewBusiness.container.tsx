import React from 'react';
import View from './ViewBusiness.view';
import useViewBusiness from './useViewBusiness';

const ViewBusiness = () => {
  const {
    data,
    loading,
    businessId,
    editVisible,
    toggleEdit,
    inviteUserVisible,
    toggleInviteUser,
    updateUsersList,
    updateUsersListExisting,
    usersData,
    usersLoading,
    addUserVisible,
    toggleAddUser,
    updateAddUsersToBusiness,
    actionsData,
    onRemoveBusiness,
    toggleLinkDem,
    linkDemVisible,
    saving,
    deleteConfirm,
  } = useViewBusiness();

  return (
    <View
      linkDemVisible={linkDemVisible}
      toggleLinkDem={toggleLinkDem}
      data={data}
      loading={loading}
      businessId={businessId}
      editVisible={editVisible}
      toggleEdit={toggleEdit}
      inviteUserVisible={inviteUserVisible}
      toggleInviteUser={toggleInviteUser}
      updateUsersList={updateUsersList}
      updateUsersListExisting={updateUsersListExisting}
      usersData={usersData}
      usersLoading={usersLoading}
      addUserVisible={addUserVisible}
      toggleAddUser={toggleAddUser}
      updateAddUsersToBusiness={updateAddUsersToBusiness}
      actionsData={actionsData}
      onRemoveBusiness={onRemoveBusiness}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default ViewBusiness;
