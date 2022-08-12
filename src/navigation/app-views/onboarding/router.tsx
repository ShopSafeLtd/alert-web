import React from 'react';
import { Routes, Route } from 'react-router';
import Onboarding from 'views/onboard/Onboarding';

// import Onboarding from 'old-components/users/onboard/Secondary/SecondaryOnboarding';

const SecondaryOnboarding = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<Onboarding />} />
  </Routes>
);

export default SecondaryOnboarding;
