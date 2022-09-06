import React from 'react';
import { Routes, Route } from 'react-router';
import EditProfile from 'views/user-settings/EditProfile';

import Terms from 'views/onboard/Onboarded/Terms';

const UserSettings = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<EditProfile />} />
    <Route path="terms" element={<Terms />} />
  </Routes>
);

export default UserSettings;
