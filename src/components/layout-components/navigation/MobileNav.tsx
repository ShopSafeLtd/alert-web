import React from "react";
import { Drawer } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useStoreState, useStoreActions, NavType } from 'state'
import { NavItem } from "configs/NavigationConfig";

interface Props {
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
  localization?: boolean;
}

export const MobileNav = ({
  routeInfo,
  hideGroupTitle,
  localization = true,
}: Props) => {
  const props = { routeInfo, hideGroupTitle, localization };

  const mobileNav = useStoreState(state => state.theme.mobileNav)
  const onMobileNavToggle = useStoreActions(actions => actions.theme.toggleMobileNav)

  const onClose = () => {
    onMobileNavToggle(false);
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      visible={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="between" alignItems="center">
          <Logo mobileLogo={true} />
          <div className="nav-close" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          <Scrollbars autoHide>
            <MenuContent type={NavType.SIDE} {...props} />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};

export default MobileNav;
