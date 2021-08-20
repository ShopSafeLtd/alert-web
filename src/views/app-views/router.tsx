import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { useAuth } from "hooks";

import { useStoreState } from "state";

export const AppViews = () => {
  const { getCurrentUser } = useAuth();

  const userRole = useStoreState((state) => state.user.role);
  console.log(userRole);

  const adminRoutes = [
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

  if (userRole === "SCHEME_ADMIN") {
    adminRoutes.push(
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

        {adminRoutes}

        <Redirect
          exact
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/incidents`}
        />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
