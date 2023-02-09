import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';
import { useAuth } from 'hooks';
import { useStoreState } from 'state';
import { useAuth0 } from '@auth0/auth0-react';
import FeedItems from './feedItems/router';
import Incidents from './incidents/router';
import Offenders from './offenders/router';

const Onboarding = lazy(() => import(`./onboarding/router`));
// const Incidents = lazy(() => import(`./incidents/router`));
// const Offenders = lazy(() => import(`./offenders/router`));
const Chat = lazy(() => import(`./chat/router`));
const User = lazy(() => import(`./user-settings/router`));
const Scheme = lazy(() => import(`./scheme-settings/router`));
const Article = lazy(() => import(`./article/router`));
const Reports = lazy(() => import(`./reports/router`));

export const AppViews = (): JSX.Element => {
  const { isLoading } = useAuth0();
  const { getCurrentUser, loading } = useAuth();
  const { role, onboarded, isSet } = useStoreState((state) => state.user);
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    getCurrentUser();
  }, []);

  // useEffect(() => {
  //   if (onboarded && location.pathname === '/app/onboarding') {
  //     navigate('incidents');
  //   }
  // }, [onboarded]);

  if (loading || isLoading || !isSet) return <Loading cover="content" />;
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        <Route
          index
          element={<Navigate to={onboarded ? 'incidents' : 'onboarding'} />}
        />
        {!onboarded && (
          <Route
            key="onboarding"
            path="onboarding/*"
            element={<Onboarding />}
          />
        )}
        <Route key="feedItems" path="feedItems/*" element={<FeedItems />} />,
        <Route key="incidents" path="incidents/*" element={<Incidents />} />,
        <Route key="offenders" path="offenders/*" element={<Offenders />} />,
        <Route key="chat" path="chat/*" element={<Chat />} />,
        <Route key="user" path="user-settings/*" element={<User />} />
        {role === 'SCHEME_ADMIN' && (
          <Route key="scheme" path="scheme-settings/*" element={<Scheme />} />
        )}
        <Route key="article" path="article/*" element={<Article />} />
        <Route key="reports" path="reports/*" element={<Reports />} />
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppViews);
