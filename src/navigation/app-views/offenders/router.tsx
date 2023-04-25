import React from 'react';
import { Routes, Route } from 'react-router';
import OffenderFeed from 'views/profiles/offenders/OffenderFeed';
import ViewOffender from 'views/profiles/offenders/ViewOffender';
import AddOffender from 'views/profiles/offenders/AddOffender';
import EditOffender from 'views/profiles/offenders/EditOffender';
import CompareOffender from 'views/profiles/offenders/CompareOffender';

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
