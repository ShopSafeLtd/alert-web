import React, { useState } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { useQuery } from '@apollo/react-hooks';

import ChatList from '../global/ChatList/ChatList';
import ChatsQuery from '../../../graphql/chat/queries/ChatsQuery';
import MessagesQuery from '../MessagesQuery/MessagesQuery';
import { useStoreState } from '../../../state';

const Page = styled.div`
  background: #fff;
  display: flex;
  flex: 1;
`;

const ChatView = () => {
  const userId = useStoreState(state => state.user.id);

  // state
  const [active, setActive] = useState('');

  // queries
  const { data, loading, refetch } = useQuery(ChatsQuery, {
    variables: {
      user: { id: { equals: userId } },
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ userChats }) =>
      userChats.length > 0 && setActive(userChats[0].id)
  });

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches =>
        matches ? (
          <Page>
            <ChatList
              allChats={!!data && !!data.userChats && data.userChats}
              refetchChats={refetch}
              loading={loading}
              setActiveChat={setActive}
            />
            <MessagesQuery loading={loading} id={active} />
          </Page>
        ) : (
          <ChatList
            allChats={!!data && !!data.userChats && data.userChats}
            refetchChats={refetch}
            loading={loading}
            setActiveChat={setActive}
          />
        )
      }
    </MediaQuery>
  );
};

export default ChatView;
