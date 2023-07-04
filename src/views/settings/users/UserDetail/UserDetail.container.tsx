import React from 'react';
import { useParams } from 'react-router-dom';
import View from './UserDetail.view';

import useUserDetail from './useUserDetail';

const UserDetail = (): JSX.Element => {
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
    />
  );
};

export default UserDetail;
