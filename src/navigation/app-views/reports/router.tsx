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
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const Reports = (): JSX.Element => (
  <Routes>
    <Route
      path="performance-report"
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
      path="offender-profile"
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
      path="offender-profile/:id"
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
      path="business"
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
      path="crime-groups"
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
      path="crime-groups/:id"
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
      path="business/:id"
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
);

export default Reports;
