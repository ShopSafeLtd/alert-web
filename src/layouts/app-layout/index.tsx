import type { Theme } from '#/configs/ThemeConfig';

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
  pendingCriticalBulletinsAtom,
  pendingLoginVideosAtom,
  settingSchemeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Layout } from 'antd';
import MandatoryCriticalBulletinModal from 'components/bulletins/MandatoryCriticalBulletinModal';
import MobileNav, {
  mobileNavOpenAtom,
} from 'components/layout-components/AntD/navigation/MobileNav';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import MandatoryVideoModal from 'components/training/MandatoryVideoModal';
import navigationConfig from 'configs/NavigationConfig';
import { useAtomValue, useSetAtom } from 'jotai/index';
import AppViews from 'navigation/app-views/router';
import { usePostHog } from 'posthog-js/react';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';
import { NavType, useStoreState } from 'state';
import utils from 'utils';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const useStyles = createUseStyles((theme: Theme) => ({
  menuButton: {
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderRadius: '100%',
    display: 'flex',
    height: 46,
    justifyContent: 'center',
    position: 'fixed',
    right: 20,
    top: 20,
    width: 46,
    zIndex: 899,
  },
}));

const AppLayout = (): JSX.Element => {
  const location = useLocation();
  const posthog = usePostHog();
  const classes = useStyles();

  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const navType = useStoreState((state) => state.theme.navType);
  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname
  );
  const { getCurrentUser } = useAuth();
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('xl');
  const isNavSide = navType === NavType.SIDE;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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
    : (currentUser?.forcePasswordReset ?? false);
  const isSet = !!currentUser;

  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const setMobileNavOpen = useSetAtom(mobileNavOpenAtom);
  const pendingVideos = useAtomValue(pendingLoginVideosAtom);
  const setPendingVideos = useSetAtom(pendingLoginVideosAtom);
  const pendingBulletins = useAtomValue(pendingCriticalBulletinsAtom);
  const setPendingBulletins = useSetAtom(pendingCriticalBulletinsAtom);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBulletinModal, setShowBulletinModal] = useState(false);

  const onMobileNavToggle = () => {
    setMobileNavOpen(true);
  };

  const handleBulletinsComplete = useCallback(() => {
    setPendingBulletins([]);
    setShowBulletinModal(false);
  }, [setPendingBulletins, setShowBulletinModal]);

  const handleVideosComplete = useCallback(() => {
    setPendingVideos([]);
    setShowVideoModal(false);
  }, [setPendingVideos, setShowVideoModal]);

  // Show bulletin modal when pending critical bulletins are loaded
  useEffect(() => {
    if (pendingBulletins.length > 0) {
      setShowBulletinModal(true);
    }
  }, [pendingBulletins]);

  // Show video modal when pending videos are loaded (only if no bulletins)
  useEffect(() => {
    if (pendingVideos.length > 0 && pendingBulletins.length === 0) {
      setShowVideoModal(true);
    }
  }, [pendingVideos, pendingBulletins]);

  const { status } = useThemeSwitcher();

  useEffect(() => {
    void getCurrentUser();
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
        void posthog.alias(oldDistinctId, id);
      }

      if (sessionId) {
        void posthog.capture('user_logged_in', { session_id: sessionId });
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
          {isMobile && (
            <div className={classes.menuButton} onClick={onMobileNavToggle}>
              <FontAwesomeIcon color="#FFF" icon={faBars} size="xl" />
            </div>
          )}
          <MandatoryCriticalBulletinModal
            bulletins={pendingBulletins}
            onComplete={handleBulletinsComplete}
            visible={showBulletinModal}
          />
          <MandatoryVideoModal
            onComplete={handleVideosComplete}
            videos={pendingVideos}
            visible={showVideoModal}
          />
        </Layout>
      </GroupsProvider>
    </Suspense>
  );
};

export default React.memo(AppLayout);
