import React from 'react';
import View from './EditGroup.view';
import useEditGroup from './useEditGroup';

interface Props {
  onClose: () => void;
}

const EditGroup = ({ onClose }: Props): JSX.Element => {
  const { onSubmit, data, loading, usersData, usersLoading, saving } =
    useEditGroup({
      onClose,
    });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
    />
  );
};

export default EditGroup;
