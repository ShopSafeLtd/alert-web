import React from 'react';
import { Routes, Route } from 'react-router';
import Onboarding from 'views/onboard/Onboarding';
import PrimaryOnboarding from 'views/onboard/SetPassword';

const SecondaryOnboarding = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<Onboarding />} />
    <Route
      // path="onboarding/password"
      path="password"
      element={<PrimaryOnboarding userId="newUserId" />}
    />
  </Routes>
);

export default SecondaryOnboarding;
