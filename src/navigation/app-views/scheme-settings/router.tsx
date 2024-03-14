import React from 'react';
import { Route, Routes } from 'react-router';

import SettingsHome from '#/views/settings/settings-home/SettingsHome.view';

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
import CSVImport from 'views/settings/data-import/csv/data-import/ImportData.container';
import CustomGalleries from 'views/settings/customGallery';
import { Col, Row } from 'antd';
import SettingsSideMenu from '#/components/settings/SettingSideMenu/SettingsSideMenu.view';
import CustomSchemeTerms from '../../../views/settings/terms/ViewCustomTerms/ViewTermsContainer';
import ListStatements from '../../../views/settings/statements/ListStatements';
import TagView from '../../../views/settings/tags/ViewTag/ViewTag.container';
import Workflows from '../workflow/router';
import DataExport from '../data-management/router';
import RolesContainer from '../../../views/roles/roles/Roles.container';
import Role from '../../../views/roles/role/ViewRole.container';
import MySafety from '../../../views/settings/data-import/mysafety/MySafety.view';
import IntelOne from '../../../views/settings/data-import/intel-one/IntelOne.view';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const SchemeSettings = (): JSX.Element => (
  <Row wrap={false}>
    <Col>
      <SettingsSideMenu />
    </Col>
    <Col flex={1} style={{ overflow: 'auto', height: '100vh' }}>
      <Routes>
        <Route
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <SettingsHome />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="scheme-settings"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <SchemeDetails />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="users/*"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Users,
                  method: PermissionMethod.Read,
                },
              ]}
            >
              <UserList />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="users/view/:id"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Users,
                  method: PermissionMethod.Read,
                },
              ]}
            >
              <ViewUser />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="groups/*"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Groups,
                  method: PermissionMethod.Read,
                },
              ]}
            >
              <GroupList />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="groups/view/:id"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Groups,
                  method: PermissionMethod.Read,
                },
              ]}
            >
              <ViewGroup />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="chat-groups/*"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Chat,
                  method: PermissionMethod.Write,
                },
              ]}
            >
              <ChatGroupsList />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="chat-groups/view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <ViewChatGroup />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="scheme-details"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <SchemeDetails />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="terms/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <Terms />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="terms/user-terms/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <UserTerms />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="terms/scheme-terms/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <SchemeTerms />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="terms/scheme/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CustomSchemeTerms />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="terms/scheme/create"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CreateTermsContainer />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="offender-warnings/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <OffenderWarnings />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="crime-types/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CrimeTypes />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="crime-types/view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <TagView />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="custom-galleries/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CustomGalleries />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="recycle-bin/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <RecycleBin />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="businesses/*"
          element={
            <PermissionCheckWrapper
              permission={[
                {
                  model: PermissionModel.Settings,
                  method: PermissionMethod.Read,
                },
                {
                  model: PermissionModel.Businesses,
                  method: PermissionMethod.Read,
                },
              ]}
            >
              <ListBusinesses />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="businesses/view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <ViewBusiness />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <DiscMenu />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import/disc"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <DiscImport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import/mysafety"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <MySafety />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import/intel-one"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <IntelOne />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import/csv"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CSVImport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-export/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <DataExport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="roles/*"
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <RolesContainer />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="roles/create"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Edit,
              }}
            >
              <Role create />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="roles/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <Role />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-import/csv/stock-items"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <CSVImport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          key="workflow"
          path="workflow/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <Workflows />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="statement-templates/*"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Settings,
                method: PermissionMethod.Read,
              }}
            >
              <ListStatements />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </Col>
  </Row>
);

export default SchemeSettings;
