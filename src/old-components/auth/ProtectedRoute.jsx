import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Auth from '../../auth/Auth';
import NavContainer from '../navigation/Nav/Nav';
import { useStoreState } from '../../state';
import NoAccess from './NoAccess/NoAccess';

const ProtectedRoute = ({
  component: Component,
  allowedRoles,
  render,
  ...rest
}) => {
  const currentUser = useStoreState(state => state.user);
  const auth = new Auth();

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated() === true) {
          if (!currentUser.onboarded) {
            return <Redirect to="/onboard" />;
          } else {
            if (
              allowedRoles === undefined ||
              allowedRoles.includes(currentUser.role)
            ) {
              return (
                <NavContainer>
                  <Component {...props} />
                </NavContainer>
              );
            } else {
              return <NoAccess />;
            }
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default withRouter(ProtectedRoute);
