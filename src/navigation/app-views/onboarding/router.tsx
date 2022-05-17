import React from "react";
import { Routes, Route } from "react-router";
import { default as Onboarding } from "old-components/users/onboard/Secondary/SecondaryOnboarding";

const SecondaryOnboarding = () => {
  return (
    <Routes>
      <Route path="*" element={<Onboarding />} />
    </Routes>
  );
};

export default SecondaryOnboarding;
