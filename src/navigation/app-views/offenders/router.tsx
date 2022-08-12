import React from 'react';
import { Routes, Route } from 'react-router';
import OffenderFeed from 'views/offenders/OffenderFeed';
import ViewOffender from 'views/offenders/ViewOffender';
import AddOffender from 'views/offenders/AddOffender';
import EditOffender from 'views/offenders/EditOffender';

const Offenders = (): JSX.Element => (
  <Routes>
    <Route index element={<OffenderFeed />} />
    <Route path="view/:id" element={<ViewOffender />} />
    <Route path="add" element={<AddOffender />} />
    <Route path="edit/:id" element={<EditOffender />} />
  </Routes>
);

export default Offenders;
