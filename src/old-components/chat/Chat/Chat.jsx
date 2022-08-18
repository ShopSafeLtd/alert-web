import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import MessagesQuery from '../MessagesQuery/MessagesQuery';
import ChatView from '../ChatView/ChatView';

const Container = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1024px) {
    padding-bottom: 0px;
  }
`;

class Chat extends React.Component {
  render() {
    return (
      <Container>
        <Routes>
          <Route index element={<ChatView />} />
          <Route path=":id" element={<MessagesQuery />} />
        </Routes>
      </Container>
    );
  }
}

export default Chat;
