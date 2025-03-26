/* eslint-disable unicorn/prefer-node-protocol */
import type { NavItem } from 'configs/NavigationConfig';

import { Layout } from 'antd';
import { SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import React, { memo, useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavType, useStoreState } from 'state';

import MenuContent from './MenuContent';

const { Sider } = Layout;

interface Props {
  hideGroupTitle?: boolean;
  localization?: boolean;
  routeInfo: NavItem;
}

const SideNav = ({ hideGroupTitle, localization = true, routeInfo }: Props) => {
  const { currentTheme: sideNavTheme, navCollapsed } = useStoreState(
    (state) => state.theme
  );

  const menuContent = useMemo(
    () => (
      <MenuContent
        hideGroupTitle={hideGroupTitle}
        localization={localization}
        routeInfo={routeInfo}
        type={NavType.SIDE}
      />
    ),
    [hideGroupTitle, localization, routeInfo]
  );

  return (
    <Sider
      className={`side-nav ${sideNavTheme === 'dark' ? 'side-nav-dark' : ''}`}
      collapsed={navCollapsed}
      width={SIDE_NAV_WIDTH}
    >
      <Scrollbars autoHide>{menuContent}</Scrollbars>
    </Sider>
  );
};

export default memo(SideNav);
