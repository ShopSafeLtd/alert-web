import React from 'react';
import {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
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
  } = useAddUser({ onClose, update, updateSearch, business });

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
      onSearchBusiness={onSearchBusiness}
      businessProvided={!!business}
    />
  );
};

export default AddUser;
