import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ChatGroup = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
`;
const Org = styled.div`
  height: 12px;
  width: 40%;
  border-radius: 2px;
  background-color: #bdbdbd;
  margin-left: 10px;
`;
const Text = styled.div`
  height: 16px;
  width: 30%;
  border-radius: 2px;
  background-color: #bdbdbd;
  margin-right: 10px;
`;

class UserListSkeleton extends PureComponent {
  render() {
    return (
      <ChatGroup>
        <Text /> - <Org />
      </ChatGroup>
    );
  }
}

export default UserListSkeleton;
