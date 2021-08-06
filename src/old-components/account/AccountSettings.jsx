import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import AccountMenu from './AccountMenu';
import EditProfile from './EditProfile';
import NotificationSettings from './NotificationSettings';
import ResetPassword from './ResetPassword';

const Settings = styled.div`
  display: 1;
  display: flex;
  width: 100%;
`;

const AccountSettings = () => {
  return (
    <Settings>
      <Route exact path="/account-settings" component={AccountMenu} />
      <Route path="/account-settings/edit-profile" component={EditProfile} />
      <Route
        path="/account-settings/reset-password"
        component={ResetPassword}
      />
      <Route
        path="/account-settings/notifications"
        component={NotificationSettings}
      />
    </Settings>
  );
};

export default AccountSettings;
