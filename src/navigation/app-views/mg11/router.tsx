import React from 'react';
import { Route, Routes } from 'react-router';

import CreateBis from '../../../views/mg11/CreateBusinessImpact';
import CreateMg11 from '../../../views/mg11/CreateMg11';
import FinalSign from '../../../views/mg11/FinalSignMg11';
import WitnessSign from '../../../views/mg11/GuestSignMg11';

const Mg11 = (): JSX.Element => (
  <Routes>
    <Route element={<CreateMg11 />} path="create/" />
    <Route element={<CreateMg11 />} path="create/:id" />
    <Route element={<WitnessSign />} path="witness/:id" />
    <Route element={<FinalSign />} path="sign/:id" />
    <Route element={<CreateBis />} path="create-bis/:id" />
    <Route element={<CreateBis />} path="create-bis/" />
  </Routes>
);

export default Mg11;
