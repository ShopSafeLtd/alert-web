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
}

export default App;
