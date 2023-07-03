import React from 'react';
import { Route, Routes } from 'react-router';
import CreateMg11 from '../../../views/mg11/GenerateMg11';
import CreateBusinessImpact from '../../../views/generated/BusinessImpactStatement/index';

const Generated = (): JSX.Element => (
  <Routes>
    <Route path="mg11/*" element={<CreateMg11 />} />
    <Route path="bis/*" element={<CreateBusinessImpact />} />
  </Routes>
);

export default Generated;
