import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';
import { useAuth } from 'hooks';
import { useStoreState } from 'state';
import { useAuth0 } from '@auth0/auth0-react';
import useManageSession from 'hooks/useManageSession';
import type { Role } from '../../graphql/generated';
import type { NavItem as ConfigNavItem } from '../../configs/NavigationConfig';
import navigationConfig from '../../configs/NavigationConfig';
import { APP_PREFIX_PATH } from '../../configs/AppConfig';

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
const FeedItems = lazy(() => import(`./dashboard/router`));
const Tasks = lazy(() => import(`./tasks/router`));
const Notifications = lazy(() => import(`./notifications/router`));
const Mg11 = lazy(() => import(`./mg11/router`));
const FaceAi = lazy(() => import(`./face-ai/router`));
const DataManagement = lazy(() => import(`./data-management/router`));
const Evidence = lazy(() => import(`./evidence/router`));
const Checklists = lazy(() => import(`./checklist/router`));
const DashboardManagement = lazy(() => import(`./dashboard-management/router`));

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
  const { role, onboarded, isSet } = useStoreState((state) => state.user);
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
        {/* // TODO change */}
        <Route
          key="manage-dashboard"
          path="manage-dashboard/*"
          element={<DashboardManagement />}
        />

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
        <Route key="evidence" path="evidence/*" element={<Evidence />} />
        <Route key="checklists" path="checklists/*" element={<Checklists />} />
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
