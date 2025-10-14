import React from 'react';
import { Route, Routes } from 'react-router';

import ChecklistGenerate from '../../../views/checklist/completed-checklist/index';
import '../../../views/checklist/completed-checklist/styles.css';

const Generated = (): JSX.Element => (
  <Routes>
    <Route element={<ChecklistGenerate />} index />
  </Routes>
);

export default Generated;
