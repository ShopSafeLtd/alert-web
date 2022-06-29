import React from 'react';
import { Routes, Route } from 'react-router';
import IncidentFeed from 'views/incidents/IncidentFeed';
import ViewIncident from 'views/incidents/ViewIncident';
import Add from 'old-components/incidents/add/AddIncident/AddIncident';
import Edit from 'old-components/incidents/edit/EditIncident/EditIncident';

const Incidents = (): JSX.Element => (
  <Routes>
    <Route index element={<IncidentFeed />} />
    <Route path="view/:id" element={<ViewIncident />} />
    <Route path="add" element={<Add />} />
    <Route path="edit/:id" element={<Edit />} />
  </Routes>
);

export default Incidents;
