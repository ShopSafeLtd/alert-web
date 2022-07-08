import React from 'react';
import View from './UserDetail.view';

import useUserDetail from './useUserDetail';

const UserDetail = (): JSX.Element => {
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
  } = useUserDetail();
  return (
    <View
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
