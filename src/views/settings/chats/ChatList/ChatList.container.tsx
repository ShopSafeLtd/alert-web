import React from 'react';
import View from './ChatList.view';
import useChatList from './useChatList';

const ChatList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    addChat,
    toggleAddChat,
    updateChatList,
  } = useChatList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addChat={addChat}
      toggleAddChat={toggleAddChat}
      updateChatList={updateChatList}
    />
  );
};

export default ChatList;
