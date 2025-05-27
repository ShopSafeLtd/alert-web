import LoadingScreen from '#/components/layout-components/LoadingScreen';
import Loading from '#/components/shared-components/AntD/Loading';
import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '#/constants/ThemeConstant';
import GroupsProvider from '#/context/groups-context';
import { useAuth } from '#/hooks';
import {
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
  currentUserSchemeAtom,
  settingSchemeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import { Grid, Layout } from 'antd';
import MobileNav from 'components/layout-components/AntD/navigation/MobileNav';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import navigationConfig from 'configs/NavigationConfig';
import { useAtomValue } from 'jotai/index';
import AppViews from 'navigation/app-views/router';
import { usePostHog } from 'posthog-js/react';
import React, { Suspense, useEffect } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { useLocation } from 'react-router-dom';
import { NavType, useStoreState } from 'state';
import utils from 'utils';

import ScreenSizeUnsupported from '../../components/layout-components/ScreenSizeUnsuported';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout = (): JSX.Element => {
  const location = useLocation();
  const posthog = usePostHog();

  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const navType = useStoreState((state) => state.theme.navType);
  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname
  );
  const { getCurrentUser } = useAuth();
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg');
  const isNavSide = navType === NavType.SIDE;
  const { isLoaded } = useAuthClerk();

  const getLayoutGutter = () => {
    if (isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };
  const isSettingScheme = useAtomValue(settingSchemeAtom);
  const businesses = useAtomValue(currentSchemeBusinessesAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const noPassword = useAtomValue(currentUserSchemeAtom)?.scheme
    ?.disablePassword;
  const email = currentUser?.email ?? '';
  const fullName = currentUser?.fullName ?? '';
  const id = currentUser?.id ?? '';
  const onboarded = !currentUser?.newUser || true;
  const termsExpired = currentUser?.termsExpired ?? false;
  const forcePasswordReset = noPassword
    ? false
    : currentUser?.forcePasswordReset ?? false;
  const isSet = !!currentUser;

  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { status } = useThemeSwitcher();

  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    if (id) {
      const oldDistinctId = localStorage.getItem('posthog_distinct_id');
      const sessionId = localStorage.getItem('posthog_session_id');

      // Identify sends an event, so you want may want to limit how often you call it
      posthog?.identify(id, {
        email,
        fullName,
        organisation: businesses?.at(0)?.name,
      });
      posthog?.group('tenant', currentScheme);

      document.cookie = `shopsafe_user_id=${id}; path=/; domain=.shopsafe.io; Secure; SameSite=None`;

      if (oldDistinctId) {
        posthog.alias(oldDistinctId, id);
      }

      if (sessionId) {
        posthog.capture('user_logged_in', { session_id: sessionId });
      }
    }
  }, [posthog, id, email, currentScheme, fullName]);
  const onboardingRoute =
    !onboarded ||
    forcePasswordReset ||
    termsExpired ||
    location.pathname.includes('onboarding');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  if (status === 'loading') {
    return <LoadingScreen />;
  }
  if (!isLoaded || !isSet || isSettingScheme) return <LoadingScreen />;

  return (
    <ScreenSizeUnsupported>
      <Suspense fallback={<Loading cover="content" />}>
        <GroupsProvider>
          <Layout>
            <Layout className="app-container">
              {isNavSide && !isMobile && !onboardingRoute ? (
                <SideNav routeInfo={currentRouteInfo} />
              ) : null}
              <Layout
                className=""
                style={{
                  paddingLeft: onboardingRoute ? 0 : getLayoutGutter(),
                }}
              >
                <div
                  className={'app-content'}
                  style={{
                    padding:
                      location.pathname.includes('settings') || onboardingRoute
                        ? 0
                        : undefined,
                  }}
                >
                  <Content>
                    <AppViews />
                  </Content>
                </div>
              </Layout>
            </Layout>
            {isMobile && <MobileNav routeInfo={currentRouteInfo} />}
          </Layout>
        </GroupsProvider>
      </Suspense>
    </ScreenSizeUnsupported>
  );
};

export default React.memo(AppLayout);
