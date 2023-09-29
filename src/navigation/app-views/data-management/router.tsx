import React from 'react';
import { Route, Routes } from 'react-router';
import ExportIncidents from 'views/data-management/export-incidents/exportIncidents.container';

const DataManagement = (): JSX.Element => (
  <Routes>
    <Route path="export-incidents" element={<ExportIncidents />} />
  </Routes>
);

export default DataManagement;
