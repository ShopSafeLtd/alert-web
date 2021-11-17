import React, { Suspense } from 'react';
import {
  Route,
  useRouteMatch,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import Loading, {
  Props as LoadingProps,
} from 'components/shared-components/AntD/Loading';

interface Props extends LoadingProps {
  routes: RouteProps[];
  from: string;
  to: string;
}

const PageRouter = ({ routes, from, to, align, cover }: Props) => {
  const { url } = useRouteMatch();

  const loadingProps = { align, cover };

  return (
    <Suspense fallback={<Loading {...loadingProps} />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={`${url}/${route.path}`}
            component={route.component}
          />
        ))}
        <Redirect from={from} to={to} />
      </Switch>
    </Suspense>
  );
};

export default PageRouter;
