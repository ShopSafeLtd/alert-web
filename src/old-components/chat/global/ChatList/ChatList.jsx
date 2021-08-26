import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import MediaQuery from "react-responsive";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { EmptyState } from "../../../global/emptyStates";
import {
  List,
  ListHeader,
  ListTitle,
  ListItem,
  Avatar,
  ChatText,
  ChatName,
  ChatMessage,
  ChatSkeleton,
} from "../";
import Messages from "../../../../images/Messages";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  @media (max-width: 1024px) {
    flex: 1;
  };
`;

class ChatList extends Component {
  componentDidMount() {
    this.props.allChats !== undefined && this.props.refetchChats();
  }

  componentDidUpdate() {
    if (this.props.activeChat === "") {
      if (this.props.allChats !== undefined) {
        if (this.props.allChats.length > 0) {
          if (this.props.activeChat === "") {
            this.props.setActiveChat(this.props.allChats[0].chat.id);
          }
        }
      }
    }
  }

  render() {
    const {
      allChats,
      activeChat,
      setActiveChat,
      history,
      loading,
      handleMarkAsRead,
    } = this.props;

    return (
      <MediaQuery minDeviceWidth={1024}>
        {(matches) => (
          <Container>
            <List>
              {matches && (
                <ListHeader>
                  <ListTitle>Chat Groups</ListTitle>
                </ListHeader>
              )}
              {loading ? (
                <div>
                  <ChatSkeleton />
                  <ChatSkeleton />
                  <ChatSkeleton />
                  <ChatSkeleton />
                </div>
              ) : allChats?.length === 0 ? (
                <EmptyState
                  image={<Messages height="96px" width="96px" />}
                  text="You are not a member of any chat groups"
                />
              ) : (
                allChats?.map(
                  ({
                    id: userChatId,
                    newMessages,
                    chat: { id, name, firstLetter, messages },
                  }) => {
                    return (
                      <ListItem
                        key={id}
                        active={activeChat === id}
                        onClick={() => {
                          if (matches) {
                            setActiveChat(id)
                            handleMarkAsRead(userChatId)
                          } else {
                            history.push(`${APP_PREFIX_PATH}/chat/${id}`)
                          }
                        }}
                      >
                        <Avatar newMessages={newMessages}>{firstLetter}</Avatar>
                        <ChatText newMessages={newMessages}>
                          <ChatName>{name}</ChatName>
                          <ChatMessage>
                            {messages?.length > 0
                              ? `${messages[0].from.fullName} : ${messages[0].content}`
                              : "No Messages"}
                          </ChatMessage>
                        </ChatText>
                      </ListItem>
                    );
                  }
                )
              )}
            </List>
          </Container>
        )}
      </MediaQuery>
    );
  }
}

export default withRouter(ChatList);
