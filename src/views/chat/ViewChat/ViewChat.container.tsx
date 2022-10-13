import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ViewChat.view';
import useViewChat from './useViewChat';

const ViewChat = (): JSX.Element => {
  const chatId = useParams().id;
  const {
    data,
    loading,
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
  console.log(
    'createdAt',
    data?.user?.chats.map((el) => el.createdAt)
  );
  console.log(
    'message createdAt',
    data?.user?.chats.map((el) => el.chat.messages)
  );
  return (
    <View
      data={data}
      loading={loading}
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
