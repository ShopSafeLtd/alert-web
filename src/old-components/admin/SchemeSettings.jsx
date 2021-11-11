import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import AdminMenu from './AdminMenu';
import SchemeDetails from './SchemeDetails';
import AutoApprove from './AutoApprove';
import OffenderWarnings from './offender-warnings/OffenderWarningsList';
import AddOffenderWarning from './offender-warnings/AddOffenderWarning';
import EditOffenderWarnings from './offender-warnings/EditOffenderWarnings';
import AddUser from '../users/add/AddUser/AddUser';
import ViewUser from '../users/view/ViewUser/ViewUser';
import AddGroup from '../groups/add/AddGroup/AddGroup';
import ViewGroup from '../groups/view/ViewGroup/ViewGroup';
import GroupList from '../groups/list/AllGroups/AllGroups';
import Users from '../users/list/AllUsers/AllUsers';
import EditUser from '../users/edit/EditUser/EditUser';
import EditUserGroups from '../users/groups/EditUserGroups/EditUserGroups';
import EditUserChats from '../users/chats/EditUserChats/EditUserChats';
import EditGroup from '../groups/edit/EditGroup/EditGroup';
import EditGroupUsers from '../groups/users/EditGroupUsers/EditGroupUsers';
import ChatGroups from './chat-groups/list/ChatGroups';
import AddChatGroup from './chat-groups/add/AddChatGroup';
import ViewChatGroup from './chat-groups/view/ViewChatGroup';
import EditChatGroup from './chat-groups/edit/EditChatGroup';
import EditChatUsers from './chat-groups/edit/EditChatGroup';
import CrimeTypes from './crime-types/CrimeTypes';

const Page = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
`;

const currentScheme = window.localStorage.getItem('currentScheme');

class SchemeSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      label: {},
    };
  }

  setLabel = (label) => {
    this.setState({
      label,
    });
  };

  render() {
    const { label } = this.state;
    const { setActions } = this.props;

    return (
      <Page>
        <Route exact path="/admin" component={AdminMenu} />
        <Route
          path="/admin/scheme-details"
          render={({ history }) => (
            <SchemeDetails history={history} currentScheme={currentScheme} />
          )}
        />
        <Route
          path="/admin/terms"
          render={({ history }) => (
            <SchemeDetails history={history} currentScheme={currentScheme} />
          )}
        />
        <Route
          path="/admin/scheme-terms"
          render={({ history }) => (
            <SchemeDetails history={history} currentScheme={currentScheme} />
          )}
        />
        <Route
          path="/admin/user-terms"
          render={({ history }) => (
            <SchemeDetails history={history} currentScheme={currentScheme} />
          )}
        />
        <Route
          path="/admin/auto-approve"
          render={({ history }) => (
            <AutoApprove history={history} currentScheme={currentScheme} />
          )}
        />
        <Route
          exact
          path="/admin/offender-warnings"
          render={({ history }) => (
            <OffenderWarnings
              history={history}
              currentScheme={currentScheme}
              setLabel={this.setLabel}
            />
          )}
        />
        <Route
          path="/admin/offender-warnings/add"
          component={AddOffenderWarning}
        />
        <Route
          path="/admin/offender-warnings/edit/:id"
          render={({ history, match }) => (
            <EditOffenderWarnings
              setActions={setActions}
              history={history}
              match={match}
              label={label}
            />
          )}
        />
        <Route exact path="/admin/chat-groups" component={ChatGroups} />
        <Route path="/admin/chat-groups/add" component={AddChatGroup} />
        <Route path="/admin/chat-groups/view/:id" component={ViewChatGroup} />
        <Route path="/admin/chat-groups/edit/:id" component={EditChatGroup} />
        <Route path="/admin/chat-groups/users/:id" component={EditChatUsers} />
        <Route path="/admin/users/add" component={AddUser} />
        <Route
          path="/admin/users/view/:id"
          render={(router) => <ViewUser setActions={setActions} {...router} />}
        />
        <Route path="/admin/users/edit/:id" component={EditUser} />
        <Route path="/admin/users/groups/:id" component={EditUserGroups} />
        <Route path="/admin/users/chat-groups/:id" component={EditUserChats} />
        <Route exact path="/admin/groups" component={GroupList} />
        <Route path="/admin/groups/add" component={AddGroup} />
        <Route exact path="/admin/groups/view/:id" component={ViewGroup} />
        <Route exact path="/admin/groups/edit/:id" component={EditGroup} />
        <Route
          exact
          path="/admin/groups/users/:id"
          component={EditGroupUsers}
        />
        <Route exact path="/admin/users" component={Users} />
        <Route
          path="/admin/crime-types"
          render={(router) => (
            <CrimeTypes setActions={setActions} {...router} />
          )}
        />
      </Page>
    );
  }
}

export default SchemeSettings;
