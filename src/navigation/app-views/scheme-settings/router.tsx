import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import SettingsSideMenu from '#/components/settings/SettingSideMenu/SettingsSideMenu.view';
import Loading from '#/components/shared-components/AntD/Loading';
import SettingsHome from '#/views/settings/settings-home/SettingsHome.view';
import { Col, Row } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router';

import CustomStockImport from '../../../views/settings/data-import/custom-stock-import/StockImport.container';

const UserList = lazy(() => import('views/settings/users/UserList'));
const ViewUser = lazy(() => import('views/settings/users/UserDetail'));
const GroupList = lazy(() => import('views/settings/groups/GroupList'));
const ViewGroup = lazy(() => import('views/settings/groups/GroupDetail'));
const ChatGroupsList = lazy(() => import('views/settings/chats/ChatList'));
const ViewChatGroup = lazy(() => import('views/settings/chats/ChatDetail'));
const SchemeDetails = lazy(
  () => import('views/settings/schemes/SchemeDetail/SchemeDetail.container')
);
const OffenderWarnings = lazy(
  () => import('views/settings/tags/OffenderWarning')
);
const SentrysysImport = lazy(
  () =>
    import(
      'views/settings/data-import/sentrysys-import/SentrysysImport.container'
    )
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
      <Col flex={1} style={{ height: '100vh', overflow: 'auto' }}>
        <Suspense fallback={<Loading cover="content" />}>
          <Routes>
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SettingsHome />
                </PermissionCheckWrapper>
              }
              index
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CustomStockImport />
                </PermissionCheckWrapper>
              }
              path="csv-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SchemeDetails />
                </PermissionCheckWrapper>
              }
              path="scheme-settings"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SchemeDetails />
                </PermissionCheckWrapper>
              }
              path="scheme"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SchemeSharing />
                </PermissionCheckWrapper>
              }
              path="scheme-sharing"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Users,
                    },
                  ]}
                >
                  <UserList />
                </PermissionCheckWrapper>
              }
              path="users/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Users,
                    },
                  ]}
                >
                  <ViewUser />
                </PermissionCheckWrapper>
              }
              path="users/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Groups,
                    },
                  ]}
                >
                  <GroupList />
                </PermissionCheckWrapper>
              }
              path="groups/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Groups,
                    },
                  ]}
                >
                  <ViewGroup />
                </PermissionCheckWrapper>
              }
              path="groups/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Write,
                      model: PermissionModel.Chat,
                    },
                  ]}
                >
                  <ChatGroupsList />
                </PermissionCheckWrapper>
              }
              path="chat-groups/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <ViewChatGroup />
                </PermissionCheckWrapper>
              }
              path="chat-groups/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SchemeDetails />
                </PermissionCheckWrapper>
              }
              path="scheme-details"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <Terms />
                </PermissionCheckWrapper>
              }
              path="terms/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <UserTerms />
                </PermissionCheckWrapper>
              }
              path="terms/user-terms/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SchemeTerms />
                </PermissionCheckWrapper>
              }
              path="terms/scheme-terms/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CustomSchemeTerms />
                </PermissionCheckWrapper>
              }
              path="terms/scheme/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CreateTermsContainer />
                </PermissionCheckWrapper>
              }
              path="terms/scheme/create"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <OffenderWarnings />
                </PermissionCheckWrapper>
              }
              path="offender-warnings/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CrimeTypes />
                </PermissionCheckWrapper>
              }
              path="crime-types/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <SentrysysImport />
                </PermissionCheckWrapper>
              }
              path="data-import/sentrysys"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <TagView />
                </PermissionCheckWrapper>
              }
              path="crime-types/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CustomGalleries />
                </PermissionCheckWrapper>
              }
              path="custom-galleries/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <RecycleBin />
                </PermissionCheckWrapper>
              }
              path="recycle-bin/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Businesses,
                    },
                  ]}
                >
                  <ListBusinesses />
                </PermissionCheckWrapper>
              }
              path="businesses/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <ViewBusiness />
                </PermissionCheckWrapper>
              }
              path="businesses/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Settings,
                    },
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Businesses,
                    },
                  ]}
                >
                  <BrandList />
                </PermissionCheckWrapper>
              }
              path="brands/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <DiscMenu />
                </PermissionCheckWrapper>
              }
              path="data-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <DiscImport />
                </PermissionCheckWrapper>
              }
              path="data-import/disc"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <MySafety />
                </PermissionCheckWrapper>
              }
              path="data-import/mysafety"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <IntelOne />
                </PermissionCheckWrapper>
              }
              path="data-import/intel-one"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CSVImport />
                </PermissionCheckWrapper>
              }
              path="data-import/csv"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <DataExport />
                </PermissionCheckWrapper>
              }
              path="data-export/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <RolesContainer />
                </PermissionCheckWrapper>
              }
              index
              path="roles/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Edit,
                    model: PermissionModel.Settings,
                  }}
                >
                  <Role create />
                </PermissionCheckWrapper>
              }
              path="roles/create"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <Role />
                </PermissionCheckWrapper>
              }
              path="roles/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <CSVImport />
                </PermissionCheckWrapper>
              }
              path="data-import/csv/stock-items"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <Workflows />
                </PermissionCheckWrapper>
              }
              key="workflow"
              path="workflow/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <ListStatements />
                </PermissionCheckWrapper>
              }
              path="statement-templates/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Settings,
                  }}
                >
                  <DashboardManagement />
                </PermissionCheckWrapper>
              }
              path="manage-dashboard/*"
            />
          </Routes>
        </Suspense>
      </Col>
    </Row>
  );
};

export default SchemeSettings;
