/* eslint-disable @typescript-eslint/no-explicit-any */

import { useThemeLanguage } from '#/hooks/useThemeLanguage';
import { GuestLayout } from '#/layouts/guest-layout';
import { useAuth0 } from '@auth0/auth0-react';
import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import { ConfigProvider } from 'antd';
import theme from 'configs/ThemeConfig';
import { useAuth } from 'hooks';
import AppLayout from 'layouts/app-layout';
import { AuthLayout } from 'layouts/auth-layout';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'react-jss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStoreState } from 'state';

import Loading from '../components/loading';
import PrimaryOnboarding from '../views/onboard/SetPassword';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

const Views = () => {
  const { isLoading } = useAuth0();
  const location = useLocation();

  // check if current url is staging. If so, redirect to  https://app.shopsafealert.co.uk/ unless localstorage has been set with staging:true
  if (
    window?.location?.href?.includes('staging.shopsafealert') &&
    !localStorage.getItem('staging')
  ) {
    window.location.replace('https://app.shopsafealert.co.uk/');
  }

  if (navigator?.userAgent?.toLowerCase().includes('android')) {
    window.location.href =
      'https://play.google.com/store/apps/details?id=co.uk.shopsafealert.app';
  } else if (navigator?.userAgent?.toLowerCase().includes('iphone')) {
    window.location.href = 'https://apps.apple.com/gb/app/alert/id1497736226';
  }

  const currentRoute = location.pathname;
  const guestRoutes = ['/generated', '/ext/'];
  const guestRoute = guestRoutes.some((route) => currentRoute.includes(route));

  const isSet = useStoreState((state) => state.auth.isSet);
  const userId = useStoreState((state) => state.user.id);

  const { loading, rehydrateAuth } = useAuth();

  const {
    currentAppLocale,
    messages,
    theme: currentTheme,
  } = useThemeLanguage();

  useEffect(() => {
    if (!guestRoute) rehydrateAuth();
  }, []);

  if ((loading || isLoading || !isSet) && !guestRoute) {
    return <Loading />;
  }

  if (guestRoute) {
    return (
      <div style={{ colorScheme: currentTheme }}>
        <ThemeProvider theme={theme[currentTheme]}>
          <Routes>
            <Route element={<GuestLayout />} path="ext/*" />
          </Routes>
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div style={{ colorScheme: currentTheme }}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={messages}
        onError={() => {}}
      >
        <ErrorBoundary>
          <ThemeProvider theme={theme[currentTheme]}>
            <ConfigProvider locale={currentAppLocale.antd}>
              {isSet ? (
                <SentryRoutes>
                  <Route path="/">
                    <Route element={<Navigate to="app" />} index />
                    <Route element={<AuthLayout />} path="auth/*" />
                    <Route element={<AppLayout />} path="app/*" />
                    <Route
                      element={<PrimaryOnboarding userId={userId} />}
                      path="onboarding/password"
                    />
                    <Route element={<Navigate to="app" />} path="*" />
                  </Route>
                </SentryRoutes>
              ) : (
                <Loading />
              )}
            </ConfigProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </IntlProvider>
    </div>
  );
};

export default Views;
