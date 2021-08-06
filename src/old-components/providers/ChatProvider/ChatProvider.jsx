import React from 'react';
import { Query } from 'react-apollo';

import ChatNotifications from '../../../graphql/chat/queries/ChatNotifications';
import NotificationSubscription from '../../../graphql/chat/queries/NotificationSubscription';
import { useStoreActions, useStoreState } from '../../../state';

const ChatProvider = ({ refetch, children }) => {
  const setNewMessages = useStoreActions(
    actions => actions.theme.setNewMessages
  );
  const userId = useStoreState(state => state.user.id);
  const schemeId = useStoreState(state => state.scheme.id);

  return (
    <Query
      query={ChatNotifications}
      variables={{
        userId,
        schemeId
      }}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
      skip={!!userId === false || !!schemeId === false}
    >
      {({ data, subscribeToMore }) => {
        if (data !== undefined && data.allUserChats !== undefined) {
          if (
            data.allUserChats
              .map(({ newMessages }) => newMessages)
              .includes(true)
          ) {
            setNewMessages(true);
          } else {
            setNewMessages(false);
          }
          subscribeToMore({
            document: NotificationSubscription,
            variables: {
              userId,
              schemeId: window.localStorage.getItem('currentScheme')
            }
          });
        }

        const childrenArray = React.Children.map(children, child => {
          return React.cloneElement(child, {
            refetch
          });
        });
        return childrenArray;
      }}
    </Query>
  );
};

export default ChatProvider;
