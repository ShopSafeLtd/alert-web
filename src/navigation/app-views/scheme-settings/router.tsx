import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import SettingsSideMenu from '#/components/settings/SettingSideMenu/SettingsSideMenu.view';
import Loading from '#/components/shared-components/AntD/Loading';
import ActivityTemplatesView from '#/views/adminTodo/ActivityTemplates/ActivityTemplates.contianer';
import SettingsHome from '#/views/settings/settings-home/SettingsHome.view';
import { Col, Row } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { Suspense, lazy, useState } from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';

import CustomStockImport from '../../../views/settings/data-import/custom-stock-import/StockImport.container';

const UserList = lazy(() => import('views/settings/users/UserList'));
const ViewUser = lazy(() => import('views/settings/users/UserDetail'));
const Dem = lazy(() => import('#/views/settings/Dem/DEM'));

const ViewDemGroup = lazy(
  () => import('#/views/settings/Dem/demGroups/DemGroupDetail')
);

const ViewDemDevice = lazy(
  () => import('views/settings/Dem/demDevices/DemDeviceDetail')
);
const BrandList = lazy(() => import('#/views/settings/brands/ListBrands'));
const QuestionsContainer = lazy(
  () => import('views/settings/questions/Questions.container')
);
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
const RecycleBin = lazy(() => import('views/settings/recycled/Recycle'));
const SchemeSharing = lazy(
  () => import('views/settings/schemes/SchemeSharing')
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
const IncidentImport = lazy(
  () => import('views/settings/data-import/incident-import/IncidentImport')
);
const CustomGalleries = lazy(() => import('views/settings/customGallery'));
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
const NextImport = lazy(
  () =>
    import('../../../views/settings/data-import/next-import/NextImport.view')
);
const DunelmImport = lazy(
  () =>
    import(
      '../../../views/settings/data-import/dunelm-import/DunelmImport.view'
    )
);
const TJXImport = lazy(
  () => import('../../../views/settings/data-import/tjx-import/TJXImport.view')
);
const CentralCoopImport = lazy(
  () =>
    import(
      '../../../views/settings/data-import/central-coop-import/CentralCoopImport.view'
    )
);
const IcelandImport = lazy(
  () =>
    import(
      '../../../views/settings/data-import/iceland-import/IcelandImport.view'
    )
);
const RiverIslandImport = lazy(
  () =>
    import(
      '../../../views/settings/data-import/river-island-import/RiverIslandImport.view'
    )
);
const JDSiteImport = lazy(
  () =>
    import(
      '../../../views/settings/data-import/jd-site-import/JDSiteImport.view'
    )
);
const OneStop = lazy(
  () => import('../../../views/settings/data-import/onestop/OneStop.view')
);
const MCCImport = lazy(
  () => import('../../../views/settings/data-import/mcc-import/MCCImport.view')
);
const BusinessOptions = lazy(
  () => import('../../../views/settings/business-options/BusinessOptions.view')
);
const DashboardManagement = lazy(
  () => import('../dashboard-management/router')
);
const ListStockItems = lazy(
  () => import('../../../views/settings/stock-items/ListStockItems')
);
const ListIncidentStatuses = lazy(
  () => import('../../../views/settings/incident-statuses/ListIncidentStatuses')
);

const SchemeSettings = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Row style={{ minHeight: '100vh' }} wrap={false}>
      <Col style={collapsed ? { width: 80 } : { width: 260 }}>
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
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.GeneralSettings,
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
                    model: PermissionModel.GeneralSettings,
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
                    model: PermissionModel.SharingSettings,
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
                      model: PermissionModel.Brands,
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
                  permission={[
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
                      model: PermissionModel.Dem,
                    },
                  ]}
                >
                  <Dem />
                </PermissionCheckWrapper>
              }
              path="dem/*"
            />

            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Dem,
                    },
                  ]}
                >
                  <ViewDemGroup />
                </PermissionCheckWrapper>
              }
              path="dem/dem-groups/view/:id"
            />

            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.Dem,
                    },
                  ]}
                >
                  <ViewDemDevice />
                </PermissionCheckWrapper>
              }
              path="dem/dem-devices/view/:id"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={[
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
                      model: PermissionModel.ChatGroups,
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
                    model: PermissionModel.ChatGroups,
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
                    model: PermissionModel.GeneralSettings,
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
                    model: PermissionModel.IncidentOptions,
                  }}
                >
                  <QuestionsContainer />
                </PermissionCheckWrapper>
              }
              path="questions/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Terms,
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
                    model: PermissionModel.Terms,
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
                    model: PermissionModel.Terms,
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
                    model: PermissionModel.Terms,
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
                    model: PermissionModel.Terms,
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
                    model: PermissionModel.OffenderWarnings,
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
                    model: PermissionModel.IncidentOptions,
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
                    model: PermissionModel.IncidentOptions,
                  }}
                >
                  <ListIncidentStatuses />
                </PermissionCheckWrapper>
              }
              path="incident-statuses"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
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
                  permission={[
                    {
                      method: PermissionMethod.Read,
                      model: PermissionModel.DataImport,
                    },
                  ]}
                >
                  <IncidentImport />
                </PermissionCheckWrapper>
              }
              path="data-import/incident-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.IncidentOptions,
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
                    model: PermissionModel.OffenderGalleries,
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
                    model: PermissionModel.RecycleBin,
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
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Businesses,
                  }}
                >
                  <BusinessOptions />
                </PermissionCheckWrapper>
              }
              path="business-options"
            />
            <Route
              element={<Navigate to="/app/businesses/*" />}
              path="businesses/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Businesses,
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
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.DataImport,
                  }}
                >
                  <NextImport />
                </PermissionCheckWrapper>
              }
              path="data-import/next-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <DunelmImport />
                </PermissionCheckWrapper>
              }
              path="data-import/dunelm-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <TJXImport />
                </PermissionCheckWrapper>
              }
              path="data-import/tjx-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <CentralCoopImport />
                </PermissionCheckWrapper>
              }
              path="data-import/central-coop-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <IcelandImport />
                </PermissionCheckWrapper>
              }
              path="data-import/iceland-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <RiverIslandImport />
                </PermissionCheckWrapper>
              }
              path="data-import/river-island-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <JDSiteImport />
                </PermissionCheckWrapper>
              }
              path="data-import/jd-site-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <OneStop />
                </PermissionCheckWrapper>
              }
              path="data-import/onestop"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
                  }}
                >
                  <MCCImport />
                </PermissionCheckWrapper>
              }
              path="data-import/mcc-import"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.DataExport,
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
                    model: PermissionModel.Roles,
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
                    method: PermissionMethod.Read,
                    model: PermissionModel.Roles,
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
                    model: PermissionModel.Roles,
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
                    model: PermissionModel.DataImport,
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
                    model: PermissionModel.Workflows,
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
                    model: PermissionModel.StatementTemplates,
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
                    model: PermissionModel.Dashboards,
                  }}
                >
                  <DashboardManagement />
                </PermissionCheckWrapper>
              }
              path="manage-dashboard/*"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.TaskSettings,
                  }}
                >
                  <ActivityTemplatesView />
                </PermissionCheckWrapper>
              }
              path="activity-settings"
            />
            <Route
              element={
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Read,
                    model: PermissionModel.Businesses,
                  }}
                >
                  <ListStockItems />
                </PermissionCheckWrapper>
              }
              path="stock-items"
            />
          </Routes>
        </Suspense>
      </Col>
    </Row>
  );
};

export default SchemeSettings;
