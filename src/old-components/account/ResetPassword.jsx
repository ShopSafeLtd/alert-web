import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

import CheckPassword from './CheckPassword';
import ResetPasswordForm from './ResetPasswordForm';

const Page = styled.div`
  display: 1;
  display: flex;
  width: 100%;
`;

const ResetPassword = () => {
  // state
  const [auth, setAuth] = useState('');

  return (
    <Page>
      <Routes>
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
      </Routes>
    </Page>
  );
};

export default ResetPassword;
