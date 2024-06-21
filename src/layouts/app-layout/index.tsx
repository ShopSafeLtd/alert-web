import React, { useEffect } from 'react';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import MobileNav from 'components/layout-components/AntD/navigation/MobileNav';
// import PageHeader from 'components/layout-components/AntD/PageHeader';
import AppViews from 'navigation/app-views/router';
import { Grid, Layout } from 'antd';
import navigationConfig from 'configs/NavigationConfig';
import utils from 'utils';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { NavType, useStoreState } from 'state';

import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '#/constants/ThemeConstant';
import ScreenSizeUnsupported from '../../components/layout-components/ScreenSizeUnsuported';
import Loading from '#/components/shared-components/AntD/Loading';
import { useAuth } from '#/hooks';
import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import GroupsProvider from '#/context/groups-context';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout = (): JSX.Element => {
  const location = useLocation();

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
  const { loading } = useAuth();

  const getLayoutGutter = () => {
    if (isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  const { onboarded, forcePasswordReset, isSet, termsExpired } = useStoreState(
    (state) => state.user
  );

  const { status } = useThemeSwitcher();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onboardingRoute =
    !onboarded ||
    forcePasswordReset ||
    termsExpired ||
    location.pathname.includes('onboarding');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  if (status === 'loading') {
    return <Loading cover="page" />;
  }

  if (loading || !isLoaded || !isSet) return <Loading cover="content" />;

  return (
    <ScreenSizeUnsupported>
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
    </ScreenSizeUnsupported>
  );
};

export default React.memo(AppLayout);
