import App from '#/App';
import LoadingScreen from '#/components/layout-components/LoadingScreen';
import {
  ClerkWithRouting,
  PUBLISHABLE_KEY,
} from '#/providers/ClerkWithRouting';
import { ThemeConfig } from '#/state';
import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import '~/yet-another-react-lightbox/dist/styles.css';

import './index.css';
import * as serviceWorker from './serviceWorker';

const themes = {
  dark: '/css/dark-theme.css',
  light: '/css/light-theme.css',
};

window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <ThemeSwitcherProvider
          defaultTheme={ThemeConfig.currentTheme}
          insertionPoint="styles-insertion-point"
          themeMap={themes}
        >
          <ClerkWithRouting>
            <React.Suspense fallback={<LoadingScreen />}>
              <App />
            </React.Suspense>
          </ClerkWithRouting>
        </ThemeSwitcherProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
