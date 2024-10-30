import type { Role } from 'graphql/types';

import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'components/shared-components/AntD/Loading';
import { useAuth } from 'hooks';
import useManageSession from 'hooks/useManageSession';
import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useStoreState } from 'state';

import type { NavItem as ConfigNavItem } from '../../configs/NavigationConfig';

import { APP_PREFIX_PATH } from '../../configs/AppConfig';
import navigationConfig from '../../configs/NavigationConfig';

const Onboarding = lazy(() => import('./onboarding/router'));
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
// Define the interface for your navigation items
interface NavItem {
  path: string;
  roles?: Role[];
  submenu: NavItem[];
}

// Flatten the navigation items to include submenus
const flattenNavigationItems = (
  items: ConfigNavItem[],
  parentRoles: Role[] = []
): NavItem[] =>
  // eslint-disable-next-line unicorn/no-array-reduce
  items.reduce((acc: NavItem[], item: ConfigNavItem) => {
    const safeParentRoles = parentRoles || [];
    const safeRoles = item.roles || [];
    const combinedRoles = [...new Set([...safeRoles, ...safeParentRoles])];
    acc.push({ path: item.path, roles: combinedRoles, submenu: [] });

    if (item.submenu.length > 0) {
      acc.push(
        ...flattenNavigationItems(
          item.submenu as ConfigNavItem[],
          combinedRoles
        )
      );
    }

    return acc;
  }, []);

// Function to check if a role is allowed for a specific path
const isRoleAllowedForPath = (
  role: Role,
  path: string,
  flattenedNavItems: NavItem[]
): boolean => {
  const item = flattenedNavItems.find((i) => i.path === path);
  if (!item) {
    return true;
  }
  if (!item.roles || item.roles.length === 0) return true;
  return item ? item.roles.includes(role) : false;
};

export const AppViews = (): JSX.Element => {
  const { isLoading } = useAuth0();
  const { getCurrentUser, loading } = useAuth();
  const { isSet, onboarded, role } = useStoreState((state) => state.user);
  useManageSession();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const flattenedNavItems = useMemo(
    () => flattenNavigationItems(navigationConfig),
    []
  );

  const isAllowed = useMemo(
    () => isRoleAllowedForPath(role, pathname, flattenedNavItems),
    [role, pathname]
  );

  useEffect(() => {
    if (!pathname || loading || isLoading || !isSet) return;
    if (!isAllowed) {
      navigate(`${APP_PREFIX_PATH}/dashboard`);
    }
  }, [pathname, role]);

  if (loading || isLoading || !isSet) return <Loading cover="content" />;
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        <Route
          element={<Navigate to={onboarded ? 'dashboard' : 'onboarding'} />}
          index
        />
        {!onboarded && (
          <Route
            element={<Onboarding />}
            key="onboarding"
            path="onboarding/*"
          />
        )}
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
        <Route element={<Checklists />} key="checklists" path="checklists/*" />
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
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppViews);
