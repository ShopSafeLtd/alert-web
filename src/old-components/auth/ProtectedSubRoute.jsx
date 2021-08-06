import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useStoreState } from '../../state';
import NoAccess from './NoAccess/NoAccess';

const ProtectedSubRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = useStoreState(state => state.user.role);
  return (
    <Route
      {...rest}
      render={props => {
        if (allowedRoles === undefined || allowedRoles.includes(userRole)) {
          return <Component {...rest} {...props} />;
        } else {
          return <NoAccess />;
        }
      }}
    />
  );
};

export default withRouter(ProtectedSubRoute);
