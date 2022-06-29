import React from 'react';
import View from './AddUser.view';
import useAddUser from './useAddUser';
import { MutationUpdaterFn } from '@apollo/client';
import { CreateUserInDatabaseMutation } from 'graphql/generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
}

const AddUser = ({ onClose, update }: Props) => {
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
  } = useAddUser({ onClose, update });

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
