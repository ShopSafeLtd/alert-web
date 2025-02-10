import type { CapturedNetworkRequest, PostHogConfig } from 'posthog-js';

import { TokenProvider } from '#/context/token-context';
import { CaptureConsole, HttpClient } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import { reactRouterV6Instrumentation } from '@sentry/react';
import { LicenseManager } from 'ag-grid-charts-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mixpanel from 'mixpanel-browser';
import Views from 'navigation/router';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
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

const AG_KEY = import.meta.env.VITE_AG_KEY as string;

LicenseManager.setLicenseKey(AG_KEY);

const themes = {
  dark: '/css/dark-theme.css',
  light: '/css/light-theme.css',
};

const excludedNetwork = [
  'api.mapbox.com',
  'events.mapbox.com',
  'api-js.mixpanel.com',
  'shopsafealert.blob.core.windows.net',
  'https://app.shopsafe.io/ingest/',
];
const options: Partial<PostHogConfig> = {
  api_host: 'https://app.shopsafe.io/ingest',
  disable_surveys: true,
  enable_recording_console_log: true,
  secure_cookie: true,
  session_recording: {
    maskCapturedNetworkRequestFn: (request: CapturedNetworkRequest) => {
      if (excludedNetwork.some((network) => request.name.includes(network))) {
        return null;
      }

      return request;
    },
  },
  ui_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};
if (import.meta.env.PROD) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      /^Failed to fetch dynamically imported module: .*/,
      "Cannot read properties of undefined (reading 'get')",
      /There has been an Error with loading Google Maps API script, please check that you provided correct google API key/,
    ],
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
      new posthog.SentryIntegration(
        posthog,
        'nvoyy-group',
        4_504_836_741_136_385
      ),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    sendDefaultPii: true,
    // Adjust for production
    tracesSampleRate: 0.6,
  });
}

export const PublicRoutes = ['/terms', '/debug'];

const App = (): JSX.Element => (
  <div className="App">
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <ThemeSwitcherProvider
        defaultTheme={ThemeConfig.currentTheme}
        insertionPoint="styles-insertion-point"
        themeMap={themes}
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
      </ThemeSwitcherProvider>
    </PostHogProvider>
  </div>
);

export default Sentry.withProfiler(App);
