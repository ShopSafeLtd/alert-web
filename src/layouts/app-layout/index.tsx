import React from 'react';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import TopNav from 'components/layout-components/AntD/navigation/TopNav';
import Loading from 'components/shared-components/AntD/Loading';
import MobileNav from 'components/layout-components/AntD/navigation/MobileNav';
import HeaderNav from 'components/layout-components/AntD/navigation/HeaderNav';
// import PageHeader from 'components/layout-components/AntD/PageHeader';
import AppViews from 'navigation/app-views/router';
import { Grid, Layout } from 'antd';

import { ScreenSizeUnsupported } from 'components/layout-components';

import navigationConfig from 'configs/NavigationConfig';
import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from 'constants/ThemeConstant';
import utils from 'utils';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { NavType, useStoreState } from 'state';
import { Navigate } from 'react-router-dom';

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

  if (status === 'loading') {
    return <Loading cover="page" />;
  }

  return !loggedIn ? (
    <Navigate to="/auth" />
  ) : (
    <ScreenSizeUnsupported>
      <Layout>
        <HeaderNav isMobile={isMobile} />
        {isNavTop && !isMobile ? <TopNav routeInfo={currentRouteInfo} /> : null}
        <Layout className="app-container">
          {isNavSide && !isMobile && onboarded ? (
            <SideNav routeInfo={currentRouteInfo} />
          ) : null}
          <Layout className="" style={{ paddingLeft: getLayoutGutter() }}>
            <div
              className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}
              style={{
                padding: location.pathname.includes('settings') ? 0 : undefined,
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
    </ScreenSizeUnsupported>
  );
};

export default React.memo(AppLayout);
