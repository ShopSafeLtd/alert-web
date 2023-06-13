import React from 'react';
import { Route, Routes } from 'react-router';
import CreateMg11 from '../../../views/mg11/GenerateMg11';

const Generated = (): JSX.Element => (
  <Routes>
    <Route path="mg11/*" element={<CreateMg11 />} />
  </Routes>
);

export default Generated;
