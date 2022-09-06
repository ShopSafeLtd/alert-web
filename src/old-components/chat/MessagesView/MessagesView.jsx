import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { isEqual } from 'lodash-es';

import { MessageDate } from '../global';
import Message from '../global/Message/Message';
import NewMessage from '../global/NewMessage/NewMessage';

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MessageContainer = styled.div`
  height: ${({ bottomNav, newMessageHeight }) =>
    bottomNav
      ? `calc(100vh - ${113 + newMessageHeight}px)`
      : 'calc(100vh - 112px)'};
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  @media (min-width: 1024px) {
    padding: 20px 0 0px;
    height: calc(100vh - 157px);
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
`;

class MessagesView extends PureComponent {
  constructor(props) {
    super(props);
    this.messages = React.createRef();
    this.newMessage = React.createRef();
    this.state = {
      loadingMore: false,
      refetch: true,
      lastMessage: '',
      sentMessage: '',
      pristine: true,
      recentMessage: '',
      newMessageText: '',
    };
  }

  componentDidMount() {
    const { messages, refetch } = this.props;
    this.messages.addEventListener('scroll', this.onScroll, false);
    // ??? scrollTop scrollHeight
    this.messages.scrollTop = this.messages.scrollHeight;
    // this.props.setNavbarAction("back");
    // if (chat !== undefined) {
    //   if (chat.members !== undefined) {
    //     if (chat.members[0].newMessages) {
    //       markAsRead(chat.members[0].id);
    //     }
    //   }
    // }
    if (messages.length > 0) {
      refetch();
      this.setState({
        // ??? pop()  messages.slice(-1)[0].id
        recentMessage: messages.pop().id,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      refetch,
      loadingMore,
      sentMessage,
      pristine,
      lastMessage,
      recentMessage,
    } = this.state;
    const {
      messages,
      setTitle,
      subscribeToMore,
      newRecived,
      resetRecived,
      refetched,
      resetRefetched,
    } = this.props;
    if (refetch) {
      this.messages.scrollTop = this.messages.scrollHeight;
      this.setState({
        refetch: false,
      });
    }
    if (loadingMore) {
      const topMessage = document.getElementById(lastMessage);
      topMessage?.scrollIntoView();
      this.setState({
        loadingMore: false,
      });
    } else if (sentMessage && !isEqual(messages, prevProps.messages)) {
      this.messages.scrollTop = this.messages.scrollHeight;
      this.setState({
        sentMessage: false,
      });
    } else if (pristine && this.props.messages.length > 0) {
      this.messages.scrollTop = this.messages.scrollHeight;
      this.setState({
        pristine: false,
      });
    } else if (newRecived && this.props.messages.length > 0) {
      this.messages.scrollTop = this.messages.scrollHeight;
      resetRecived();
    } else if (
      refetched &&
      messages.length > 0 &&
      messages.slice(-1)[0].id !== recentMessage
    ) {
      this.messages.scrollTop = this.messages.scrollHeight;
      resetRefetched();
    }
    messages.length > 0 && subscribeToMore();
    setTitle(this.props?.messages[0]?.chat?.name);
    // if (chat !== undefined) {
    //   if (chat.members !== undefined) {
    //     if (chat.members[0].newMessages) {
    //       markAsRead(chat.members[0].id);
    //     }
    //   }
    // }
  }

  handleChange = (value) =>
    this.setState({
      newMessageText: value,
    });

  onScroll = () => {
    if (
      this.messages.scrollTop + this.messages.clientHeight <=
        this.messages.clientHeight &&
      !this.props.allLoaded
    ) {
      this.setState({
        loadingMore: true,
        lastMessage: this.props?.messages[0]?.id,
      });
      this.props.loadMore();
    }
  };

  render() {
    const { messages, refetch, bottomNav, user, fromId } = this.props;
    const { newMessageText } = this.state;

    let currentDate, currentUser;
    messages.length > 0 &&
      (currentDate = moment(messages[0].createdAt).format('DD/MM/YY'));

    let datedMessages = [];
    messages.length > 0 &&
      (datedMessages = [
        {
          type: 'DATE',
          date: moment(messages[0].createdAt).format('dddd, MMMM Do'),
        },
      ]);
    messages.forEach((message) => {
      if (currentDate === moment(message.createdAt).format('DD/MM/YY')) {
        datedMessages = [...datedMessages, { type: 'MESSAGE', ...message }];
      } else {
        currentDate = moment(message.createdAt).format('DD/MM/YY');
        datedMessages = [
          ...datedMessages,
          {
            type: 'DATE',
            date: moment(message.createdAt).format('dddd, MMMM Do'),
          },
          { type: 'MESSAGE', ...message },
        ];
      }
    });

    return (
      <Messages>
        <MessageContainer
          bottomNav={bottomNav}
          ref={(ref) => (this.messages = ref)}
          newMessageHeight={
            this.newMessage.current !== null &&
            this.newMessage.current.clientHeight
          }
        >
          {datedMessages.map(
            ({ type, date, id, content, createdAt, from, sent }) => {
              if (type === 'MESSAGE') {
                // ???
                if (currentUser === from.id) {
                  return (
                    <Message
                      // ???
                      sameUser
                      key={id}
                      id={id}
                      content={content}
                      fromId={from.id}
                      sent={sent}
                    />
                  );
                } else {
                  // ???
                  currentUser = from.id;
                  return (
                    <Message
                      user={from.fullName}
                      initials={from.fullName[0]}
                      key={id}
                      id={id}
                      content={content}
                      fromId={from.id}
                      sent={sent}
                    />
                  );
                }
              } else {
                return (
                  <div key={date}>
                    <MessageDate>{date}</MessageDate>
                  </div>
                );
              }
            }
          )}
        </MessageContainer>
        <NewMessage
          ref={this.newMessage}
          message={newMessageText}
          handleChange={this.handleChange}
          chatId={this.props?.messages[0]?.chat?.id}
          refetch={refetch}
          onSend={() =>
            this.setState({
              sentMessage: true,
            })
          }
          bottomNav={bottomNav}
          user={user}
          fromId={fromId}
          onResize={() =>
            (this.messages.scrollTop = this.messages.scrollHeight)
          }
        />
      </Messages>
    );
  }

  componentWillUnmount() {
    this.messages.removeEventListener('scroll', this.onScroll, false);
    // this.props.setNavbarAction("default");
  }
}

export default MessagesView;
