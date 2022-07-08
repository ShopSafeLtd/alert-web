import React from 'react';
import View from './ChatDetail.view';
import useChatDetail from './useChatDetail';

function ChatDetail() {
  const { data, loading, editChat, toggleEditChat, saving, openDelete } =
    useChatDetail();
  return (
    <div>
      <View
        data={data}
        loading={loading}
        editChat={editChat}
        toggleEditChat={toggleEditChat}
        saving={saving}
        openDelete={openDelete}
      />
    </div>
  );
}

export default ChatDetail;
