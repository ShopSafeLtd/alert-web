import React from 'react';
import { Routes, Route } from 'react-router';
import OffenderFeed from 'views/offenders/OffenderFeed';
import ViewOffender from 'views/offenders/ViewOffender';
import AddOffender from 'views/offenders/AddOffender';
import EditOffender from 'views/offenders/EditOffender';
import CompareOffender from 'views/offenders/CompareOffender';

const Offenders = (): JSX.Element => (
  <Routes>
    <Route index element={<OffenderFeed />} />
    <Route path="view/:id" element={<ViewOffender />} />
    <Route path="add" element={<AddOffender />} />
    <Route path="edit/:id" element={<EditOffender reviewed={false} />} />
    <Route path="review/:id" element={<EditOffender reviewed />} />
    <Route path="compare/:id" element={<CompareOffender />} />
  </Routes>
);

export default Offenders;
