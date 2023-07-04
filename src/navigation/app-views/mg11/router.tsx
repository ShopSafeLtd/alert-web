import React from 'react';
import { Route, Routes } from 'react-router';
import CreateMg11 from '../../../views/mg11/CreateMg11';
import WitnessSign from '../../../views/mg11/GuestSignMg11';
import CreateBis from '../../../views/mg11/CreateBusinessImpact';
import FinalSign from '../../../views/mg11/FinalSignMg11';

const Mg11 = (): JSX.Element => (
  <Routes>
    <Route path="create/:id" element={<CreateMg11 />} />
    <Route path="witness/:id" element={<WitnessSign />} />
    <Route path="sign/:id" element={<FinalSign />} />
    <Route path="create-bis/:id" element={<CreateBis />} />
  </Routes>
);

export default Mg11;
