import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Col, Row } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import SettingsHome from '#/views/settings/settings-home/SettingsHome.view';
import SettingsSideMenu from '#/components/settings/SettingSideMenu/SettingsSideMenu.view';
import Loading from '#/components/shared-components/AntD/Loading';

const UserList = lazy(() => import('views/settings/users/UserList'));
const ViewUser = lazy(() => import('views/settings/users/UserDetail'));
const GroupList = lazy(() => import('views/settings/groups/GroupList'));
const ViewGroup = lazy(() => import('views/settings/groups/GroupDetail'));
const ChatGroupsList = lazy(() => import('views/settings/chats/ChatList'));
const ViewChatGroup = lazy(() => import('views/settings/chats/ChatDetail'));
const SchemeDetails = lazy(() => import('views/settings/schemes/SchemeDetail'));
const OffenderWarnings = lazy(
  () => import('views/settings/tags/OffenderWarning')
);
const CrimeTypes = lazy(() => import('views/settings/tags/CrimeTypes'));
const Terms = lazy(() => import('views/settings/terms/TermList'));
const UserTerms = lazy(() => import('views/settings/terms/UserTerms'));
const SchemeTerms = lazy(() => import('views/settings/terms/SchemeTerms'));
const CreateTermsContainer = lazy(
  () => import('views/settings/terms/CreateTerms/CreateTerms.container')
);
const RecycleBin = lazy(() => import('views/settings/recycled/RecycleBin'));
const SchemeSharing = lazy(
  () => import('views/settings/schemes/SchemeSharing')
);
const ListBusinesses = lazy(
  () => import('views/settings/businesses/ListBusinesses')
);
const ViewBusiness = lazy(
  () => import('views/settings/businesses/ViewBusiness')
);
const DiscMenu = lazy(
  () => import('views/settings/data-import/menu/Menu.view')
);
const DiscImport = lazy(
  () => import('views/settings/data-import/disc-import/DiscImport.container')
);
const CSVImport = lazy(
  () =>
    import('views/settings/data-import/csv/data-import/ImportData.container')
);
const CustomGalleries = lazy(() => import('views/settings/customGallery'));
const BrandList = lazy(() => import('#/views/settings/brands/ListBrands'));
const CustomSchemeTerms = lazy(
  () =>
    import('../../../views/settings/terms/ViewCustomTerms/ViewTermsContainer')
);
const ListStatements = lazy(
  () => import('../../../views/settings/statements/ListStatements')
);
const TagView = lazy(
  () => import('../../../views/settings/tags/ViewTag/ViewTag.container')
);
const Workflows = lazy(() => import('../workflow/router'));
const DataExport = lazy(() => import('../data-management/router'));
const RolesContainer = lazy(
  () => import('../../../views/roles/roles/Roles.container')
);
const Role = lazy(() => import('../../../views/roles/role/ViewRole.container'));
const MySafety = lazy(
  () => import('../../../views/settings/data-import/mysafety/MySafety.view')
);
const IntelOne = lazy(
  () => import('../../../views/settings/data-import/intel-one/IntelOne.view')
);
const PermissionCheckWrapper = lazy(
  () => import('../../../components/PermissionCheck/PermissionCheckWrapper')
);
const DashboardManagement = lazy(
  () => import('../dashboard-management/router')
);

const SchemeSettings = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Row wrap={false}>
      <Col style={collapsed ? { width: 20 } : undefined}>
        <SettingsSideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      </Col>
      <Col flex={1} style={{ overflow: 'auto', height: '100vh' }}>
        <Suspense fallback={<Loading cover="content" />}>
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
              path="scheme-sharing"
              element={
                <PermissionCheckWrapper
                  permission={{
                    model: PermissionModel.Settings,
                    method: PermissionMethod.Read,
                  }}
                >
                  <SchemeSharing />
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
              path="brands/*"
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
                  <BrandList />
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
            <Route
              path="manage-dashboard/*"
              element={
                <PermissionCheckWrapper
                  permission={{
                    model: PermissionModel.Settings,
                    method: PermissionMethod.Read,
                  }}
                >
                  <DashboardManagement />
                </PermissionCheckWrapper>
              }
            />
          </Routes>
        </Suspense>
      </Col>
    </Row>
  );
};

export default SchemeSettings;
