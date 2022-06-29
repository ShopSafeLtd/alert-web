import React from 'react';
import View from './AddUser.view';
import useAddUser from './useAddUser';
import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
}

const AddUser = ({ onClose, update, updateSearch }: Props) => {
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
  } = useAddUser({ onClose, update, updateSearch });

  return (
    <View
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
    />
  );
};

export default AddUser;
