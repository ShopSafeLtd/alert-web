import React from 'react';
import { Route, Routes } from 'react-router';
import ViewChat from 'views/chat/ViewChat';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';
// import ViewMessage from 'components/viewChat/ViewMessage';
// import MessagesQuery from 'old-components/chat/MessagesQuery/MessagesQuery';
// import ChatRouter from 'old-components/chat/Chat/Chat';

const Chat = (): JSX.Element => (
  // <ChatRouter />
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Chat,
            method: PermissionMethod.Read,
          }}
        >
          <ViewChat />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path=":id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Chat,
            method: PermissionMethod.Edit,
          }}
        >
          <ViewChat />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Chat;
