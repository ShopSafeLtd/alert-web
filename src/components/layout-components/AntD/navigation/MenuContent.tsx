import type { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import type { NavItem } from 'configs/NavigationConfig';
import type { Theme } from 'configs/ThemeConfig';
import type { NavType } from 'state';

import { mobileNavOpenAtom } from '#/components/layout-components/AntD/navigation/MobileNav';
import NavTranslations from '#/components/layout-components/AntD/navigation/NavTranslations';
import {
  currentPermissionsAtom,
  settingSchemeAtom,
  userNotificationsAtom,
  userTodosAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Col, Drawer, Grid, Menu, Row, Skeleton } from 'antd';
import NotificationsDrawer from 'components/notifications/NotificationsDrawer/NotificationDrawer.container';
import navConfig, { BadgeTypes } from 'configs/NavigationConfig';
import { useAtomValue, useSetAtom } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { SideNavTheme, useStoreState } from 'state';
import utils from 'utils';

import IntlMessage from '../../../util-components/AntD/IntlMessage';
import Logo from './Logo';
import NavProfile from './NavProfile';
import NavScheme from './NavScheme';

const useStyles = createUseStyles((theme: Theme) => ({
  notificationCol: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn: boolean, localeKey: string) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key: string) => {
  const keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (const [index, elm] of arr.entries()) {
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      // ???
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      keyList.push(keyString);
    }
  }
  return keyList;
};

const Icon = ({ icon }: { icon: IconDefinition }) => (
  <FontAwesomeIcon
    fixedWidth
    icon={icon}
    style={{ fontSize: 18, marginBottom: -3, marginRight: 10 }}
  />
);
const SubIcon = ({ icon }: { icon: IconDefinition }) => (
  <FontAwesomeIcon
    fixedWidth
    icon={icon}
    size="lg"
    style={{ fontSize: 18, marginLeft: 10, marginRight: 10, width: 22 }}
  />
);

interface SideNavContentProps {
  hideGroupTitle?: boolean;
  localization: boolean;
  messages: number;
  notifications: number;
  onMobileNavToggle(value: boolean): void;
  routeInfo: NavItem;
  sideNavTheme: SideNavTheme;

  todos: number;
}

interface GetLogoArgs {
  logoType?: string;
  navCollapsed: boolean;
}

const getLogo = (props: GetLogoArgs) => {
  const { logoType, navCollapsed } = props;
  if (logoType === 'light') {
    if (navCollapsed) {
      return '/img/logo-sm.svg';
    }
    return '/img/dark-logo.svg';
  }

  if (navCollapsed) {
    return '/img/logo.png';
  }
  return '/img/light-logo.svg';
};

const SideNavContent = ({
  hideGroupTitle,
  localization,
  messages,
  notifications,
  routeInfo,
  sideNavTheme,
  todos,
}: SideNavContentProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const setMobileNavOpen = useSetAtom(mobileNavOpenAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const settingScheme = useAtomValue(settingSchemeAtom);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const [navigationConfig] = useState<NavItem[]>(navConfig);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotificationOpen = () => setNotificationsOpen(!notificationsOpen);
  // ???
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('xl');
  const closeMobileNav = () => {
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  const customLogo = !!window.localStorage.getItem('logo');

  const getBadgeCount = {
    [BadgeTypes.message]: messages,
    [BadgeTypes.notification]: notifications,
    [BadgeTypes.todo]: todos,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {!isMobile && (
        <Link to="/app/dashboard">
          <Logo logoType="default" />
        </Link>
      )}
      {settingScheme ? (
        <div style={{ borderRight: 0, flex: 1, padding: 10 }}>
          <Skeleton.Button
            style={{ height: 45, marginBottom: 10, width: 150 }}
          />
          <Skeleton.Button
            style={{ height: 45, marginBottom: 10, width: 150 }}
          />
          <Skeleton.Button
            style={{ height: 45, marginBottom: 10, width: 150 }}
          />
          <Skeleton.Button
            style={{ height: 45, marginBottom: 10, width: 150 }}
          />
          <Skeleton.Button
            style={{ height: 45, marginBottom: 10, width: 150 }}
          />
        </div>
      ) : (
        <Menu
          className={
            hideGroupTitle
              ? 'hide-group-title nav-menu-overflowed'
              : 'nav-menu-overflowed'
          }
          defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
          defaultSelectedKeys={[routeInfo?.key]}
          mode="inline"
          style={{ borderRight: 0, flex: 1 }}
          theme={sideNavTheme === SideNavTheme.LIGHT ? 'light' : 'dark'}
        >
          {navigationConfig
            .filter((el) =>
              el.permission
                ? hasPermission({ permission: el.permission, permissions })
                : true
            )
            .map((menu) =>
              menu.submenu.length > 0 ? (
                <Menu.SubMenu
                  icon={<Icon icon={menu.icon} />}
                  key={menu.key}
                  title={setLocale(localization, menu.intl.id)}
                >
                  {menu.submenu
                    .filter((el) =>
                      el.permission
                        ? hasPermission({
                            permission: el.permission,
                            permissions,
                          })
                        : true
                    )
                    .map((subMenuFirst) =>
                      subMenuFirst.submenu.length > 0 ? (
                        <SubMenu
                          icon={
                            subMenuFirst.icon ? (
                              <Icon icon={subMenuFirst?.icon} />
                            ) : null
                          }
                          key={subMenuFirst.key}
                          title={setLocale(localization, subMenuFirst.intl.id)}
                        >
                          {subMenuFirst.submenu.map((subMenuSecond) => (
                            <Menu.Item key={subMenuSecond.key}>
                              {subMenuSecond.icon ? (
                                <Icon icon={subMenuSecond?.icon} />
                              ) : null}
                              <span>
                                {setLocale(localization, subMenuSecond.intl.id)}
                              </span>
                              <Link
                                onClick={() => closeMobileNav()}
                                to={subMenuSecond.path}
                              />
                            </Menu.Item>
                          ))}
                        </SubMenu>
                      ) : (
                        <Menu.Item
                          key={subMenuFirst.key}
                          style={{ paddingLeft: 15 }}
                        >
                          {subMenuFirst.icon ? (
                            <SubIcon icon={subMenuFirst.icon} />
                          ) : null}
                          <span>
                            {setLocale(localization, subMenuFirst.intl.id)}
                          </span>
                          <Link
                            onClick={() => closeMobileNav()}
                            to={subMenuFirst.path}
                          />
                        </Menu.Item>
                      )
                    )}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={menu.key}>
                  {menu.icon ? <Icon icon={menu?.icon} /> : null}
                  {menu.badge && getBadgeCount[menu.badge] > 0 ? (
                    <Badge
                      count={getBadgeCount[menu.badge]}
                      offset={[9, 0]}
                      showZero
                      size="small"
                      style={{ height: 20, padding: 3 }}
                    >
                      <span>{setLocale(localization, menu?.intl.id)}</span>
                    </Badge>
                  ) : (
                    <span>{setLocale(localization, menu?.intl.id)}</span>
                  )}
                  {menu.path ? (
                    <Link onClick={() => closeMobileNav()} to={menu.path} />
                  ) : null}
                </Menu.Item>
              )
            )}
        </Menu>
      )}
      {!isMobile && (
        <>
          <NavScheme />
          <NavTranslations />
        </>
      )}
      {isMobile && (
        <Row style={{ width: '100%' }}>
          <Col span={12}>
            <NavScheme />
          </Col>
          <Col span={12}>
            <NavTranslations />
          </Col>
        </Row>
      )}

      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <NavProfile />
        </Col>
        <Col
          className={classes.notificationCol}
          onClick={toggleNotificationOpen}
          span={12}
        >
          <Badge count={notifications} offset={[8, 0]} size="small">
            <FontAwesomeIcon icon={faBell} size="xl" />
          </Badge>
        </Col>
      </Row>
      {customLogo && !isMobile && (
        <img
          alt={intl.formatMessage({ defaultMessage: 'Alert Logo' })}
          src={getLogo({
            logoType: currentTheme,
            navCollapsed: false,
          })}
          style={{
            marginBottom: 15,
            marginLeft: 20,
            marginTop: 15,
            width: 100,
          }}
        />
      )}

      <Drawer
        bodyStyle={{ colorScheme: currentTheme, padding: 0 }}
        onClose={toggleNotificationOpen}
        open={notificationsOpen}
        title={<FormattedMessage defaultMessage="Notifications" />}
        width={600}
      >
        {notificationsOpen && (
          <NotificationsDrawer onClose={toggleNotificationOpen} />
        )}
      </Drawer>
    </div>
  );
};

interface Props {
  hideGroupTitle?: boolean;
  localization: boolean;
  routeInfo: NavItem;
  type: NavType;
}

const MenuContent = (props: Props) => {
  const sideNavTheme = useStoreState((state) => state.theme.sideNavTheme);

  const setMobileNavOpen = useSetAtom(mobileNavOpenAtom);

  const onMobileNavToggle = () => {
    setMobileNavOpen(false);
  };
  const userTodos = useAtomValue(userTodosAtom);
  const userMessages = useAtomValue(currentUserAtom)?.messageCount ?? 0;
  const userNotifications = useAtomValue(userNotificationsAtom);
  const [todoCount, setTodoCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    setTodoCount(userTodos || 0);
  }, [userTodos]);

  useEffect(() => {
    setNotificationCount(userNotifications ?? 0);
  }, [userNotifications]);

  useEffect(() => {
    setMessageCount(userMessages || 0);
  }, [userMessages]);

  return (
    <SideNavContent
      {...props}
      messages={messageCount}
      notifications={notificationCount}
      onMobileNavToggle={onMobileNavToggle}
      sideNavTheme={sideNavTheme}
      todos={todoCount}
    />
  );
};

export default MenuContent;
