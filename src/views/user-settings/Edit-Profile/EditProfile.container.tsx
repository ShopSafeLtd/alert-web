import React from 'react';
import View from './EditProfile.view';
import useEditProfile from './useEditProfile';

const EditProfile = (): JSX.Element => {
  const {
    onSubmit,
    onClose,
    data,
    loading,
    saving,
    groups,
    userDefaultGroups,
  } = useEditProfile();

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      data={data}
      loading={loading}
      groups={groups}
      userDefaultGroups={userDefaultGroups}
    />
  );
};

export default EditProfile;
