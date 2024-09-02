/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call */
import GroupsProvider from '#/context/groups-context';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Layout } from 'antd';
import MobileNav from 'components/layout-components/AntD/navigation/MobileNav';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import Loading from 'components/shared-components/AntD/Loading';
import navigationConfig from 'configs/NavigationConfig';
// import PageHeader from 'components/layout-components/AntD/PageHeader';
import AppViews from 'navigation/app-views/router';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { Navigate } from 'react-router-dom';
import { NavType, useStoreState } from 'state';
import utils from 'utils';

import ScreenSizeUnsupported from '../../components/layout-components/ScreenSizeUnsuported';
import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '../../constants/ThemeConstant';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
}

export const AppLayout = ({ location }: Props): JSX.Element => {
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const navType = useStoreState((state) => state.theme.navType);
  const { onboarded } = useStoreState((state) => state.user);
  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname
  );

  const { isAuthenticated, isLoading } = useAuth0();
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg');
  const isNavSide = navType === NavType.SIDE;
  const isNavTop = navType === NavType.TOP;

  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  const { status } = useThemeSwitcher();

  if (status === 'loading' || isLoading) {
    return <Loading cover="page" />;
  }

  return loggedIn || (isAuthenticated && !isLoading) ? (
    <ScreenSizeUnsupported>
      <GroupsProvider>
        <Layout>
          <Layout className="app-container">
            {isNavSide && !isMobile && onboarded ? (
              <SideNav routeInfo={currentRouteInfo} />
            ) : null}
            <Layout
              className=""
              style={{
                paddingLeft: location.pathname.includes('onboarding')
                  ? 0
                  : getLayoutGutter(),
              }}
            >
              <div
                className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}
                style={{
                  padding:
                    location.pathname.includes('settings') ||
                    location.pathname.includes('onboarding')
                      ? 0
                      : undefined,
                }}
              >
                {/* <PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title} /> */}
                <Content>
                  <AppViews />
                </Content>
              </div>
              {/* <Footer /> */}
            </Layout>
          </Layout>
          {isMobile && <MobileNav routeInfo={currentRouteInfo} />}
        </Layout>
      </GroupsProvider>
    </ScreenSizeUnsupported>
  ) : (
    <Navigate to="/auth" />
  );
};

export default React.memo(AppLayout);
