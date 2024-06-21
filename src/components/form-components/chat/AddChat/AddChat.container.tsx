import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';
import View from './AddChat.view';
import useAddChat from './useAddChat';
import type { CreateChatMutation } from 'graphql/chats/mutations/create-chat.generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}

const AddChat = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, usersData, usersLoading, saving, form } = useAddChat({
    onClose,
    update,
  });

  return (
    <View
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
    />
  );
};

export default AddChat;
