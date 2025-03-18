/* eslint-disable */
// TODO add eslint
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Col, Drawer, Grid, Menu, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NavItem } from 'configs/NavigationConfig';
import navConfig, { BadgeTypes } from 'configs/NavigationConfig';
import utils from 'utils';
import type { NavType } from 'state';
import { SideNavTheme, useStoreActions, useStoreState } from 'state';
import { APP_NAME } from 'configs/AppConfig';
import NavScheme from './NavScheme';
import NavProfile from './NavProfile';
import Logo from './Logo';
import IntlMessage from '../../../util-components/AntD/IntlMessage';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import NotificationsDrawer from 'components/notifications/NotificationsDrawer/NotificationDrawer.container';
import ReportOnlyNavigationConfig from 'configs/ReportOnlyNavigationConfig';
import { useAtomValue } from 'jotai/index';
import { isAdminAtom } from '#/providers/SchemeProvider/SchemeProvider';

const useStyles = createUseStyles((theme: Theme) => ({
  notificationCol: {
    borderBottom: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
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

const Icon = ({ icon }: { icon: any }) => (
  <FontAwesomeIcon
    fixedWidth
    icon={icon}
    style={{ fontSize: 18, marginRight: 10, marginBottom: -3 }}
  />
);
const SubIcon = ({ icon }: { icon: any }) => (
  <FontAwesomeIcon
    icon={icon}
    fixedWidth
    style={{ fontSize: 18, marginRight: 10, width: 22, marginLeft: 10 }}
    size="lg"
  />
);

interface SideNavContentProps {
  sideNavTheme: SideNavTheme;
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
  localization: boolean;
  todos: number;
  notifications: number;
  messages: number;
  onMobileNavToggle(value: boolean): void;
}

interface GetLogoArgs {
  navCollapsed: boolean;
  logoType?: string;
}

const getLogo = (props: GetLogoArgs) => {
  const { navCollapsed, logoType } = props;
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

const SideNavContent = (props: SideNavContentProps) => {
  const classes = useStyles();
  const isAdmin = useAtomValue(isAdminAtom);

  const {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
    localization,
    onMobileNavToggle,
    todos,
    notifications,
    messages,
  } = props;

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const { id: schemeId } = useStoreState((state) => state.scheme);
  const { id: userId, dem, schemes } = useStoreState((state) => state.user);

  const permissions =
    schemes
      .find((scheme) => scheme.scheme.id === schemeId)
      ?.permissions.filter((permItem) => permItem.allowedMethods.length > 0)
      .map(({ model }) => model) || [];

  const { reportOnly } = useStoreState((state) => state.scheme);

  const getNavigationConfig = () => {
    if (!isAdmin && reportOnly) {
      return ReportOnlyNavigationConfig;
    }

    return navConfig;
  };
  const navigationConfig = getNavigationConfig();

  const variables = {
    where: {
      id: userId,
    },
  };

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotificationOpen = () => setNotificationsOpen(!notificationsOpen);
  // ???
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };

  const customLogo = !!window.localStorage.getItem('logo');

  const getBadgeCount = {
    [BadgeTypes.todo]: todos,
    [BadgeTypes.notification]: notifications,
    [BadgeTypes.message]: messages,
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <Logo logoType="default" />
      <Menu
        theme={sideNavTheme === SideNavTheme.LIGHT ? 'light' : 'dark'}
        mode="inline"
        style={{ flex: 1, borderRight: 0 }}
        defaultSelectedKeys={[routeInfo?.key]}
        defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
        className={
          hideGroupTitle
            ? 'hide-group-title nav-menu-overflowed'
            : 'nav-menu-overflowed'
        }
      >
        {navigationConfig
          .filter((el) => (el.requireDemId ? dem.length > 0 : true))
          .filter((el) =>
            el.childPermissions
              ? el.childPermissions.some((childPermission) =>
                  permissions.includes(childPermission)
                )
              : true
          )
          .filter((el) =>
            el.permission
              ? el.permission.some((i) => permissions.includes(i.model))
              : true
          )
          .map((menu) =>
            menu.submenu.length > 0 ? (
              <Menu.SubMenu
                key={menu.key}
                icon={<Icon icon={menu.icon} />}
                title={setLocale(localization, menu.intl.id)}
              >
                {menu.submenu
                  .filter((el) =>
                    el.permission
                      ? el.permission.some((i) => permissions.includes(i.model))
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
                    offset={[9, 0]}
                    size="small"
                    count={getBadgeCount[menu.badge]}
                    showZero
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
      <NavScheme />
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <NavProfile />
        </Col>
        <Col
          span={12}
          className={classes.notificationCol}
          onClick={toggleNotificationOpen}
        >
          <Badge offset={[8, 0]} size="small" count={notifications}>
            <FontAwesomeIcon size="xl" icon={faBell} />
          </Badge>
        </Col>
      </Row>
      {customLogo && (
        <img
          src={getLogo({
            logoType: currentTheme,
            navCollapsed: false,
          })}
          alt={`${APP_NAME} logo`}
          style={{
            width: 100,
            marginLeft: 20,
            marginTop: 15,
            marginBottom: 15,
          }}
        />
      )}

      <Drawer
        title="Notifications"
        width={600}
        onClose={toggleNotificationOpen}
        open={notificationsOpen}
        bodyStyle={{ padding: 0, colorScheme: currentTheme }}
      >
        {notificationsOpen && (
          <NotificationsDrawer onClose={toggleNotificationOpen} />
        )}
      </Drawer>
    </div>
  );
};

interface Props {
  localization: boolean;
  type: NavType;
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
}

const MenuContent = (props: Props) => {
  const sideNavTheme = useStoreState((state) => state.theme.sideNavTheme);

  const onMobileNavToggle = useStoreActions(
    (actions) => actions.theme.toggleMobileNav
  );
  const userTodos = useStoreState((state) => state.user.userTodos);
  const userNotifications = useStoreState(
    (state) => state.user.userNotifications
  );
  const userMessages = useStoreState((state) => state.user.userMessages);
  const [todoCount, setTodoCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    setTodoCount(userTodos || 0);
  }, [userTodos]);

  useEffect(() => {
    setNotificationCount(userNotifications || 0);
  }, [userNotifications]);

  useEffect(() => {
    setMessageCount(userMessages || 0);
  }, [userMessages]);

  return (
    <SideNavContent
      {...props}
      todos={todoCount}
      notifications={notificationCount}
      messages={messageCount}
      onMobileNavToggle={onMobileNavToggle}
      sideNavTheme={sideNavTheme}
    />
  );
};

export default MenuContent;
