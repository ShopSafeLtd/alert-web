import React from "react";
import { Switch, Route } from "react-router";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import AdminMenu from "../../../old-components/admin/AdminMenu";

import UserList from "../../../old-components/users/list/AllUsers/AllUsers";
import ViewUser from "../../../old-components/users/view/ViewUser/ViewUser";
import AddUser from "../../../old-components/users/add/AddUser/AddUser";

import GroupsList from "../../../old-components/groups/list/AllGroups/AllGroups";
import ViewGroup from "../../../old-components/groups/view/ViewGroup/ViewGroup";
import AddGroup from "../../../old-components/groups/add/AddGroup/AddGroup";

import ChatGroupsList from "../../../old-components/admin/chat-groups/list/ChatGroups";
import ViewChatGroup from "../../../old-components/admin/chat-groups/view/ViewChatGroup";
import AddChatGroup from "../../../old-components/admin/chat-groups/add/AddChatGroup";

import SchemeDetails from "../../../old-components/admin/SchemeDetails";

import AutoApprove from "../../../old-components/admin/AutoApprove";

import DataRetention from "old-components/admin/DataRetention";

import OffenderWarnings from "../../../old-components/admin/offender-warnings/OffenderWarningsList";
import ViewOffenderWarnings from "../../../old-components/admin/offender-warnings/EditOffenderWarnings";
import AddOffenderWarnings from "../../../old-components/admin/offender-warnings/AddOffenderWarning";

import CrimeTypes from "../../../old-components/admin/crime-types/CrimeTypes";

import { RecycleBin } from "old-components/admin/recycle-bin";

const SchemeSettings = () => {
  return (
    <Switch>
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings`}
        exact
        component={AdminMenu}
      />
      {/* users */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/users`}
        exact
        component={UserList}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/users/view/:id`}
        component={ViewUser}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/users/add`}
        component={AddUser}
      />

      {/* groups */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/groups`}
        exact
        component={GroupsList}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/groups/view/:id`}
        component={ViewGroup}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/groups/add`}
        component={AddGroup}
      />

      {/* chats */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/chat-groups`}
        exact
        component={ChatGroupsList}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/chat-groups/view/:id`}
        component={ViewChatGroup}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/chat-groups/add`}
        component={AddChatGroup}
      />

      {/* details */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/scheme-details`}
        component={SchemeDetails}
      />

      {/* auto approve */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/auto-approve`}
        component={AutoApprove}
      />

      {/* data retention */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/data-retention`}
        component={DataRetention}
      />

      {/* offender tags */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`}
        exact
        component={OffenderWarnings}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings/view/:id`}
        component={ViewOffenderWarnings}
      />
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings/add`}
        component={AddOffenderWarnings}
      />

      {/* crime types */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/crime-types`}
        component={CrimeTypes}
      />

      {/* recycle bin */}
      <Route
        path={`${APP_PREFIX_PATH}/scheme-settings/recycle-bin`}
        component={RecycleBin}
      />
    </Switch>
  );
};

export default SchemeSettings;
