import type { MutationUpdaterFn } from '@apollo/client';
import React from 'react';
import View from './AddGroup.view';
import useAddGroup from './useAddGroup';
import type { CreateGroupMutation } from 'graphql/groups/mutations/create-group.generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

const AddGroup = ({ onClose, update }: Props): JSX.Element => {
  const {
    onSubmit,
    usersData,
    adminUsersData,
    usersLoading,
    saving,
    selectedUsers,
    setSelectedUsers,
    showOffenderSettings,
    setShowOffenderSettings,
  } = useAddGroup({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      adminUsersData={adminUsersData}
      usersLoading={usersLoading}
      saving={saving}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      showOffenderSettings={showOffenderSettings}
      setShowOffenderSettings={setShowOffenderSettings}
    />
  );
};

export default AddGroup;
