import React from 'react';
// import { Routes, Route } from 'react-router';
// import ChatView from 'old-components/chat/ChatView/ChatView';
// import MessagesQuery from 'old-components/chat/MessagesQuery/MessagesQuery';
import ChatRouter from 'old-components/chat/Chat/Chat';

const Chat = (): JSX.Element => (
  <ChatRouter />
  //   <Routes>
  //     <Route index element={<ChatView />} />
  //     <Route path=":id" element={<MessagesQuery />} />
  //     {/* <Route path="view/:id" element={<MessagesQuery />} /> */}
  //   </Routes>
);

export default Chat;
