import React from "react";
import { Switch, Route } from "react-router";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import AccountMenu from "../../../old-components/account/AccountMenu";
import EditProfile from "../../../old-components/account/EditProfile";
import ResetPassword from "../../../old-components/account/ResetPassword";
import NotificationSettings from "../../../old-components/account/NotificationSettings";

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
    </Switch>
  );
};

export default UserSettings;
