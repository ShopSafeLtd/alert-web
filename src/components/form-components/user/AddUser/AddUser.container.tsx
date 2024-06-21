import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './AddUser.view';
import useAddUser from './useAddUser';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
  business?: {
    value: string;
    label: string;
  };
}

const AddUser = ({
  onClose,
  update,
  updateSearch,
  business,
}: Props): JSX.Element => {
  const {
    onSubmit,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
    onValuesChange,
    form,
    existingUser,
    schemeLoading,
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    availableRoles,
  } = useAddUser({ onClose, update, updateSearch, business });

  return (
    <View
      availableRoles={availableRoles}
      schemeLoading={schemeLoading}
      onSubmit={onSubmit}
      onClose={onClose}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      chatsData={chatsData}
      chatsLoading={chatsLoading}
      saving={saving}
      onValuesChange={onValuesChange}
      form={form}
      existingUser={existingUser}
      businessProvided={!!business}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
      addBusinessVisible={addBusinessVisible}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
      updateNewBusinessData={updateNewBusinessData}
    />
  );
};

export default AddUser;
