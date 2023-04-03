import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import { useStoreState } from "state";
import Loading from "./auth-views/authentication/loading";
import { useAuth } from "hooks";
import { useQuery } from "@apollo/client";
import { UserNew, UserNewArgs, UserNewRes } from "graphql-src/users/queries";

import PrimaryOnboarding from "../old-components/users/onboard/Primary/PrimaryOnboarding";

interface Props {
  history: any;
  location: any;
}

export const Views = (props: Props) => {
  const [newUserId, setNewUserId] = useState<string>("");

  const locale = useStoreState((state) => state.theme.locale);
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const isSet = useStoreState((state) => state.auth.isSet);
  const schemes = useStoreState((state) => state.user.schemes);
  const { location } = props;

  // @ts-expect-error
  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth } = useAuth();

  useEffect(() => {
    rehydrateAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newUserId = location?.pathname?.split("/onboarding/")[1] || "";
    if (newUserId !== "password") {
      setNewUserId(newUserId);
    }
  }, [location]);

  const { data } = useQuery<UserNewRes, UserNewArgs>(UserNew, {
    fetchPolicy: "network-only",
    variables: {
      id: newUserId,
    },
  });

  if (
    schemes
      .flatMap((schemes) => schemes.scheme.id)
      .includes("clfi9000c0000piabawfn9s2w")
  ) {
    window.location.replace("https://staging.shopsafealert.co.uk/");
  }

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        {isSet && data ? (
          <Switch>
            <Route exact path="/">
              <Redirect to={loggedIn ? APP_PREFIX_PATH : AUTH_PREFIX_PATH} />
            </Route>

            <Route path={`/onboarding`}>
              {data?.userNew?.hasAuth0Id && (
                <Redirect to={loggedIn ? APP_PREFIX_PATH : AUTH_PREFIX_PATH} />
              )}
              <PrimaryOnboarding
                history={props.history}
                user={{ id: newUserId, email: data.userNew?.email }}
              />
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
