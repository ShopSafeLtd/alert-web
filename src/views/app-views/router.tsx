import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import useAuth from 'hooks/useAuth'

export const AppViews = () => {
  const { getCurrentUser } = useAuth()

  const adminRoutes = [
    <Route
      key="settings"
      path={`${APP_PREFIX_PATH}/incidents`}
      component={lazy(() => import(`./incidents/router`))}
    />,
    <Route
      key="agreements"
      path={`${APP_PREFIX_PATH}/offenders`}
      component={lazy(() => import(`./offenders/router`))}
    />,
    <Route
      key="schemes"
      path={`${APP_PREFIX_PATH}/scheme`}
      component={lazy(() => import(`./scheme/router`))}
    />,
    <Route
      key="schemes"
      path={`${APP_PREFIX_PATH}/user`}
      component={lazy(() => import(`./user/router`))}
    />,
  ];

  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line
  }, [])

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
