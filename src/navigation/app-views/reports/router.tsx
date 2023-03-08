import React from 'react';
import { Route, Routes } from 'react-router';
import PerformanceReport from 'views/reports/performance';
import OffenderProfileView from 'views/reports/offender-profile/View';
import OffenderProfileSearch from 'views/reports/offender-profile/Search';
import IncidentMap from 'views/reports/incident-map';
import BusinessSearch from 'views/reports/business/Search';
import BusinessView from 'views/reports/business/View';

const Article = (): JSX.Element => (
  <Routes>
    <Route path="performance-report" element={<PerformanceReport />} />
    <Route path="offender-profile" element={<OffenderProfileSearch />} />
    <Route path="offender-profile/:id" element={<OffenderProfileView />} />
    <Route path="incident-map" element={<IncidentMap />} />
    <Route path="business" element={<BusinessSearch />} />
    <Route path="business/:id" element={<BusinessView />} />
  </Routes>
);

export default Article;
