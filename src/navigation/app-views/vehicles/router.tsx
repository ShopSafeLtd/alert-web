import React from 'react';
import { Routes, Route } from 'react-router';
import ListVehicles from 'views/Profiles/Vehicles/ListVehicles';
import ViewVehicle from 'views/Profiles/Vehicles/ViewVehicle';

const Vehicles = (): JSX.Element => (
  <Routes>
    <Route index element={<ListVehicles />} />
    <Route path="view/:id" element={<ViewVehicle />} />
  </Routes>
);

export default Vehicles;
