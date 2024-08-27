import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'components/loading';
import AuthViews from 'navigation/auth-views';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreState } from 'state';

export const AuthLayout = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  const loggedIn = useStoreState((state) => state.auth.loggedIn);

  if (isLoading) return <Loading />;
  if (isAuthenticated && loggedIn === false) return <Loading />;
  if (isAuthenticated && !isLoading) return <Navigate to="/app" />;
  return loggedIn ? (
    <Navigate to="/app" />
  ) : (
    <div className="auth-container">
      <AuthViews />
    </div>
  );
};

export default AuthLayout;
