import React, { useState } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import CheckPassword from "./CheckPassword";
import ResetPasswordForm from "./ResetPasswordForm";

const Page = styled.div`
  display: 1;
  display: flex;
  width: 100%;
`;

const ResetPassword = () => {
  // state
  const [auth, setAuth] = useState("");

  return (
    <Page>
      <Route
        exact
        path={`${APP_PREFIX_PATH}/user-settings/reset-password`}
        render={(router) => <CheckPassword setAuth={setAuth} {...router} />}
      />
      <Route
        path={`${APP_PREFIX_PATH}/user-settings/reset-password/new`}
        render={(router) => (
          <ResetPasswordForm auth={auth} setAuth={setAuth} {...router} />
        )}
      />
    </Page>
  );
};

export default ResetPassword;
