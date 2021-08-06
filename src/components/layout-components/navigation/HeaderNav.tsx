import React, { useState, useEffect } from "react";
import { Layout } from "antd";
// eslint-disable-next-line
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import Logo from "./Logo";
// eslint-disable-next-line
import NavPanel from "./NavPanel";
// eslint-disable-next-line
import NavSearch from "../NavSearch";
// eslint-disable-next-line
import SearchInput from '../NavSearch/SearchInput'
import NavProfile from "./NavProfile";
import NavScheme from './NavScheme'
// eslint-disable-next-line
import NavNotification from './NavNotification';

import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";
import { useStoreState, NavType } from "state";

const { Header } = Layout;

interface Props {
  isMobile: boolean;
}

export const HeaderNav = (props: Props) => {
  const { isMobile } = props;
// eslint-disable-next-line
  const [searchActive, setSearchActive] = useState(false);
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  // const mobileNav = useStoreState((state) => state.theme.navCollapsed);
  const navType = useStoreState((state) => state.theme.navType);
  const headerNavColor = useStoreState((state) => state.theme.headerNavColor);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  // const { toggleCollapsedNav, toggleMobileNav  } = useStoreActions(
  //   (actions) => actions.theme
  // );

  const onSearchClose = () => {
    setSearchActive(false);
  };

  // const onToggle = () => {
  //   if (!isMobile) {
  //     toggleCollapsedNav(!navCollapsed);
  //   } else {
  //     toggleMobileNav(!mobileNav);
  //   }
  // };

  const isNavTop = navType === NavType.TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH - 100}px`;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      onSearchClose();
    }
  });

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <Logo logoType={navMode} />
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            {/* <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              <li
                className="ant-menu-item ant-menu-item-only-child"
                style={{ cursor: "auto" }}
              >
                <SearchInput mode={navMode} isMobile={isMobile} />
              </li>
            </ul> */}
          </div>
          <div className="nav-right">
            <NavScheme />
            {/* <NavNotification /> */}
            <NavProfile />
            {/* <NavPanel /> */}
          </div>
          {/* <NavSearch active={searchActiv} close={onSearchClose} /> */}
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
