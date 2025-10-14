import RouteWrapper from '#/navigation/utils/route-wrapper';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import Onboarding from 'views/onboard/Onboarding';
// import PrimaryOnboarding from 'views/onboard/SetPassword';

const SecondaryOnboarding = (): JSX.Element => {
  const intl = useIntl();

  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Onboarding',
      })}
    >
      <Routes>
        <Route element={<Onboarding />} index />
      </Routes>
    </RouteWrapper>
  );
};

export default SecondaryOnboarding;
