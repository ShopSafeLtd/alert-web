/* eslint-disable */
import React from 'react';
import { Button, Drawer } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent';
import Flex from 'components/shared-components/AntD/Flex';
import { NavType } from 'state';
import { NavItem } from 'configs/NavigationConfig';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtom, atom } from 'jotai/index';

export const mobileNavOpenAtom = atom<boolean>(false);

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

  const [mobileNavOpen, setMobileNavOpen] = useAtom(mobileNavOpenAtom);

  const onClose = () => {
    setMobileNavOpen(false);
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      width={250}
      open={mobileNavOpen}
      bodyStyle={{ padding: 5, position: 'relative' }}
    >
      <Flex flexDirection="column" className="h-100">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '14px 6px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <Button type="text" className="nav-close" onClick={() => onClose()}>
            <FontAwesomeIcon size="lg" icon={faArrowLeft} />
          </Button>
        </div>
        <div className="mobile-nav-menu" style={{ paddingTop: 50 }}>
          <Scrollbars autoHide>
            <MenuContent type={NavType.SIDE} {...props} />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};

export default MobileNav;
