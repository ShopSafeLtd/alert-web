import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';

import React from 'react';

import View from './AddGroup.view';
import useAddGroup from './useAddGroup';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

const AddGroup = ({ onClose, update }: Props): JSX.Element => {
  const {
    adminUsersData,
    onSubmit,
    saving,
    selectedUsers,
    setSelectedUsers,
    setShowOffenderSettings,
    showOffenderSettings,
    usersData,
    usersLoading,
  } = useAddGroup({
    onClose,
    update,
  });

  return (
    <View
      adminUsersData={adminUsersData}
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

export default AddGroup;
