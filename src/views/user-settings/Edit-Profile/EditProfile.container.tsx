import React from 'react';

import View from './EditProfile.view';
import useEditProfile from './useEditProfile';

const EditProfile = (): JSX.Element => {
  const {
    data,
    groups,
    loading,
    onClose,
    onSubmit,
    resetConfirm,
    saving,
    userDefaultGroups,
  } = useEditProfile();

  return (
    <View
      data={data}
      groups={groups}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      resetConfirm={resetConfirm}
      saving={saving}
      userDefaultGroups={userDefaultGroups}
    />
  );
};

export default EditProfile;
