import React from 'react';
import utils from 'utils';
import { useStoreState, NavType } from 'state';
import type { NavItem } from 'configs/NavigationConfig';
import MenuContent from './MenuContent';

interface Props {
  localization?: true;
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
}

export const TopNav = ({
  localization = true,
  routeInfo,
  hideGroupTitle,
}: Props) => {
  const topNavColor = useStoreState((state) => state.theme.topNavColor);

  const props = { topNavColor, localization, routeInfo, hideGroupTitle };
  return (
    <div
      className={`top-nav ${utils.getColorContrast(topNavColor)}`}
      style={{ backgroundColor: topNavColor }}
    >
      <div className="top-nav-wrapper">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <MenuContent type={NavType.TOP} {...props} />
      </div>
    </div>
  );
};

export default TopNav;
