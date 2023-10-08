import React from 'react';
import View from './EditProfile.view';
import useEditProfile from './useEditProfile';

const EditProfile = (): JSX.Element => {
  const { onSubmit, onClose, data, loading, saving, resetConfirm, groups } =
    useEditProfile();
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      resetConfirm={resetConfirm}
      saving={saving}
      data={data}
      loading={loading}
      groups={groups}
    />
  );
};

export default EditProfile;
