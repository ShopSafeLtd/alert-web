import React from 'react';
import View from './EditChat.view';
import useEditChat from './useEditChat';

interface Props {
  onClose: () => void;
}

const EditChat = ({ onClose }: Props): JSX.Element => {
  const { onSubmit, data, loading, usersData, usersLoading, saving } =
    useEditChat({
      onClose,
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
