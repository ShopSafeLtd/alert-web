import React from 'react';
import { Routes, Route } from 'react-router';
import UserList from 'views/settings/users/UserList';
import ViewUser from 'views/settings/users/UserDetail';
import GroupList from 'views/settings/groups/GroupList';
import ViewGroup from 'views/settings/groups/GroupDetail';
import ChatGroupsList from 'views/settings/chats/ChatList';
import ViewChatGroup from 'views/settings/chats/ChatDetail';
import SchemeDetails from 'views/settings/schemes/SchemeDetail';
import OffenderWarnings from 'views/settings/tags/OffenderWarning';
import CrimeTypes from 'views/settings/tags/CrimeTypes';
import Terms from 'views/settings/terms/TermList';

import { RecycleBin } from 'old-components/admin/recycle-bin';

import AdminMenu from '../../../old-components/admin/AdminMenu';

// import ViewUser from "../../../old-components/users/view/ViewUser/ViewUser";
import AddUser from '../../../old-components/users/add/AddUser/AddUser';

import AddGroup from '../../../old-components/groups/add/AddGroup/AddGroup';
import AddChatGroup from '../../../old-components/admin/chat-groups/add/AddChatGroup';

// import Terms from '../../../old-components/admin/terms/Terms';
import UserTerms from '../../../old-components/admin/terms/UserTerms';
import SchemeTerms from '../../../old-components/admin/terms/SchemeTerms';

import ViewOffenderWarnings from '../../../old-components/admin/offender-warnings/EditOffenderWarnings';
import AddOffenderWarnings from '../../../old-components/admin/offender-warnings/AddOffenderWarning';

const SchemeSettings = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<AdminMenu />} />
    {/* users */}
    <Route path="users/*" element={<UserList />} />
    <Route path="users/view/:id" element={<ViewUser />} />
    <Route path="users/add/*" element={<AddUser />} />

    {/* groups */}
    <Route path="groups/*" element={<GroupList />} />
    <Route path="groups/view/:id" element={<ViewGroup />} />
    <Route path="groups/add/*" element={<AddGroup />} />

    {/* chats */}
    <Route path="chat-groups/*" element={<ChatGroupsList />} />
    <Route path="chat-groups/view/:id" element={<ViewChatGroup />} />
    <Route path="chat-groups/add/*" element={<AddChatGroup />} />

    {/* scheme-details */}
    <Route path="scheme-details" element={<SchemeDetails />} />

    {/* terms */}
    <Route path="terms" element={<Terms />} />
    <Route
      path="scheme-terms"
      element={() => (
        <div style={{ padding: '24px', backgroundColor: 'white' }}>
          <SchemeTerms values={{ termsSigned: true, error: false }} hideForm />
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

    {/* offender tags */}
    <Route path="offender-warnings/*" element={<OffenderWarnings />} />
    <Route
      path="offender-warnings/view/:id"
      element={<ViewOffenderWarnings />}
    />
    <Route path="offender-warnings/add" element={<AddOffenderWarnings />} />

    {/* crime types */}
    <Route path="crime-types" element={<CrimeTypes />} />

    {/* recycle bin */}
    <Route path="recycle-bin" element={<RecycleBin />} />
  </Routes>
);

export default SchemeSettings;
