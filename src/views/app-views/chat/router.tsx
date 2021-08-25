import React from "react";
import { Switch, Route } from "react-router";
import ChatRouter from "old-components/chat/Chat/Chat";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const Chat = () => {
  return (
    <Switch>
      <Route path={`${APP_PREFIX_PATH}/chat`} component={ChatRouter} />
    </Switch>
  );
};

export default Chat;
