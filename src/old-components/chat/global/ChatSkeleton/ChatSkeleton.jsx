import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  ${({ active }) =>
    active === true &&
    `
    @media (min-width: 1024px) {
      background: rgba(0,0,0,.05)
    }
  `};
`;
const Avatar = styled.div`
  background: #ef9a9a;
  color: #fff;
  border-radius: 100%;
  min-width: 45px;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-bottom: 0;
`;
const ChatText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;
const ChatName = styled.div`
  background: #ef9a9a;
  height: 16px;
  border-radius: 5px;
  width: 40%;
  margin-bottom: 10px;
`;
const Messages = styled.div`
  background: #ffcdd2;
  height: 16px;
  border-radius: 5px;
  width: 80%;
`;

class ChatSkeleton extends PureComponent {
  render() {
    return (
      <ListItem>
        <Avatar />
        <ChatText>
          <ChatName />
          <Messages />
        </ChatText>
      </ListItem>
    );
  }
}

export default ChatSkeleton;
