import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views/router";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { ThemeProvider, StylesProvider } from "@material-ui/styles";
import LogRocket from "logrocket";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ApolloProvider from "./providers/ApolloProvider";
import logo from "./images/icon-192.png";

import { useMediaQuery } from "react-responsive";

import { ThemeConfig, Store } from "./state";

LogRocket.init("ub3rsv/gotalk-portal");

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
      light: "#E57373",
      main: "#EF5350",
      dark: "#E53935",
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  const SupportedScreenSizes = ({
    children,
  }: {
    children: React.ReactElement;
  }) => {
    const isSupported = useMediaQuery({ minWidth: 1024 });
    console.log(isSupported);

    return isSupported ? (
      children
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: window.screen.height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ height: "150px", marginBottom: "48px" }}
          alt="Alert logo"
          src={logo}
        />
        <span
          style={{
            fontSize: 22,
            marginBottom: "12px",
            width: "70%",
            minWidth: "280px",
            textAlign: "center",
          }}
        >
          We no longer support this screen size on the web version of Alert!
        </span>
        <span
          style={{
            fontSize: 16,
            marginBottom: "56px",
            width: "50%",
            minWidth: "280px",
            textAlign: "center",
          }}
        >
          Please download our app to experience all the familiar features, with
          better performance!
        </span>
        <a href="https://play.google.com/store/apps/details?id=co.uk.shopsafealert.app&gl=GB&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            style={{ height: "80px" }}
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          />
        </a>
        <a
          href="https://apps.apple.com/gb/app/alert/id1497736226?itsct=apps_box_badge&amp;itscg=30200"
          style={{
            display: "inlineBlock",
            overflow: "hidden",
            borderRadius: "13px",
            height: "60px",
          }}
        >
          <img
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1596585600&h=d061bb2467a3829491c56c906653e3f9"
            alt="Download on the App Store"
            style={{ borderRadius: "13px", height: "60px" }}
          />
        </a>
      </div>
    );
  };
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
                  <SupportedScreenSizes>
                    <Router>
                      <Switch>
                        <Route path="/" component={Views} />
                      </Switch>
                    </Router>
                  </SupportedScreenSizes>
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
