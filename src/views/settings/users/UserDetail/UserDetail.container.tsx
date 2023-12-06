import React from 'react';
import { useParams } from 'react-router-dom';
import View from './UserDetail.view';

import useUserDetail from './useUserDetail';

const UserDetailContainer = (): JSX.Element => {
  const userId = useParams().id || '';

  const {
    data,
    loading,
    editUser,
    toggleEditUser,
    saving,
    inviteConfirm,
    deleteConfirm,
    enableConfirm,
    disableConfirm,
    demLink,
    toggleDemLink,
    demId,
    userRole,
    editPassword,
    toggleEditPassword,
  } = useUserDetail(userId);

  return (
    <View
      demId={demId}
      demLink={demLink}
      toggleDemLink={toggleDemLink}
      data={data}
      loading={loading}
      editUser={editUser}
      toggleEditUser={toggleEditUser}
      saving={saving}
      inviteConfirm={inviteConfirm}
      deleteConfirm={deleteConfirm}
      enableConfirm={enableConfirm}
      disableConfirm={disableConfirm}
      userRole={userRole}
      editPassword={editPassword}
      toggleEditPassword={toggleEditPassword}
    />
  );
};

export default UserDetailContainer;
