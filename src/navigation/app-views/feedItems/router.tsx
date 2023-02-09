import React from 'react';
import { Routes, Route } from 'react-router';
import FeedItem from 'views/feedItems';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const FeedItems = (): JSX.Element => (
  <Routes>
    <Route index element={<FeedItem />} />
    {/* <Route path="view/:id" element={<ViewIncident />} />
    <Route path="add" element={<AddIncident />} />
    <Route path="edit/:id" element={<EditIncident reviewed={false} />} /> */}
    {/* <Route path="review/:id" element={<ReviewIncident />} /> */}
    {/* <Route path="review/:id" element={<EditIncident reviewed />} /> */}
  </Routes>
);

export default FeedItems;
