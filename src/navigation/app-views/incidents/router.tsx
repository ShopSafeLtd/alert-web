import React from 'react';
import { Route, Routes } from 'react-router';
import IncidentFeed from 'views/incidents/IncidentFeed';
import ViewIncident from 'views/incidents/ViewIncident';
import AddIncident from 'views/incidents/AddIncident';
import EditIncident from 'views/incidents/EditIncident';
// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Incidents = (): JSX.Element => (
  <Routes>
    <Route index element={<IncidentFeed />} />
    <Route path="view/:id" element={<ViewIncident />} />
    <Route path="add/:id" element={<AddIncident />} />
    <Route path="add" element={<AddIncident />} />
    <Route path="edit/:id" element={<EditIncident reviewed={false} />} />
    {/* <Route path="review/:id" element={<ReviewIncident />} /> */}
    <Route path="review/:id" element={<EditIncident reviewed />} />
  </Routes>
);

export default Incidents;
