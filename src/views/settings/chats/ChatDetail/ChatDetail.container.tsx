import React from 'react';
import View from './ChatDetail.view';
import useChatDetail from './useChatDetail';

function ChatDetail(): JSX.Element {
  const { data, loading, editChat, toggleEditChat, saving, deleteConfirm } =
    useChatDetail();
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
}

export default ChatDetail;
