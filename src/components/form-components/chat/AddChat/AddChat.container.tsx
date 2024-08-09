import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';

import React from 'react';

import View from './AddChat.view';
import useAddChat from './useAddChat';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}

const AddChat = ({ onClose, update }: Props): JSX.Element => {
  const { form, onSubmit, saving, usersData, usersLoading } = useAddChat({
    onClose,
    update,
  });

  return (
    <View
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      usersData={usersData}
      usersLoading={usersLoading}
    />
  );
};

export default AddChat;
