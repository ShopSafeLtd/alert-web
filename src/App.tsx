import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from 'navigation/router';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import LogRocket from 'logrocket';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ApolloProvider from './providers/ApolloProvider';

import { ThemeConfig, Store } from './state';

LogRocket.init('ub3rsv/gotalk-portal');

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

// const httpLink = createUploadLink({
//   //uri: 'https://portal.gotalk.co.uk/api/graphql',
//   uri: "http://localhost:4000/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("accessToken");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E57373',
      main: '#EF5350',
      dark: '#E53935',
      contrastText: '#FFFFFF',
    },
  },
});

function App() {
  console.log('test')
  return (
    <div className="App">
      <Store>
        <ApolloProvider>
          <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={ThemeConfig.currentTheme}
            insertionPoint="styles-insertion-point"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <Router>
                    <Views />
                  </Router>
                </ThemeProvider>
              </StylesProvider>
            </MuiPickersUtilsProvider>
          </ThemeSwitcherProvider>
        </ApolloProvider>
      </Store>
    </div>
  );
}

export default App;
