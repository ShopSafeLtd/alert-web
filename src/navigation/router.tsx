import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import theme from 'configs/ThemeConfig';
import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import { GuestLayout } from '#/layouts/guest-layout';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import LoginView from '#/views/sign-in/Login.View';
import GenerateSignInRedirect from '#/utils/generate-sign-in-redirect';
import { useTokenContext } from '#/context/token-context';
import Loading from '#/components/shared-components/AntD/Loading';
import AppLayout from '#/layouts/app-layout';
import Terms from '#/navigation/auth-views/components/Terms';
import { useThemeLanguage } from '#/hooks/useThemeLanguage';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

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
  const { token } = useTokenContext();

  const {
    theme: currentTheme,
    messages,
    currentAppLocale,
  } = useThemeLanguage();

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
