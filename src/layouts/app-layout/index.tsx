import React from 'react';
import SideNav from 'components/layout-components/AntD/navigation/SideNav';
import TopNav from 'components/layout-components/AntD/navigation/TopNav';
import Loading from 'components/shared-components/AntD/Loading';
import MobileNav from 'components/layout-components/AntD/navigation/MobileNav';
import HeaderNav from 'components/layout-components/AntD/navigation/HeaderNav';
// import PageHeader from 'components/layout-components/AntD/PageHeader';
import AppViews from 'views/app-views/router';
import { Layout, Grid } from 'antd';

import { ScreenSizeUnsupported } from 'components/layout-components';

import navigationConfig from 'configs/NavigationConfig';
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
} from 'constants/ThemeConstant';
import utils from 'utils';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useStoreState, NavType } from 'state';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface Props {
  location: any;
}

export const AppLayout = ({ location }: Props) => {
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

  return (
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
