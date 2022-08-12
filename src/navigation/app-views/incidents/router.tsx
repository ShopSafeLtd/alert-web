import React from 'react';
import { Routes, Route } from 'react-router';
import IncidentFeed from 'views/incidents/IncidentFeed';
import ViewIncident from 'views/incidents/ViewIncident';
import AddIncident from 'views/incidents/AddIncident';
import EditIncident from 'views/incidents/EditIncident';

const Incidents = (): JSX.Element => (
  <Routes>
    <Route index element={<IncidentFeed />} />
    <Route path="view/:id" element={<ViewIncident />} />
    <Route path="add" element={<AddIncident />} />
    <Route path="edit/:id" element={<EditIncident />} />
  </Routes>
);

export default Incidents;
