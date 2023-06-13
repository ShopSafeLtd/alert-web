import type { AppState } from '@auth0/auth0-react';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="auth.shopsafealert.co.uk"
      clientId="c2MqDavoao6lbVplyQTN8jq90m4PL6Io" // client id for portal in auth0
      redirectUri={window.location.origin}
      audience="https://app.shopsafealert.co.uk"
      scope="read:current_user update:current_user_metadata"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
