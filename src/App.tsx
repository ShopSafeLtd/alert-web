import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from 'navigation/router';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';

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
    </div>
  );
}

export default App;
