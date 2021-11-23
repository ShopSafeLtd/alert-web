import React from "react";
import utils from "utils";
import MenuContent from "./MenuContent";
import { useStoreState, NavType } from "state";
import { NavItem } from 'configs/NavigationConfig'

interface Props {
	localization?: true;
	routeInfo: NavItem;
	hideGroupTitle?: boolean;
}

export const TopNav = ({ localization = true, routeInfo, hideGroupTitle }: Props) => {
  const topNavColor = useStoreState((state) => state.theme.topNavColor);

  const props = { topNavColor, localization, routeInfo, hideGroupTitle };
  return (
    <div
      className={`top-nav ${utils.getColorContrast(topNavColor)}`}
      style={{ backgroundColor: topNavColor }}
    >
      <div className="top-nav-wrapper">
        <MenuContent type={NavType.TOP} {...props} />
      </div>
    </div>
  );
};

export default TopNav;
