import React from 'react';
import { useParams } from 'react-router-dom';

import View from './ViewChat.view';
import useViewChat from './useViewChat';

const ViewChat = (): JSX.Element => {
  const chatId = useParams().id || '';
  const {
    addChat,
    currentId,
    data,
    handleMarkAsRead,
    loading,
    saving,
    toggleAddChat,
    updateAddUserChat,
    updateDeletedUserChat,
  } = useViewChat({ chatId });

  return (
    <View
      addChat={addChat}
      chatId={chatId || currentId || ''}
      data={data}
      handleMarkAsRead={handleMarkAsRead}
      loading={loading}
      saving={saving}
      toggleAddChat={toggleAddChat}
      updateAddUserChat={updateAddUserChat}
      updateDeletedUserChat={updateDeletedUserChat}
    />
  );
};

export default ViewChat;
