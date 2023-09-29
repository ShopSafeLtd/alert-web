import React from 'react';
import { Route, Routes } from 'react-router';
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
import UserTerms from 'views/settings/terms/UserTerms';
import SchemeTerms from 'views/settings/terms/SchemeTerms';
import CreateTermsContainer from 'views/settings/terms/CreateTerms/CreateTerms.container';
import RecycleBin from 'views/settings/recycled/RecycleBin';

import ListBusinesses from 'views/settings/businesses/ListBusinesses';
import ViewBusiness from 'views/settings/businesses/ViewBusiness';
import DiscMenu from 'views/settings/data-import/menu/Menu.view';
import DiscImport from 'views/settings/data-import/disc-import/DiscImport.container';
import CSVImport from 'views/settings/data-import/csv/ImportItems/ImportData.container';
import CustomSchemeTerms from '../../../views/settings/terms/ViewCustomTerms/ViewTermsContainer';
import ListStatements from '../../../views/settings/statements/ListStatements';
import TagView from '../../../views/settings/tags/ViewTag/ViewTag.container';
import Workflows from '../workflow/router';
import DataExport from '../data-management/router';

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
    <Route path="terms/scheme/:id" element={<CustomSchemeTerms />} />
    <Route path="terms/scheme/create" element={<CreateTermsContainer />} />
    {/* offender tags */}
    <Route path="offender-warnings/*" element={<OffenderWarnings />} />

    {/* crime types */}
    <Route path="crime-types/*" element={<CrimeTypes />} />
    <Route path="crime-types/view/:id" element={<TagView />} />

    {/* recycle bin */}
    <Route path="recycle-bin/*" element={<RecycleBin />} />

    {/* businesses */}
    <Route path="businesses/*" element={<ListBusinesses />} />
    <Route path="businesses/view/:id" element={<ViewBusiness />} />
    <Route path="data-import" element={<DiscMenu />} />
    <Route path="data-import/disc" element={<DiscImport />} />
    <Route path="data-import/csv" element={<CSVImport />} />
    <Route path="data-export/*" element={<DataExport />} />

    <Route path="data-import/csv/stock-items" element={<CSVImport />} />
    <Route key="workflow" path="workflow/*" element={<Workflows />} />

    {/* Statement temlates */}
    <Route path="statement-templates/*" element={<ListStatements />} />
  </Routes>
);

export default SchemeSettings;
