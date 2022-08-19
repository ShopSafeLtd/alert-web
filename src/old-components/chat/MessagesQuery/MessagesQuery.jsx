import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { Messages } from 'graphql-src/chat/queries';
// import MarkAsRead from '../../../graphql/chat/mutations/MarkAsRead';
// import ChatQuery from '../../../graphql/chat/queries/ChatQuery';
import MessagesView from '../MessagesView/MessagesView';
// import query from '../../../graphql/chat/queries/MessagesQuery';
// import MoreQuery from '../../../graphql/chat/queries/MoreMessagesQuery';
// import MessageSubscription from '../../../graphql/chat/queries/MessageSubscription';
import { MessagesSubscription } from 'graphql-src/chat/subscriptions';
import { useStoreActions, useStoreState } from '../../../state';

const MessagesQuery = ({ id, match }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setNavbarAction = useStoreActions(
    (actions) => actions.theme.setNavbarAction
  );
  const user = useStoreState((state) => state.user);
  const userId = useStoreState((state) => state.user.id);
  const bottomNav = useStoreState((state) => state.theme.bottomNav);

  // state
  const [loaded, setLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [newReceived, setReceived] = useState(false);
  const [refetched, setRefetched] = useState(false);
  const [after, setAfter] = useState('');

  // queries
  // const { data: chatData } = useQuery(ChatQuery, {
  //   variables: {
  //     id: id !== undefined ? id : match.params.id,
  //     userId,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  const {
    data: messagesData,
    subscribeToMore,
    refetch,
    fetchMore,
  } = useQuery(Messages, {
    variables: {
      chat: id !== undefined ? id : match.params.id,
    },
    onCompleted: (res) => {
      console.log(res);
      res.messages.length > 0 && setAfter(res.messages.slice(-1)[0].id);
    },
    fetchPolicy: 'cache-and-network',
  });

  // mutations
  // const [markAsRead] = useMutation(MarkAsRead);

  // functions

  const loadMore = async () => {
    if (!loaded && !fetching) {
      setFetching(true);
      await fetchMore({
        query: Messages,
        variables: {
          chat: id !== undefined ? id : match.params.id,
          after: {
            id: after,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          fetchMoreResult.messages.length === 0 && setLoaded(true);
          return {
            messages: [...fetchMoreResult.messages, ...previousResult.messages],
          };
        },
      });
      setFetching(false);
    }
  };

  return (
    <MessagesView
      messages={
        !!messagesData && !!messagesData.messages ? messagesData.messages : []
      }
      // chatId={!!chatData && !!chatData.chat && chatData.chat.id}
      // chat={!!chatData && !!chatData.chat ? chatData.chat : {}}
      refetch={() => {
        setFetching(true);
        refetch();
      }}
      setNavbarAction={setNavbarAction}
      setTitle={setTitle}
      loadMore={loadMore}
      allLoaded={loaded}
      markAsRead={
        (id) => {}
        // markAsRead({
        //   variables: {
        //     id,
        //   },
        // })
      }
      newRecived={newReceived}
      resetRecived={() => setReceived(true)}
      resetRefetched={() => setRefetched(true)}
      refetched={refetched}
      setBottomNav={setBottomNav}
      bottomNav={bottomNav}
      fromId={userId}
      user={user}
      subscribeToMore={() => {
        subscribeToMore({
          document: MessagesSubscription,
          variables: {
            chat: !!id ? id : match.params.id,
          },
          updateQuery: (prev, { subscriptionData }) => {
            setReceived(true);
            const test = prev.messages.find(({ id }) => {
              return id === subscriptionData.data.newMessage.id;
            });
            if (test === undefined) {
              return {
                ...prev,
                messages: [...prev.messages, subscriptionData.data.newMessage],
              };
            }
          },
        });
      }}
    />
  );
};

export default MessagesQuery;
