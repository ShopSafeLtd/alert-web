import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';
import { useStoreState } from 'state';
import useManageSession from 'hooks/useManageSession';

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

export const AppViews = (): JSX.Element => {
  useManageSession();
  const { onboarded, forcePasswordReset, termsExpired } = useStoreState(
    (state) => state.user
  );

  const onboardingRoute = !onboarded || forcePasswordReset || termsExpired;

  return (
    <Suspense fallback={<Loading cover="content" />}>
      {onboardingRoute ? (
        <Routes>
          <Route path={'*'} index element={<Navigate to={'onboarding'} />} />
          <Route
            key="onboarding"
            path="onboarding/*"
            element={forcePasswordReset ? <PasswordReset /> : <Onboarding />}
            index
          />
        </Routes>
      ) : (
        <Routes>
          <Route path={'*'} index element={<Navigate to={'dashboard'} />} />
          <Route
            key="manage-dashboard"
            path="manage-dashboard/*"
            element={<DashboardManagement />}
          />
          <Route key="dashboard" path="dashboard/*" element={<FeedItems />} />
          <Route key="tasks" path="tasks/*" element={<Tasks />} />
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
          <Route key="scheme" path="scheme-settings/*" element={<Scheme />} />
          <Route key="article" path="article/*" element={<Article />} />
          <Route key="evidence" path="evidence/*" element={<Evidence />} />
          <Route
            key="checklists"
            path="checklists/*"
            element={<Checklists />}
          />
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
      )}
    </Suspense>
  );
};

export default AppViews;
