import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from 'views/rekognition/Dashboard/Dashboard.container';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const FaceAi = (): JSX.Element => (
  <Routes>
    <Route index element={<Dashboard />} />
  </Routes>
);

export default FaceAi;
