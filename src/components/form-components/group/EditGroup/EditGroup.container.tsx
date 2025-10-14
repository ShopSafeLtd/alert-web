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
    adminUsersData,
    data,
    loading,
    onSubmit,
    saving,
    selectedUsers,
    setSelectedUsers,
    setShowOffenderSettings,
    showOffenderSettings,
    usersData,
    usersLoading,
  } = useEditGroup({
    groupId,
    onClose,
  });

  return (
    <View
      adminUsersData={adminUsersData}
      data={data}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      setShowOffenderSettings={setShowOffenderSettings}
      showOffenderSettings={showOffenderSettings}
      usersData={usersData}
      usersLoading={usersLoading}
    />
  );
};

export default EditGroup;
