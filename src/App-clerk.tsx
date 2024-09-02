import { TokenProvider } from '#/context/token-context';
import { LoadScript } from '@react-google-maps/api';
import { CaptureConsole, HttpClient } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import { configureScope, reactRouterV6Instrumentation } from '@sentry/react';
import LogRocket from 'logrocket';
import 'mapbox-gl/dist/mapbox-gl.css';
import mixpanel from 'mixpanel-browser';
import Views from 'navigation/router';
import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import RouteWrapper from './navigation/utils/route-wrapper';
import ApolloProvider from './providers/ApolloProvider';
import { Store, ThemeConfig } from './state';

const themes = {
  dark: '/css/dark-theme.css',
  light: '/css/light-theme.css',
};

if (import.meta.env.PROD) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);
  Sentry.init({
    beforeSend(event) {
      const logRocketSession = LogRocket.sessionURL;
      if (logRocketSession !== null && event.extra) {
        // eslint-disable-next-line no-param-reassign
        event.extra.LogRocket = logRocketSession;
        return event;
      }
      return event;
    },
    dsn: import.meta.env.VITE_SENTRY_DSN,

    integrations: [
      new CaptureConsole(),
      new Sentry.BrowserTracing({
        routingInstrumentation: reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new HttpClient(),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    sendDefaultPii: true,
    // Adjust for production
    tracesSampleRate: 0.4,
  });
  LogRocket.init('ub3rsv/alert');

  LogRocket.getSessionURL((sessionURL) => {
    configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

const App = (): JSX.Element => (
  <div className="App">
    <ThemeSwitcherProvider
      defaultTheme={ThemeConfig.currentTheme}
      insertionPoint="styles-insertion-point"
      themeMap={themes}
    >
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['visualization']}
      >
        <TokenProvider>
          <Store>
            <ApolloProvider>
              <RouteWrapper title={undefined}>
                <Views />
              </RouteWrapper>
            </ApolloProvider>
          </Store>
        </TokenProvider>
      </LoadScript>
    </ThemeSwitcherProvider>
  </div>
);

export default Sentry.withProfiler(App);
