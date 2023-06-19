import React from 'react';
import { Routes, Route } from 'react-router';
import NotificationList from 'views/notifications/NotificationList';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Notifications = (): JSX.Element => (
  <Routes>
    <Route index element={<NotificationList />} />
  </Routes>
);

export default Notifications;
