import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditChat.view';
import useEditChat from './useEditChat';

interface Props {
  onClose: () => void;
}

const EditChat = ({ onClose }: Props): JSX.Element => {
  const chatId = useParams().id || '';

  const { onSubmit, data, loading, usersData, usersLoading, saving } =
    useEditChat({
      onClose,
      chatId,
    });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
    />
  );
};

export default EditChat;
