import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import MessagesQuery from "../MessagesQuery/MessagesQuery";
import ChatView from "../ChatView/ChatView";

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
        <Route exact path={`${APP_PREFIX_PATH}/chat`} component={ChatView} />
        <Route path={`${APP_PREFIX_PATH}/chat/:id`} component={MessagesQuery} />
      </Container>
    );
  }
}

export default Chat;
