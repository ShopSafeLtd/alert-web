import React from 'react';
import View from './UserDetail.view';

import useUserDetail from './useUserDetail';

const UserDetail = () => {
  const { data, loading, editUser, toggleEditUser } = useUserDetail();
  return (
    <View
      data={data}
      loading={loading}
      editUser={editUser}
      toggleEditUser={toggleEditUser}
      // updateUserDetails={updateUserDetails}
    />
  );
};

export default UserDetail;
