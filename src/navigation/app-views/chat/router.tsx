import React from 'react';
import { Routes, Route } from 'react-router';
import ViewChat from 'views/chat/ViewChat';
// import ViewMessage from 'components/viewChat/ViewMessage';
// import MessagesQuery from 'old-components/chat/MessagesQuery/MessagesQuery';
// import ChatRouter from 'old-components/chat/Chat/Chat';

const Chat = (): JSX.Element => (
  // <ChatRouter />
  <Routes>
    <Route index element={<ViewChat />} />
    <Route path=":id" element={<ViewChat />} />
  </Routes>
);

export default Chat;
