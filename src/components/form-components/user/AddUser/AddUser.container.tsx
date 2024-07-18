import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';

import React from 'react';

import View from './AddUser.view';
import useAddUser from './useAddUser';

interface Props {
  business?: {
    label: string;
    value: string;
  };
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
}

const AddUser = ({
  business,
  onClose,
  update,
  updateSearch,
}: Props): JSX.Element => {
  const {
    addBusinessVisible,
    availableRoles,
    chatsData,
    chatsLoading,
    existingUser,
    form,
    groupsData,
    groupsLoading,
    onSubmit,
    onValuesChange,
    saving,
    schemeLoading,
    selectedGroups,
    selectedRole,
    setSelectedGroups,
    setSelectedRole,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  } = useAddUser({ business, onClose, update, updateSearch });

  return (
    <View
      addBusinessVisible={addBusinessVisible}
      availableRoles={availableRoles}
      businessProvided={!!business}
      chatsData={chatsData}
      chatsLoading={chatsLoading}
      existingUser={existingUser}
      form={form}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      onValuesChange={onValuesChange}
      saving={saving}
      schemeLoading={schemeLoading}
      selectedGroups={selectedGroups}
      selectedRole={selectedRole}
      setSelectedGroups={setSelectedGroups}
      setSelectedRole={setSelectedRole}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
      updateNewBusinessData={updateNewBusinessData}
    />
  );
};

export default AddUser;
