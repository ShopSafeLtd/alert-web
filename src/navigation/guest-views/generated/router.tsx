import IncidentReportPrint from '#/views/generated/Incident/Incident-summary';
import React from 'react';
import { Route, Routes } from 'react-router';

import CreateBusinessImpact from '../../../views/generated/BusinessImpactStatement/index';
import CreateMg11 from '../../../views/mg11/GenerateMg11';
import ChecklistGenerate from './checklist-router';

const Generated = (): JSX.Element => (
  <Routes>
    <Route element={<CreateMg11 />} path="mg11/*" />
    <Route element={<CreateBusinessImpact />} path="bis/*" />
    <Route element={<ChecklistGenerate />} path="checklist/*" />
    <Route element={<IncidentReportPrint />} path="incident/*" />
  </Routes>
);

export default Generated;
