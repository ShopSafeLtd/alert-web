import React from 'react';
import {
  BrowserRouter as Router,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import Views from 'navigation/router';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';
import { LoadScript } from '@react-google-maps/api';
import * as Sentry from '@sentry/react';
import { configureScope, reactRouterV6Instrumentation } from '@sentry/react';
import LogRocket from 'logrocket';
import { BrowserTracing } from '@sentry/tracing';
import { CaptureConsole } from '@sentry/integrations';
import mixpanel from 'mixpanel-browser';
import ApolloProvider from './providers/ApolloProvider';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Store, ThemeConfig } from './state';

const themes = {
  dark: `/css/dark-theme.css`,
  light: `/css/light-theme.css`,
};

if (import.meta.env.PROD) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new CaptureConsole({
        levels: ['error'],
      }),
      new BrowserTracing({
        routingInstrumentation: reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // Adjust for production
    tracesSampleRate: 0.3,
    beforeSend(event) {
      const logRocketSession = LogRocket.sessionURL;
      if (logRocketSession !== null && event.extra) {
        // eslint-disable-next-line no-param-reassign
        event.extra.LogRocket = logRocketSession;
        return event;
      }
      return event;
    },
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
      themeMap={themes}
      defaultTheme={ThemeConfig.currentTheme}
      insertionPoint="styles-insertion-point"
    >
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['visualization']}
      >
        <Store>
          <ApolloProvider>
            <Router>
              <Views />
            </Router>
          </ApolloProvider>
        </Store>
      </LoadScript>
    </ThemeSwitcherProvider>
  </div>
);

export default Sentry.withProfiler(App);
