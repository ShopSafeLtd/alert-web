import React from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from 'views/rekognition/Dashboard/Dashboard.container';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const FaceAi = (): JSX.Element => (
  <Routes>
    <Route element={<Dashboard />} index />
  </Routes>
);

export default FaceAi;
