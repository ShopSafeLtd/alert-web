import React from 'react';
import { Route, Routes } from 'react-router';
import PerformanceReport from 'views/reports/performance';
import OffenderProfileView from 'views/reports/offender-profile/View';
import OffenderProfileSearch from 'views/reports/offender-profile/Search';

const Article = (): JSX.Element => (
  <Routes>
    <Route path="performance-report" element={<PerformanceReport />} />
    <Route path="offender-profile" element={<OffenderProfileSearch />} />
    <Route path="offender-profile/:id" element={<OffenderProfileView />} />
  </Routes>
);

export default Article;
