import React from 'react';
import { Route, Routes } from 'react-router';
import LoginView from '#/views/sign-in/Login.View';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const SignInPage = () => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Sign In',
      })}
    >
      <Routes>
        <Route index element={<LoginView />} />
      </Routes>
    </RouteWrapper>
  );
};
export default SignInPage;
