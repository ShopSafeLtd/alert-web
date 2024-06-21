import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { AvailableLanguages } from 'lang';
import AppLocale, { AvailableLanguagesConst } from 'lang';
import { ThemeProvider } from 'react-jss';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import theme from 'configs/ThemeConfig';
import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import { GuestLayout } from '#/layouts/guest-layout';
import { LocalStorageKeys, typedLocalStorage } from '#/utils';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import LoginView from '#/views/sign-in/Login.View';
import type { Translations } from '#/state/scheme-model';
import GenerateSignInRedirect from '#/utils/generate-sign-in-redirect';
import { useTokenContext } from '#/context/token-context';
import Loading from '#/components/shared-components/AntD/Loading';
import AppLayout from '#/layouts/app-layout';
import Terms from '#/navigation/auth-views/components/Terms';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

function checkLang(l: string): l is AvailableLanguages {
  return (AvailableLanguagesConst as readonly string[]).includes(l);
}

const Views = () => {
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

  const locale = useStoreState((state) => state.theme.locale);
  const lang =
    checkLang(
      navigator.language === 'nl-BE' ? 'rbe' : navigator.language.split('-')[0]
    ) &&
    (navigator.language === 'nl-BE' ? 'rbe' : navigator.language.split('-')[0]);

  const localLang = typedLocalStorage.get(LocalStorageKeys.lang);

  const initLang = localLang || lang || locale;
  useEffect(() => {
    if (initLang) {
      typedLocalStorage.set(LocalStorageKeys.lang, initLang);
    }
  }, []);

  const customTranslations = useStoreState(
    (state) => state.scheme.translations
  );
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
  const currentAppLocale = AppLocale[initLang as AvailableLanguages];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore. eslint-disable-next-line
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function convertTranslationsToJSON(
    translations: Translations[],
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
  const { token } = useTokenContext();
  useEffect(() => {
    setMessages({
      ...currentAppLocale.messages,
      ...convertTranslationsToJSON(customTranslations || [], locale),
    });
  }, [currentAppLocale.messages, customTranslations, locale]);

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
              <SentryRoutes>
                <Route path="*" element={<Navigate to="app" />} />
                <Route path="/terms/*" element={<Terms />} />

                <Route
                  path="/app/*"
                  element={
                    <>
                      <SignedOut>
                        <Navigate to={GenerateSignInRedirect()} />
                      </SignedOut>
                      <SignedIn>
                        {token ? <AppLayout /> : <Loading cover="content" />}
                      </SignedIn>
                    </>
                  }
                />
                <Route
                  path={'/sign-in/*'}
                  element={
                    <>
                      <SignedOut>
                        <LoginView />
                      </SignedOut>
                      <SignedIn>
                        <Navigate to="/app" />
                      </SignedIn>
                    </>
                  }
                />
                <Route path="/ext/*" element={<GuestLayout />} />
              </SentryRoutes>
            </ConfigProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </IntlProvider>
    </div>
  );
};

export default Views;
