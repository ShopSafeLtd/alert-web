import React from 'react';
import { useParams } from 'react-router-dom';

import View from './EditChat.view';
import useEditChat from './useEditChat';

interface Props {
  onClose: () => void;
}

const EditChat = ({ onClose }: Props): JSX.Element => {
  const chatId = useParams().id || '';

  const { data, loading, onSubmit, saving, usersData, usersLoading } =
    useEditChat({
      chatId,
      onClose,
    });
  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      usersData={usersData}
      usersLoading={usersLoading}
    />
  );
};

export default EditChat;
