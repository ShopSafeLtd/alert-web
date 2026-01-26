import React from 'react';
import UserList from 'views/settings/users/UserList';

const PoliceUserList = (): JSX.Element => (
  <UserList basePath="/app/police-settings" />
);

export default PoliceUserList;
