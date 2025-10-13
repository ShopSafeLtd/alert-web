import React from 'react';
import { Route, Routes } from 'react-router';
import NotificationList from 'views/notifications/NotificationList';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Notifications = (): JSX.Element => (
  <Routes>
    <Route element={<NotificationList />} index />
  </Routes>
);

export default Notifications;
