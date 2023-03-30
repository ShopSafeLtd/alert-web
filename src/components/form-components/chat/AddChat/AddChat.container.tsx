import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateChatMutation } from 'graphql/generated';
import React from 'react';
import View from './AddChat.view';
import useAddChat from './useAddChat';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}

const AddChat = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, usersData, usersLoading, saving } = useAddChat({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
    />
  );
};

export default AddChat;
