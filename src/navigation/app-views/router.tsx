import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';
import { useAuth } from 'hooks';

import { useStoreState } from 'state';
import { useAuth0 } from '@auth0/auth0-react';

const Onboarding = lazy(() => import(`./onboarding/router`));
const Incidents = lazy(() => import(`./incidents/router`));
const Offenders = lazy(() => import(`./offenders/router`));
const Chat = lazy(() => import(`./chat/router`));
const User = lazy(() => import(`./user-settings/router`));
const Scheme = lazy(() => import(`./scheme-settings/router`));

export const AppViews = () => {
  const { getCurrentUser } = useAuth();
  // const navigate = useNavigate();
  const { isLoading } = useAuth0();
  const { role, onboarded } = useStoreState((state) => state.user);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (onboarded) {
  //     navigate(onboarded ? 'incidents' : 'onboarded');
  //   }
  // }, [onboarded]);
  if (isLoading) return <Loading />;
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        <Route
          index
          element={<Navigate to={onboarded ? 'incidents' : 'onboarded'} />}
        />
        {!onboarded && (
          <Route key="onboarding" path="onboarding" element={<Onboarding />} />
        )}
        <Route key="incidents" path="incidents/*" element={<Incidents />} />,
        <Route key="offenders" path="offenders/*" element={<Offenders />} />,
        <Route key="chat" path="chat/*" element={<Chat />} />,
        <Route key="user" path="user-settings/*" element={<User />} />
        {role === 'SCHEME_ADMIN' && (
          <Route key="scheme" path="scheme-settings/*" element={<Scheme />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppViews);
