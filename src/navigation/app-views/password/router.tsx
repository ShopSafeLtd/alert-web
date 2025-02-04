import RouteWrapper from '#/navigation/utils/route-wrapper';
import SetPassword from '#/views/onboard/SetPassword-clerk';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const PasswordReset = (): JSX.Element => {
  const intl = useIntl();

  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Password',
      })}
    >
      <Routes>
        <Route element={<SetPassword />} index />
      </Routes>
    </RouteWrapper>
  );
};

export default PasswordReset;
