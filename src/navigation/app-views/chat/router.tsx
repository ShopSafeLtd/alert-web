import React from 'react';
import { Route, Routes } from 'react-router';
import ViewChat from 'views/chat/ViewChat';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';
// import ViewMessage from 'components/viewChat/ViewMessage';
// import MessagesQuery from 'old-components/chat/MessagesQuery/MessagesQuery';
// import ChatRouter from 'old-components/chat/Chat/Chat';

const Chat = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Chat',
      })}
    >
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
    </RouteWrapper>
  );
};

export default Chat;
