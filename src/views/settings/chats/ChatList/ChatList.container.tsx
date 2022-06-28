import React from "react";
import View from "./ChatList.view";
import useChatList from "./useChatList";

const ChatList = () => {
  const { data, loading, search, setSearch, addChatGroup, toggleAddChatGroup } =
    useChatList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addChatGroup={addChatGroup}
      toggleAddChatGroup={toggleAddChatGroup}
    />
  );
};

export default ChatList;
