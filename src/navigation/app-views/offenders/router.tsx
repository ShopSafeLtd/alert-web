import React from 'react';
import { Routes, Route } from 'react-router';
import OffenderFeed from 'views/offenders/OffenderFeed';
import ViewOffender from 'views/offenders/ViewOffender';
// import Feed from 'old-components/offenders/feed/OffenderFeedQuery/OffenderFeedQuery';
import Add from '../../../old-components/offenders/add/AddOffender/AddOffender';
import Edit from '../../../old-components/offenders/edit/EditOffender/EditOffender';

const Offenders = (): JSX.Element => (
  <Routes>
    {/* <Route index element={<Feed />} />
     */}
    <Route index element={<OffenderFeed />} />
    <Route path="view/:id" element={<ViewOffender />} />
    <Route path="add" element={<Add />} />
    <Route path="edit/:id" element={<Edit />} />
  </Routes>
);

export default Offenders;
