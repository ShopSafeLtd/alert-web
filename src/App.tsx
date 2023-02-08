import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from 'navigation/router';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';
import { LoadScript } from '@react-google-maps/api';

import LogRocket from 'logrocket';
import ApolloProvider from './providers/ApolloProvider';

import { Store, ThemeConfig } from './state';

LogRocket.init('ub3rsv/gotalk-portal');

const themes = {
  dark: `/css/dark-theme.css`,
  light: `/css/light-theme.css`,
};

function App(): JSX.Element {
  return (
    <div className="App">
      <LoadScript
        googleMapsApiKey="AIzaSyDCtIwIjWDGtK7YSE2K68k-dZ2HF5FtMZ0"
        libraries={['visualization']}
      >
        <Store>
          <ApolloProvider>
            <ThemeSwitcherProvider
              themeMap={themes}
              defaultTheme={ThemeConfig.currentTheme}
              insertionPoint="styles-insertion-point"
            >
              <Router>
                <Views />
              </Router>
            </ThemeSwitcherProvider>
          </ApolloProvider>
        </Store>
      </LoadScript>
    </div>
  );
}

export default App;
