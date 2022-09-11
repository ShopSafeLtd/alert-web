import React, { lazy, Suspense, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';
import { useAuth } from 'hooks';
import { useStoreState } from 'state';

const Onboarding = lazy(() => import(`./onboarding/router`));
const Incidents = lazy(() => import(`./incidents/router`));
const Offenders = lazy(() => import(`./offenders/router`));
const Chat = lazy(() => import(`./chat/router`));
const User = lazy(() => import(`./user-settings/router`));
const Scheme = lazy(() => import(`./scheme-settings/router`));

export const AppViews = (): JSX.Element => {
  const { getCurrentUser } = useAuth();
  const { role, onboarded } = useStoreState((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (onboarded && location.pathname === '/app/onboarded') {
      navigate('incidents');
    }
  }, [onboarded]);
  console.log(onboarded);
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
