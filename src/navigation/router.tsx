import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from 'layouts/app-layout';
import AuthLayout from 'layouts/auth-layout';
import AppLocale from 'lang';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { useStoreState } from 'state';
import { useAuth } from 'hooks';
import { useQuery } from '@apollo/client';
import { UserNew, UserNewArgs, UserNewRes } from 'graphql-src/users/queries';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './auth-views/authentication/loading';

import PrimaryOnboarding from '../old-components/users/onboard/Primary/PrimaryOnboarding';

export const Views = () => {
  const [newUserId, setNewUserId] = useState<string>('');
  const { isLoading } = useAuth0();

  const locale = useStoreState((state) => state.theme.locale) as 'en' | 'fr';

  const isSet = useStoreState((state) => state.auth.isSet);

  const location = useLocation();

  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth } = useAuth();

  useEffect(() => {
    rehydrateAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newUserIdCheck = location?.pathname?.split('/onboarding/')[1] || '';
    if (newUserIdCheck !== 'password') {
      setNewUserId(newUserIdCheck);
    }
  }, []);

  const { data } = useQuery<UserNewRes, UserNewArgs>(UserNew, {
    fetchPolicy: 'network-only',
    variables: {
      id: newUserId,
    },
  });
  if (isLoading) return <Loading />;

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        {isSet && data ? (
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="app" />} />
              <Route path="auth/*" element={<AuthLayout />} />
              <Route path="app/*" element={<AppLayout location={location} />} />
              <Route
                path="onboarding"
                element={
                  <PrimaryOnboarding
                    user={{ id: newUserId, email: data.userNew?.email }}
                  />
                }
              />
            </Route>
          </Routes>
        ) : (
          <Loading />
        )}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Views;
