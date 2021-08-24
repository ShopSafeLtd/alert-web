import React, { useState } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { useQuery, useMutation } from "@apollo/client";

import ChatList from "../global/ChatList/ChatList";
// import ChatsQuery from "../../../graphql/chat/queries/ChatsQuery";
import { UpdateUserChats } from "graphql-src/users/mutations";
import { UserChats } from "graphql-src/users/queries";
import MessagesQuery from "../MessagesQuery/MessagesQuery";
import { useStoreState } from "../../../state";

const Page = styled.div`
  background: #fff;
  display: flex;
  flex: 1;
`;

const ChatView = () => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  // state
  const [active, setActive] = useState("");

  // queries
  const { data, loading, refetch } = useQuery(UserChats, {
    variables: {
      where: {
        id: userId,
      },
      scheme: schemeId,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ user }) => {
      if (user.chats.length > 0 && active === "") setActive(user.chats[0].id);
    },
  });

  // mutations
  const [updateUserChats] = useMutation(UpdateUserChats);

  const handleMarkAsRead = (userChatId) => {
    updateUserChats({
      variables: {
        where: {
          id: userId,
        },
        data: {
          chats: {
            update: {
              where: {
                id: userChatId,
              },
              data: {
                newMessages: { set: false },
              },
            },
          },
        },
      },
      optimisticResponse: {
        updateUser: {
          id: userId,
          chats: data.user.chats.map((el) => {
            return {
              id: el.id,
              newMessages: el.id === userChatId ? false : el.id,
              chat: el.chat,
            };
          }),
        },
      },
      onCompleted: () => {
        refetch();
      },
    });
  };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {matches =>
    //     matches ? (
    <Page>
      <ChatList
        allChats={!!data ? data.user.chats : []}
        refetchChats={refetch}
        loading={loading && !data}
        setActiveChat={setActive}
        activeChat={active}
        handleMarkAsRead={handleMarkAsRead}
      />
      <MessagesQuery loading={loading} id={active} />
    </Page>
    // ) : (
    //   <ChatList
    //     allChats={!!data && !!data.userChats && data.userChats}
    //     refetchChats={refetch}
    //     loading={loading}
    //     setActiveChat={setActive}
    //   />
    // )
    //   }
    // </MediaQuery>
  );
};

export default ChatView;
