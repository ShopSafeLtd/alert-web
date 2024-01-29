import React from 'react';
import { Route, Routes } from 'react-router';
import CreateMg11 from '../../../views/mg11/GenerateMg11';
import CreateBusinessImpact from '../../../views/generated/BusinessImpactStatement/index';
import ChecklistGenerate from './checklist-router';

const Generated = (): JSX.Element => (
  <Routes>
    <Route path="mg11/*" element={<CreateMg11 />} />
    <Route path="bis/*" element={<CreateBusinessImpact />} />
    <Route path="checklist/*" element={<ChecklistGenerate />} />
  </Routes>
);

export default Generated;
