import RouteWrapper from '#/navigation/utils/route-wrapper';
import LoginView from '#/views/sign-in/Login.View';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const SignInPage = () => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Sign In',
      })}
    >
      <Routes>
        <Route element={<LoginView />} index />
      </Routes>
    </RouteWrapper>
  );
};
export default SignInPage;
