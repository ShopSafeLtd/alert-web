import React from 'react';
import { Routes, Route } from 'react-router';
import AdminMenu from '../../../old-components/admin/AdminMenu';

import UserList from 'views/settings/users/UserList'
import ViewUser from '../../../old-components/users/view/ViewUser/ViewUser';
import AddUser from '../../../old-components/users/add/AddUser/AddUser';

import GroupsList from '../../../old-components/groups/list/AllGroups/AllGroups';
import ViewGroup from '../../../old-components/groups/view/ViewGroup/ViewGroup';
import AddGroup from '../../../old-components/groups/add/AddGroup/AddGroup';

import ChatGroupsList from '../../../old-components/admin/chat-groups/list/ChatGroups';
import ViewChatGroup from '../../../old-components/admin/chat-groups/view/ViewChatGroup';
import AddChatGroup from '../../../old-components/admin/chat-groups/add/AddChatGroup';

import SchemeDetails from '../../../old-components/admin/SchemeDetails';

import Terms from '../../../old-components/admin/terms/Terms';
import UserTerms from '../../../old-components/admin/terms/UserTerms';
import SchemeTerms from '../../../old-components/admin/terms/SchemeTerms';

import AutoApprove from '../../../old-components/admin/AutoApprove';

import DataRetention from 'old-components/admin/DataRetention';

import OffenderWarnings from '../../../old-components/admin/offender-warnings/OffenderWarningsList';
import ViewOffenderWarnings from '../../../old-components/admin/offender-warnings/EditOffenderWarnings';
import AddOffenderWarnings from '../../../old-components/admin/offender-warnings/AddOffenderWarning';

import CrimeTypes from '../../../old-components/admin/crime-types/CrimeTypes';

import { RecycleBin } from 'old-components/admin/recycle-bin';

const SchemeSettings = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<AdminMenu />}
      />
      {/* users */}
      <Route
        path="users/*"
        element={<UserList />}
      />
      <Route
        path="users/view/:id"
        element={<ViewUser />}
      />
      <Route
        path="users/add/*"
        element={<AddUser />}
      />

      {/* groups */}
      <Route
        path="groups/*"
        element={<GroupsList />}
      />
      <Route
        path="groups/view/:id"
        element={<ViewGroup />}
      />
      <Route
        path="groups/add/*"
        element={<AddGroup />}
      />

      {/* chats */}
      <Route
        path="chat-groups/*"
        element={<ChatGroupsList />}
      />
      <Route
        path="chat-groups/view/:id"
        element={<ViewChatGroup />}
      />
      <Route
        path="chat-groups/add/*"
        element={<AddChatGroup />}
      />

      {/* details */}
      <Route
        path="scheme-details"
        element={<SchemeDetails />}
      />

      {/* terms */}
      <Route
        path="terms"
        element={<Terms />}
      />
      <Route
        path="scheme-terms"
        element={() => (
          <div style={{ padding: '24px', backgroundColor: 'white' }}>
            <SchemeTerms
              values={{ termsSigned: true, error: false }}
              hideForm
            />
          </div>
        )}
      />
      <Route
        path="user-terms"
        element={() => (
          <div style={{ padding: '24px', backgroundColor: 'white' }}>
            <UserTerms values={{ termsSigned: true, error: false }} hideForm />
          </div>
        )}
      />

      {/* auto approve */}
      <Route
        path="auto-approve"
        element={<AutoApprove />}
      />

      {/* data retention */}
      <Route
        path="data-retention"
        element={<DataRetention />}
      />

      {/* offender tags */}
      <Route
        path="offender-warnings/*"
        element={<OffenderWarnings />}
      />
      <Route
        path="offender-warnings/view/:id"
        element={<ViewOffenderWarnings />}
      />
      <Route
        path="offender-warnings/add"
        element={<AddOffenderWarnings />}
      />

      {/* crime types */}
      <Route
        path="crime-types"
        element={<CrimeTypes />}
      />

      {/* recycle bin */}
      <Route
        path="recycle-bin"
        element={<RecycleBin />}
      />
    </Routes>
  );
};

export default SchemeSettings;
