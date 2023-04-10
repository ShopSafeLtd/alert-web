import React from 'react';
import { useParams } from 'react-router-dom';
import View from './ChatDetail.view';
import useChatDetail from './useChatDetail';

const ChatDetail = (): JSX.Element => {
  const chatId = useParams().id || '';

  const { data, loading, editChat, toggleEditChat, saving, deleteConfirm } =
    useChatDetail(chatId);
  return (
    <div>
      <View
        data={data}
        loading={loading}
        editChat={editChat}
        toggleEditChat={toggleEditChat}
        saving={saving}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
};

export default ChatDetail;
