import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from 'layouts/app-layout';
import AuthLayout from 'layouts/auth-layout';
import AppLocale from 'lang';
import { ThemeProvider } from 'react-jss';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import { useAuth } from 'hooks';
import { useAuth0 } from '@auth0/auth0-react';
import theme from 'configs/ThemeConfig';
import { useUserNewQuery } from 'graphql/generated';
import { useNavigate } from 'react-router';
import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import PrimaryOnboarding from '../views/onboard/SetPassword';
import Loading from '../components/loading';
import { GuestLayout } from '../layouts/guest-layout';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const Views = (): JSX.Element => {
  const { isLoading } = useAuth0();
  const location = useLocation();
  const currentRoute = location.pathname;
  const guestRoutes = ['/generated', '/ext/'];
  const guestRoute = guestRoutes.some((route) => currentRoute.includes(route));
  const locale = useStoreState((state) => state.theme.locale) as 'en' | 'fr';
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const t = localStorage.getItem('theme');
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  if (!t) {
    // get browser theme preference
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    switchTheme(darkMode ? 'dark' : 'light');
  }

  const isSet = useStoreState((state) => state.auth.isSet);
  const userId = useStoreState((state) => state.user.id);
  const navigate = useNavigate();
  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth, loading } = useAuth();

  useEffect(() => {
    if (!guestRoute) rehydrateAuth();
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
    skip: guestRoute,
    onCompleted: (res) => {
      if (res.userNew?.newUser) {
        navigate('/app/onboarding');
      }
    },
  });
  if ((loading || isLoading || !isSet) && !guestRoute) return <Loading />;

  if (guestRoute)
    return (
      <div style={{ colorScheme: currentTheme }}>
        <ThemeProvider theme={theme[currentTheme]}>
          <Routes>
            <Route path="ext/*" element={<GuestLayout />} />
          </Routes>
        </ThemeProvider>
      </div>
    );
  return (
    <ErrorBoundary>
      <div style={{ colorScheme: currentTheme }}>
        <ThemeProvider theme={theme[currentTheme]}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <ConfigProvider locale={currentAppLocale.antd}>
              {isSet && data ? (
                <SentryRoutes>
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
                </SentryRoutes>
              ) : (
                <Loading />
              )}
            </ConfigProvider>
          </IntlProvider>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  );
};

export default Views;
