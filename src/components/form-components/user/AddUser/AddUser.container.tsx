import React from 'react';
import type {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './AddUser.view';
import useAddUser from './useAddUser';

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
    onSearchBusiness,
    schemeLoading,
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    addBusinessVisible,
    toggleAddBusinessVisible,
  } = useAddUser({ onClose, update, updateSearch, business });

  return (
    <View
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
      onSearchBusiness={onSearchBusiness}
      businessProvided={!!business}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
      addBusinessVisible={addBusinessVisible}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
    />
  );
};

export default AddUser;
