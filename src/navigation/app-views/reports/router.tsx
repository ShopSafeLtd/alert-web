import React from 'react';
import { Route, Routes } from 'react-router';
import PerformanceReport from 'views/reports/performance';
import OffenderProfileSearch from 'views/reports/offender-profile/Search';
import IncidentMap from 'views/reports/incident-map';
import BusinessSearch from 'views/reports/business/Search';
// import BusinessView from 'views/reports/business/View';
import BusinessEngagement from 'views/reports/business-engagement';
import OffenderEngagement from 'views/reports/offender-report';
import CrimeGroupList from 'views/reports/crime-groups/list-crime-groups';
import CrimeGroupReport from 'views/reports/crime-groups/crime-group-report';
import BusinessReport from 'views/reports/business/BusinessReport';
import UserEngagement from 'views/reports/UserEngagement';
import DataAudit from 'views/reports/DataAudit';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import ReportCentre from '#/views/reports/reports-centre/ReportsCentre.container';

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
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <ReportCentre />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="summary-report/:reportId"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <PerformanceReport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="offender-profile/:reportId"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <OffenderProfileSearch />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="offender-profile/:reportId/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <OffenderEngagement />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="incident-map"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <IncidentMap />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="business/:reportId"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <BusinessSearch />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="business-engagement"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <BusinessEngagement />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="user-engagement"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <UserEngagement />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="data-audit"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <DataAudit />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="crime-groups/:reportId"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <CrimeGroupList />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="crime-groups/:reportId/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <CrimeGroupReport />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="business/:reportId/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Reports,
                method: PermissionMethod.Read,
              }}
            >
              <BusinessReport />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Reports;
