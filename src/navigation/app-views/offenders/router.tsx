import React from 'react';
import { Routes, Route } from 'react-router';
import OffenderFeed from 'views/Profiles/offenders/OffenderFeed';
import ViewOffender from 'views/Profiles/offenders/ViewOffender';
import AddOffender from 'views/Profiles/offenders/AddOffender';
import EditOffender from 'views/Profiles/offenders/EditOffender';
import CompareOffender from 'views/Profiles/offenders/CompareOffender';

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
