import React from 'react';
import { Route, Routes } from 'react-router';
// import ReviewIncident from 'views/incidents/ReviewIncident ';
import ListInvestigations from '../../../views/investigations/ListInvestigations/ListInvestigations.container';
import ViewInvestigation from '../../../views/investigations/ViewInvestigation/ViewInvestigation.container';

const Investigations = (): JSX.Element => (
  <Routes>
    <Route index element={<ListInvestigations />} />
    <Route path="view/:id" element={<ViewInvestigation />} />
  </Routes>
);

export default Investigations;
