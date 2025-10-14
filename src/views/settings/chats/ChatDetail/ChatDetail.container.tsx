import React from 'react';
import { useParams } from 'react-router-dom';

import View from './ChatDetail.view';
import useChatDetail from './useChatDetail';

const ChatDetail = (): JSX.Element => {
  const chatId = useParams().id || '';

  const { data, deleteConfirm, editChat, loading, saving, toggleEditChat } =
    useChatDetail(chatId);
  return (
    <div>
      <View
        data={data}
        deleteConfirm={deleteConfirm}
        editChat={editChat}
        loading={loading}
        saving={saving}
        toggleEditChat={toggleEditChat}
      />
    </div>
  );
};

export default ChatDetail;
