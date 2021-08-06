import React from 'react';
import { useStoreState } from '../../state';

const IsAuthorised = ({ allowedRoles, children }) => {
  const userRole = useStoreState(state => state.user.role);

  return allowedRoles.includes(userRole) ? <div>{children}</div> : null;
};

export default IsAuthorised;
