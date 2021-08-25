import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { useAuth } from "hooks";

import { useStoreState } from "state";

export const AppViews = () => {
  const { getCurrentUser } = useAuth();

  const { role, onboarded } = useStoreState((state) => state.user);

  const routes = [
    <Route
      key="incidents"
      path={`${APP_PREFIX_PATH}/incidents`}
      component={lazy(() => import(`./incidents/router`))}
    />,
    <Route
      key="offenders"
      path={`${APP_PREFIX_PATH}/offenders`}
      component={lazy(() => import(`./offenders/router`))}
    />,
    <Route
      key="chat"
      path={`${APP_PREFIX_PATH}/chat`}
      component={lazy(() => import(`./chat/router`))}
    />,
    <Route
      key="user"
      path={`${APP_PREFIX_PATH}/user-settings`}
      component={lazy(() => import(`./user-settings/router`))}
    />,
  ];

  if (role === "SCHEME_ADMIN") {
    routes.push(
      <Route
        key="scheme"
        path={`${APP_PREFIX_PATH}/scheme-settings`}
        component={lazy(() => import(`./scheme-settings/router`))}
      />
    );
  }

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        {/* <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        /> */}
        {!onboarded && (
          <Route
            key="onboarding"
            path={`${APP_PREFIX_PATH}/onboarding`}
            component={lazy(() => import(`./onboarding/router`))}
          />
        )}
        {routes}

        <Redirect
          exact
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/${onboarded ? "incidents" : "onboarding"}`}
        />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
