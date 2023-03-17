import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from 'layouts/app-layout';
import AuthLayout from 'layouts/auth-layout';
import AppLocale from 'lang';
import { ThemeProvider } from 'react-jss';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { useStoreState } from 'state';
import { useAuth } from 'hooks';
import { useAuth0 } from '@auth0/auth0-react';
import theme from 'configs/ThemeConfig';
import { useUserNewQuery } from 'graphql/generated';
import Loading from '../components/loading';
import PrimaryOnboarding from '../views/onboard/SetPassword';

export const Views = (): JSX.Element => {
  const { isLoading } = useAuth0();

  const locale = useStoreState((state) => state.theme.locale) as 'en' | 'fr';
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const isSet = useStoreState((state) => state.auth.isSet);
  const userId = useStoreState((state) => state.user.id);
  const location = useLocation();

  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth, loading } = useAuth();

  useEffect(() => {
    rehydrateAuth();
    // eslint-disable-next-line
  }, []);

  // // useEffect(() => {
  // //   const newUserIdCheck = location?.pathname?.split('/onboarding/')[1] || '';
  // //   if (newUserIdCheck !== 'password') {
  // //     setNewUserId(newUserIdCheck);
  // //   }
  // // }, []);
  // useEffect(() => {
  //   if (!isLoading) {
  //     const newUserIdCheck = location?.pathname?.split('/onboarding/')[1] || '';
  //
  //     if (newUserIdCheck !== 'password') {
  //       setNewUserId(newUserIdCheck);
  //     }
  //   }
  // }, [isLoading]);

  const { data } = useUserNewQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: userId,
    },
  });
  if (loading || isLoading || !isSet) return <Loading />;

  return (
    <div style={{ colorScheme: currentTheme }}>
      <ThemeProvider theme={theme[currentTheme]}>
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
                  <Route
                    path="app/*"
                    element={<AppLayout location={location} />}
                  />
                  <Route
                    path="onboarding/password"
                    element={<PrimaryOnboarding userId={userId} />}
                  />
                </Route>
              </Routes>
            ) : (
              <Loading />
            )}
          </ConfigProvider>
        </IntlProvider>
      </ThemeProvider>
    </div>
  );
};

export default Views;
