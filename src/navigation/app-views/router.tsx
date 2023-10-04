import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
const Article = lazy(() => import(`./article/router`));
const Reports = lazy(() => import(`./reports/router`));
const Investigations = lazy(() => import(`./investigations/router`));
const Documents = lazy(() => import(`./documents/router`));
const Vehicles = lazy(() => import(`./vehicles/router`));
const CrimeGroups = lazy(() => import(`./crime-groups/router`));
const FeedItems = lazy(() => import(`./feedItems/router`));
const Tasks = lazy(() => import(`./tasks/router`));
const Notifications = lazy(() => import(`./notifications/router`));
const Mg11 = lazy(() => import(`./mg11/router`));
const FaceAi = lazy(() => import(`./face-ai/router`));
const DataManagement = lazy(() => import(`./data-management/router`));

export const AppViews = (): JSX.Element => {
  const { isLoading } = useAuth0();
  const { getCurrentUser, loading } = useAuth();
  const { role, onboarded, isSet } = useStoreState((state) => state.user);

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loading || isLoading || !isSet) return <Loading cover="content" />;
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        <Route
          index
          element={<Navigate to={onboarded ? 'dashboard' : 'onboarding'} />}
        />
        {!onboarded && (
          <Route
            key="onboarding"
            path="onboarding/*"
            element={<Onboarding />}
          />
        )}
        <Route key="dashboard" path="dashboard/*" element={<FeedItems />} />
        {role !== 'USER' && (
          <Route key="tasks" path="tasks/*" element={<Tasks />} />
        )}
        <Route key="incidents" path="incidents/*" element={<Incidents />} />
        <Route
          key="crime-groups"
          path="crime-groups/*"
          element={<CrimeGroups />}
        />
        <Route key="vehicles" path="vehicles/*" element={<Vehicles />} />
        <Route key="offenders" path="offenders/*" element={<Offenders />} />
        <Route key="chat" path="chat/*" element={<Chat />} />
        <Route
          key="notifications"
          path="notifications/*"
          element={<Notifications />}
        />
        <Route key="user" path="user-settings/*" element={<User />} />
        {(role === 'SCHEME_ADMIN' || role === 'GROUP_ADMIN') && (
          <Route key="scheme" path="scheme-settings/*" element={<Scheme />} />
        )}
        <Route key="article" path="article/*" element={<Article />} />
        <Route key="reports" path="reports/*" element={<Reports />} />
        <Route
          key="investigations"
          path="investigations/*"
          element={<Investigations />}
        />
        <Route key="resources" path="resources/*" element={<Documents />} />
        <Route key="mg11" path="mg11/*" element={<Mg11 />} />
        <Route key="face-ai" path="face-ai/*" element={<FaceAi />} />
        <Route
          key="data-management"
          path="data-management/*"
          element={<DataManagement />}
        />
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppViews);
