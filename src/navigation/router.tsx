/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from 'layouts/app-layout';
import { AuthLayout } from 'layouts/auth-layout';
import type { AvailableLanguages } from 'lang';
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
import { LocalStorageKeys, typedLocalStorage } from '../utils';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

const Views = () => {
  const { isLoading } = useAuth0();
  const location = useLocation();
  const locale = useStoreState((state) => state.theme.locale);
  const lang = navigator.language.split('-')[0];
  const localLang = typedLocalStorage.get(LocalStorageKeys.lang);
  const initLang = localLang || lang || locale;
  const customTranslations = useStoreState(
    (state) => state.scheme.translations
  );
  const currentRoute = location.pathname;
  const guestRoutes = ['/generated', '/ext/'];
  const guestRoute = guestRoutes.some((route) => currentRoute.includes(route));

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const t = localStorage.getItem('theme');
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  if (t) {
    document.documentElement.setAttribute('style', `color-scheme: ${t}`);
  } else {
    // get browser theme preference
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    switchTheme(darkMode ? 'dark' : 'light');
    // set color-scheme: dark or light on the html element
    document.documentElement.setAttribute(
      'style',
      `color-scheme: ${darkMode ? 'dark' : 'light'}`
    );
  }

  const isSet = useStoreState((state) => state.auth.isSet);
  const userId = useStoreState((state) => state.user.id);
  const navigate = useNavigate();
  const currentAppLocale = AppLocale[initLang as AvailableLanguages];

  const { rehydrateAuth, loading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore. eslint-disable-next-line
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function convertTranslationsToJSON(
    translations: any[],
    language: string
  ): { [key: string]: string } {
    const json = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const translation of translations) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const id = Object.keys(translation)[0];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      json[id] = translation[id][language];
    }

    return json;
  }

  const [messages, setMessages] = useState({
    ...currentAppLocale.messages,
    ...convertTranslationsToJSON(customTranslations || [], locale),
  });

  useEffect(() => {
    setMessages({
      ...currentAppLocale.messages,
      ...convertTranslationsToJSON(customTranslations || [], locale),
    });
  }, [currentAppLocale.messages, customTranslations, locale]);

  useEffect(() => {
    if (!guestRoute) rehydrateAuth();
  }, []);

  const { data } = useUserNewQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: userId,
    },
    skip: guestRoute || !userId,
    onCompleted: (res) => {
      if (res.userNew?.newUser) {
        navigate('/app/onboarding');
      }
    },
  });

  if ((loading || isLoading || !isSet) && !guestRoute) {
    return <Loading />;
  }

  if (guestRoute) {
    return (
      <div style={{ colorScheme: currentTheme }}>
        <ThemeProvider theme={theme[currentTheme]}>
          <Routes>
            <Route path="ext/*" element={<GuestLayout />} />
          </Routes>
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div style={{ colorScheme: currentTheme }}>
      <IntlProvider locale={currentAppLocale.locale} messages={messages}>
        <ErrorBoundary>
          <ThemeProvider theme={theme[currentTheme]}>
            <ConfigProvider locale={currentAppLocale.antd}>
              {isSet && (data === undefined || data.userNew) ? (
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
                    <Route path="*" element={<Navigate to="app" />} />
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
