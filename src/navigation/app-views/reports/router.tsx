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

const Article = (): JSX.Element => (
  <Routes>
    <Route path="performance-report" element={<PerformanceReport />} />
    <Route path="offender-profile" element={<OffenderProfileSearch />} />
    <Route path="offender-profile/:id" element={<OffenderEngagement />} />
    <Route path="incident-map" element={<IncidentMap />} />
    <Route path="business" element={<BusinessSearch />} />
    <Route path="business-engagement" element={<BusinessEngagement />} />
    <Route path="user-engagement" element={<UserEngagement />} />
    <Route path="data-audit" element={<DataAudit />} />
    <Route path="crime-groups" element={<CrimeGroupList />} />
    <Route path="crime-groups/:id" element={<CrimeGroupReport />} />
    <Route path="business/:id" element={<BusinessReport />} />
  </Routes>
);

export default Article;
