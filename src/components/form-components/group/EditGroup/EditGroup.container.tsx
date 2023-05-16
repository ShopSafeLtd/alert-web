import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditGroup.view';
import useEditGroup from './useEditGroup';

interface Props {
  onClose: () => void;
}

const EditGroup = ({ onClose }: Props): JSX.Element => {
  const groupId = useParams().id || '';

  const {
    onSubmit,
    data,
    loading,
    usersData,
    usersLoading,
    saving,
    selectedUsers,
    setSelectedUsers,
    adminUsersData,
  } = useEditGroup({
    onClose,
    groupId,
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
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      adminUsersData={adminUsersData}
    />
  );
};

export default EditGroup;
