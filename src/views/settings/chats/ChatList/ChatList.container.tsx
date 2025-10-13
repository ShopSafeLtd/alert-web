import React from 'react';

import View from './ChatList.view';
import useChatList from './useChatList';

const ChatList = (): JSX.Element => {
  const {
    addChat,
    data,
    loading,
    search,
    setSearch,
    toggleAddChat,
    updateChatList,
  } = useChatList();
  return (
    <View
      addChat={addChat}
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      toggleAddChat={toggleAddChat}
      updateChatList={updateChatList}
    />
  );
};

export default ChatList;
