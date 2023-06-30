/* eslint-disable unicorn/prefer-node-protocol */
import React from 'react';
import { Layout } from 'antd';
import { SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import { useStoreState, NavType } from 'state';
import type { NavItem } from 'configs/NavigationConfig';
import MenuContent from './MenuContent';

const { Sider } = Layout;

interface Props {
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
  localization?: boolean;
}

export const SideNav = ({
  routeInfo,
  hideGroupTitle,
  localization = true,
}: Props) => {
  const sideNavTheme = useStoreState((state) => state.theme.currentTheme);
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);

  return (
    <Sider
      className={`side-nav ${sideNavTheme === 'dark' ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent
          type={NavType.SIDE}
          routeInfo={routeInfo}
          hideGroupTitle={hideGroupTitle}
          localization={localization}
        />
      </Scrollbars>
    </Sider>
  );
};

export default SideNav;
