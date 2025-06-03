import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import ViewChat from 'views/chat/ViewChat';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
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
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Chat,
              }}
            >
              <ViewChat />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Chat,
              }}
            >
              <ViewChat />
            </PermissionCheckWrapper>
          }
          path=":id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Chat;
