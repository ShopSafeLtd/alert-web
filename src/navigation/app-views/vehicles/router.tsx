import React from 'react';
import { Routes, Route } from 'react-router';
import ListVehicles from 'views/profiles/Vehicles/ListVehicles';
import ViewVehicle from 'views/profiles/Vehicles/ViewVehicle';

const Vehicles = (): JSX.Element => (
  <Routes>
    <Route index element={<ListVehicles />} />
    <Route path="view/:id" element={<ViewVehicle />} />
  </Routes>
);

export default Vehicles;
