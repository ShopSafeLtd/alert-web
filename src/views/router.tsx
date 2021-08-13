import React, { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import { useStoreState } from "state";
import Loading from "./auth-views/authentication/loading";
import { useAuth } from "hooks";

interface Props {
  location: any;
}

export const Views = (props: Props) => {
  const locale = useStoreState((state) => state.theme.locale);
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const isSet = useStoreState((state) => state.auth.isSet);

  const { location } = props;
  // @ts-expect-error
  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth } = useAuth();

  useEffect(() => {
    rehydrateAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        {isSet ? (
          <Switch>
            <Route exact path="/">
              <Redirect to={loggedIn ? APP_PREFIX_PATH : AUTH_PREFIX_PATH} />
            </Route>
            <Route path={AUTH_PREFIX_PATH}>
              <AuthLayout />
            </Route>
            <Route path={APP_PREFIX_PATH}>
              {!loggedIn ? (
                <Redirect to={AUTH_PREFIX_PATH} />
              ) : (
                <AppLayout location={location} />
              )}
            </Route>
          </Switch>
        ) : (
          <Loading />
        )}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default withRouter(Views);
