import React from 'react';
import { Route, Routes } from 'react-router';
import EditProfile from 'views/user-settings/Edit-Profile';
import { TermsCard } from '#/navigation/auth-views/components/Terms';

const UserSettings = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<EditProfile />} />
    <Route path="terms" element={<TermsCard />} />
  </Routes>
);

export default UserSettings;
