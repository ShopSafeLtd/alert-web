import React from 'react';
import { Routes, Route } from 'react-router';
import UserList from 'views/settings/users/UserList';
import ViewUser from 'views/settings/users/UserDetail';

import GroupList from 'views/settings/groups/GroupList';
import ViewGroup from 'views/settings/groups/GroupDetail';

import ChatGroupsList from 'views/settings/chats/ChatList';
import ViewChatGroup from 'views/settings/chats/ChatDetail';

import ListCrimeGroups from 'views/settings/crime-groups/list-crime-groups';
import CreateCrimeGroup from 'views/settings/crime-groups/create-crime-group';
import ViewCrimeGroup from 'views/settings/crime-groups/view-crime-group';

import ListVehicles from 'views/Profiles/Vehicles/ListVehicles';
import ViewVehicle from 'views/Profiles/Vehicles/ViewVehicle';

import SchemeDetails from 'views/settings/schemes/SchemeDetail';

import OffenderWarnings from 'views/settings/tags/OffenderWarning';
import CrimeTypes from 'views/settings/tags/CrimeTypes';

import Terms from 'views/settings/terms/TermList';
import UserTerms from 'views/settings/terms/UserTerms';
import SchemeTerms from 'views/settings/terms/SchemeTerms';

import RecycleBin from 'views/settings/recycled/RecycleBin';

import ListBusinesses from 'views/settings/businesses/ListBusinesses';
import ViewBusiness from 'views/settings/businesses/ViewBusiness';

const SchemeSettings = (): JSX.Element => (
  <Routes>
    {/* <Route path="*" element={<AdminMenu />} /> */}
    {/* users */}
    <Route index element={<SchemeDetails />} />
    <Route path="users/*" element={<UserList />} />
    <Route path="users/view/:id" element={<ViewUser />} />

    {/* groups */}
    <Route path="groups/*" element={<GroupList />} />
    <Route path="groups/view/:id" element={<ViewGroup />} />

    {/* chats */}
    <Route path="chat-groups/*" element={<ChatGroupsList />} />
    <Route path="chat-groups/view/:id" element={<ViewChatGroup />} />

    {/* scheme-details */}
    <Route path="scheme-details" element={<SchemeDetails />} />

    {/* terms */}
    <Route path="terms/*" element={<Terms />} />
    <Route path="terms/user-terms/*" element={<UserTerms />} />
    <Route path="terms/scheme-terms/*" element={<SchemeTerms />} />

    {/* offender tags */}
    <Route path="offender-warnings/*" element={<OffenderWarnings />} />

    {/* crime types */}
    <Route path="crime-types/*" element={<CrimeTypes />} />

    {/* recycle bin */}
    <Route path="recycle-bin/*" element={<RecycleBin />} />

    {/* crime-groups */}
    <Route path="crime-groups/*" element={<ListCrimeGroups />} />
    <Route path="crime-groups/create" element={<CreateCrimeGroup />} />
    <Route path="crime-groups/view/:id" element={<ViewCrimeGroup />} />

    {/* vehicles */}
    <Route path="vehicles/*" element={<ListVehicles />} />
    <Route path="vehicles/view/:id" element={<ViewVehicle />} />

    {/* businesses */}
    <Route path="businesses/*" element={<ListBusinesses />} />
    <Route path="businesses/view/:id" element={<ViewBusiness />} />
  </Routes>
);

export default SchemeSettings;
