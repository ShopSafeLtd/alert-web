import React from 'react';
import { Switch, Route } from 'react-router';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import AccountMenu from '../../../old-components/account/AccountMenu';
import EditProfile from '../../../old-components/account/EditProfile';
import ResetPassword from '../../../old-components/account/ResetPassword';
import NotificationSettings from '../../../old-components/account/NotificationSettings';
import Terms from '../../../old-components/users/onboard/Terms/Terms';

const UserSettings = () => {
  return (
    <Switch>
      <Route
        path={`${APP_PREFIX_PATH}/user-settings`}
        exact
        component={AccountMenu}
      />
      <Route
        path={`${APP_PREFIX_PATH}/user-settings/edit-profile`}
        component={EditProfile}
      />
      <Route
        path={`${APP_PREFIX_PATH}/user-settings/reset-password`}
        component={ResetPassword}
      />
      <Route
        path={`${APP_PREFIX_PATH}/user-settings/notifications`}
        component={NotificationSettings}
      />
      <Route
        path={`${APP_PREFIX_PATH}/user-settings/terms`}
        component={() => (
          <div style={{ padding: '24px', backgroundColor: 'white' }}>
            <Terms values={{ termsSigned: true, error: false }} hideForm />
          </div>
        )}
      />
    </Switch>
  );
};

export default UserSettings;
