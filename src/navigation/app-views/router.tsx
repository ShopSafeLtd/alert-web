import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import Loading from 'components/shared-components/AntD/Loading';
import useManageSession from 'hooks/useManageSession';
import { useAtomValue } from 'jotai/index';
import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const Onboarding = lazy(() => import('./onboarding/router'));
const PasswordReset = lazy(() => import('./password/router'));
const Incidents = lazy(() => import('./incidents/router'));
const Offenders = lazy(() => import('./offenders/router'));
const Chat = lazy(() => import('./chat/router'));
const User = lazy(() => import('./user-settings/router'));
const Scheme = lazy(() => import('./scheme-settings/router'));
const Article = lazy(() => import('./article/router'));
const Reports = lazy(() => import('./reports/router'));
const Investigations = lazy(() => import('./investigations/router'));
const Documents = lazy(() => import('./documents/router'));
const Vehicles = lazy(() => import('./vehicles/router'));
const CrimeGroups = lazy(() => import('./crime-groups/router'));
const FeedItems = lazy(() => import('./dashboard/router'));
const Tasks = lazy(() => import('./tasks/router'));
const Notifications = lazy(() => import('./notifications/router'));
const Mg11 = lazy(() => import('./mg11/router'));
const FaceAi = lazy(() => import('./face-ai/router'));
const DataManagement = lazy(() => import('./data-management/router'));
const Evidence = lazy(() => import('./evidence/router'));
const Checklists = lazy(() => import('./checklist/router'));
const DashboardManagement = lazy(() => import('./dashboard-management/router'));
const SingleShoeSystem = lazy(() => import('./singleShoeSystem/router'));
const AiCentre = lazy(() => import('./suggestions/router'));
const Businesses = lazy(() => import('./businesses/router'));

export const AppViews = (): JSX.Element => {
  const { isLoaded } = useAuthClerk();

  useManageSession();
  const forcePasswordReset = useAtomValue(currentUserAtom)?.forcePasswordReset;
  const isSet = !!useAtomValue(currentUserAtom);
  const newUser = useAtomValue(currentUserAtom)?.newUser;
  const termsExpired = useAtomValue(currentUserAtom)?.termsExpired;

  const onboardingRoute = newUser || forcePasswordReset || termsExpired;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!pathname || !isLoaded || !isSet) return;
  }, [pathname]);

  return (
    <Suspense fallback={<Loading cover="content" />}>
      {onboardingRoute ? (
        <Routes>
          <Route element={<Navigate to="onboarding" />} index path="*" />
          <Route
            element={forcePasswordReset ? <PasswordReset /> : <Onboarding />}
            index
            key="onboarding"
            path="onboarding/*"
          />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Navigate to="dashboard" />} index path="*" />
          <Route
            element={<DashboardManagement />}
            key="manage-dashboard"
            path="manage-dashboard/*"
          />
          <Route element={<FeedItems />} key="dashboard" path="dashboard/*" />
          <Route element={<Tasks />} key="tasks" path="tasks/*" />
          <Route element={<Incidents />} key="incidents" path="incidents/*" />
          <Route
            element={<CrimeGroups />}
            key="crime-groups"
            path="crime-groups/*"
          />
          <Route element={<Vehicles />} key="vehicles" path="vehicles/*" />
          <Route element={<Offenders />} key="offenders" path="offenders/*" />
          <Route element={<Chat />} key="chat" path="chat/*" />
          <Route
            element={<Notifications />}
            key="notifications"
            path="notifications/*"
          />
          <Route element={<User />} key="user" path="user-settings/*" />
          <Route element={<Scheme />} key="scheme" path="scheme-settings/*" />
          <Route element={<Article />} key="article" path="article/*" />
          <Route element={<Evidence />} key="evidence" path="evidence/*" />
          <Route
            element={<Checklists />}
            key="checklists"
            path="checklists/*"
          />
          <Route element={<Reports />} key="reports" path="reports/*" />
          <Route
            element={<Investigations />}
            key="investigations"
            path="investigations/*"
          />
          <Route element={<Documents />} key="resources" path="resources/*" />
          <Route element={<Mg11 />} key="mg11" path="mg11/*" />
          <Route element={<FaceAi />} key="face-ai" path="face-ai/*" />
          <Route
            element={<DataManagement />}
            key="data-management"
            path="data-management/*"
          />
          <Route
            element={<SingleShoeSystem />}
            key="singleShoeSystem"
            path="singleShoeSystem/*"
          />
          <Route
            element={<AiCentre />}
            key="suggestions"
            path="suggestions/*"
          />
          <Route
            element={<Businesses />}
            key="businesses"
            path="businesses/*"
          />
        </Routes>
      )}
    </Suspense>
  );
};

export default React.memo(AppViews);
