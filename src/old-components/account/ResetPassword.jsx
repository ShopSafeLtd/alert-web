import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import CheckPassword from './CheckPassword';
import ResetPasswordForm from './ResetPasswordForm';

const Page = styled.div`
  display: 1;
  display: flex;
  width: 100%;
`;

const ResetPassword = () => {
  // state
  const [auth, setAuth] = useState(false);

  return (
    <Page>
      <Route
        exact
        path="/account-settings/reset-password"
        render={router => <CheckPassword setAuth={setAuth} {...router} />}
      />
      <Route
        path="/account-settings/reset-password/new"
        render={router => <ResetPasswordForm auth={auth} {...router} />}
      />
    </Page>
  );
};

export default ResetPassword;
