import React from 'react';
import { Route, Routes } from 'react-router';

import Onboarding from 'views/onboard/Onboarding';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';
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
        <Route index element={<Onboarding />} />
      </Routes>
    </RouteWrapper>
  );
};

export default SecondaryOnboarding;
