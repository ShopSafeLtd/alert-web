import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewChat.view';
import useViewChat from './useViewChat';

const ViewChat = (): JSX.Element => {
  const chatId = useParams().id;
  const {
    data,
    saving,
    handleMarkAsRead,
    currentId,
    addChat,
    toggleAddChat,
    updateAddUserChat,
    updateDeletedUserChat,
    adminRights,
    refetch,
  } = useViewChat();

  return (
    <View
      data={data}
      saving={saving}
      chatId={chatId || currentId || ''}
      handleMarkAsRead={handleMarkAsRead}
      addChat={addChat}
      toggleAddChat={toggleAddChat}
      updateAddUserChat={updateAddUserChat}
      updateDeletedUserChat={updateDeletedUserChat}
      adminRights={adminRights}
      refetch={refetch}
    />
  );
};

export default ViewChat;
