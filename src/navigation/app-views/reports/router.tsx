import RouteWrapper from '#/navigation/utils/route-wrapper';
import IncidentItemReport from '#/views/reports/incident-items/IncidentItemsReport.view';
import OffenderTable from '#/views/reports/offender-table/OffenderTable.container';
import ReportCentre from '#/views/reports/reports-centre/ReportsCentre.container';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import DataAudit from 'views/reports/DataAudit';
import UserEngagement from 'views/reports/UserEngagement';
import BusinessReport from 'views/reports/business/BusinessReport';
import BusinessSearch from 'views/reports/business/Search';
// import BusinessView from 'views/reports/business/View';
import BusinessEngagement from 'views/reports/business-engagement';
import CrimeGroupReport from 'views/reports/crime-groups/crime-group-report';
import CrimeGroupList from 'views/reports/crime-groups/list-crime-groups';
import IncidentMap from 'views/reports/incident-map';
import OffenderProfileSearch from 'views/reports/offender-profile/Search';
import OffenderEngagement from 'views/reports/offender-report';
import PerformanceReport from 'views/reports/performance';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Reports = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Reports',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <ReportCentre />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <PerformanceReport />
            </PermissionCheckWrapper>
          }
          path="summary-report/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <OffenderProfileSearch />
            </PermissionCheckWrapper>
          }
          path="offender-profile/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <OffenderEngagement />
            </PermissionCheckWrapper>
          }
          path="offender-profile/:reportId/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <IncidentMap />
            </PermissionCheckWrapper>
          }
          path="incident-map/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <BusinessSearch />
            </PermissionCheckWrapper>
          }
          path="business/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <BusinessEngagement />
            </PermissionCheckWrapper>
          }
          path="business-engagement/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <UserEngagement />
            </PermissionCheckWrapper>
          }
          path="user-engagement/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <DataAudit />
            </PermissionCheckWrapper>
          }
          path="data-audit"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <CrimeGroupList />
            </PermissionCheckWrapper>
          }
          path="crime-groups/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <CrimeGroupReport />
            </PermissionCheckWrapper>
          }
          path="crime-groups/:reportId/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <BusinessReport />
            </PermissionCheckWrapper>
          }
          path="business/:reportId/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <IncidentItemReport />
            </PermissionCheckWrapper>
          }
          path="incident-items/:reportId"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Reports,
              }}
            >
              <OffenderTable />
            </PermissionCheckWrapper>
          }
          path="offender-table/:reportId"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Reports;
