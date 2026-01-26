import type { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import type { MenuItem, NavItem, SubMenuItem } from 'configs/NavigationConfig';
import type { Theme } from 'configs/ThemeConfig';
import type { NavType, SideNavTheme } from 'state';

import { mobileNavOpenAtom } from '#/components/layout-components/AntD/navigation/MobileNav';
import NavTranslations from '#/components/layout-components/AntD/navigation/NavTranslations';
import { filterNavigationBySchemeType } from '#/configs/utils/filterNavigationBySchemeType';
import {
  currentPermissionsAtom,
  schemeTypeAtom,
  settingSchemeAtom,
  userNotificationsAtom,
  userTodosAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Col, Drawer, Grid, Row, Skeleton } from 'antd';
import NotificationsDrawer from 'components/notifications/NotificationsDrawer/NotificationDrawer.container';
import navConfig, { BadgeTypes } from 'configs/NavigationConfig';
import { useAtomValue, useSetAtom } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import utils from 'utils';

import IntlMessage from '../../../util-components/AntD/IntlMessage';
import Logo from './Logo';
import NavProfile from './NavProfile';
import NavScheme from './NavScheme';

const THEME_LIGHT_HOVER_BG = 'rgba(0, 0, 0, 0.04)';
const TRANSFORM_HOVER = 'translateX(2px)';
const TRANSITION_ALL = 'all 0.2s ease';

const useStyles = createUseStyles((theme: Theme) => ({
  bottomMenuCol: {
    '&:hover': {
      '& $bottomMenuColContent': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.itemHoverBackground
            : THEME_LIGHT_HOVER_BG,
        transform: TRANSFORM_HOVER,
      },
    },
  },
  bottomMenuColContent: {
    alignItems: 'center',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    marginBottom: 2,
    padding: '8px 12px',
    transition: TRANSITION_ALL,
    width: '100%',
  },
  bottomMenuItem: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : THEME_LIGHT_HOVER_BG,
      transform: TRANSFORM_HOVER,
    },
    alignItems: 'center',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    marginBottom: 4,
    padding: '8px 12px',
    transition: TRANSITION_ALL,
    width: '100%',
  },
  bottomMenuSection: {
    marginTop: 'auto',
    padding: '8px 12px',
  },
  menuItem: {
    '&.active': {
      '& $menuItemIcon': {
        color: theme.primary,
      },
      '& $menuItemText': {
        color: theme.primary,
        fontWeight: 600,
      },
      backgroundColor: `${theme.primary}15`,
      paddingLeft: 19,
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : THEME_LIGHT_HOVER_BG,
      transform: TRANSFORM_HOVER,
    },
    alignItems: 'center',
    borderRadius: 8,
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: 1,
    padding: '8px 16px',
    textDecoration: 'none',
    transition: TRANSITION_ALL,
  },
  menuItemBadge: {
    marginLeft: 'auto',
  },
  menuItemIcon: {
    color: theme.secondaryText,
    fontSize: 16,
    marginRight: 12,
    textAlign: 'center',
    transition: 'color 0.2s ease',
    width: 20,
  },
  menuItemText: {
    color: theme.headerColor,
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    transition: TRANSITION_ALL,
  },
  menuItemTextSmall: {
    color:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.85)'
        : theme.secondaryText,
    fontSize: 13,
    fontWeight: 400,
    transition: TRANSITION_ALL,
  },
  menuSection: {
    marginBottom: 2,
  },
  menuSectionTitle: {
    color: theme.secondaryText,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.5px',
    marginBottom: 4,
    padding: '8px 16px 4px',
    textTransform: 'uppercase',
  },
  subMenuItem: {
    '&.active': {
      '& $menuItemTextSmall': {
        color: theme.primary,
        fontWeight: 600,
      },
      '&::before': {
        backgroundColor: theme.primary,
      },
      backgroundColor: `${theme.primary}08`,
      paddingLeft: 51,
    },
    '&::before': {
      backgroundColor: theme.borderColor,
      borderRadius: '50%',
      content: '""',
      height: 4,
      left: 32,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'background-color 0.2s ease',
      width: 4,
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : THEME_LIGHT_HOVER_BG,
      transform: TRANSFORM_HOVER,
    },
    alignItems: 'center',
    borderRadius: 8,
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: 1,
    padding: '6px 16px 6px 48px',
    position: 'relative',
    textDecoration: 'none',
    transition: TRANSITION_ALL,
  },
  subSubMenuItem: {
    '&.active': {
      '& $menuItemTextSmall': {
        color: theme.primary,
        fontWeight: 600,
      },
      '&::before': {
        backgroundColor: theme.primary,
      },
      backgroundColor: `${theme.primary}05`,
      paddingLeft: 67,
    },
    '&::before': {
      backgroundColor: theme.borderColor,
      borderRadius: '50%',
      content: '""',
      height: 3,
      left: 48,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'background-color 0.2s ease',
      width: 3,
    },
    '&:hover': {
      '& $menuItemTextSmall': {
        color: theme.primary,
      },
      '&::before': {
        backgroundColor: theme.primary,
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : THEME_LIGHT_HOVER_BG,
      transform: TRANSFORM_HOVER,
    },
    alignItems: 'center',
    borderRadius: 8,
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: 1,
    padding: '6px 16px 6px 64px',
    position: 'relative',
    textDecoration: 'none',
    transition: TRANSITION_ALL,
  },
  treeMenu: {
    borderRight: 0,
    flex: 1,
    overflow: 'auto',
    padding: '8px 12px',
  },
}));

const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn: boolean, localeKey: string) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const Icon = ({
  className,
  icon,
}: {
  className?: string;
  icon: IconDefinition;
}) => <FontAwesomeIcon className={className} fixedWidth icon={icon} />;

const TreeMenuItem = ({
  classes,
  getBadgeCount,
  isActive,
  item,
  level = 0,
  localization,
  onItemClick,
}: {
  classes: ReturnType<typeof useStyles>;
  getBadgeCount: Record<BadgeTypes, number>;
  isActive: boolean;
  item: MenuItem | NavItem | SubMenuItem;
  level?: number;
  localization: boolean;
  onItemClick: () => void;
}) => {
  const getItemClass = () => {
    if (level === 0) return classes.menuItem;
    if (level === 1) return classes.subMenuItem;
    return classes.subSubMenuItem;
  };

  const getTextClass = () => {
    if (level === 0) return classes.menuItemText;
    return classes.menuItemTextSmall;
  };

  const content = (
    <div className={`${getItemClass()} ${isActive ? 'active' : ''}`}>
      {item.icon && level === 0 && (
        <Icon className={classes.menuItemIcon} icon={item.icon} />
      )}
      <span className={getTextClass()}>
        {setLocale(localization, item.intl.id)}
      </span>
      {item.badge && getBadgeCount[item.badge] > 0 && (
        <Badge
          className={classes.menuItemBadge}
          count={getBadgeCount[item.badge]}
          size="small"
        />
      )}
    </div>
  );

  return item.path ? (
    <Link
      onClick={onItemClick}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={item.path}
    >
      {content}
    </Link>
  ) : (
    content
  );
};

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
  localization,
  messages,
  notifications,
  routeInfo,
  todos,
}: SideNavContentProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const setMobileNavOpen = useSetAtom(mobileNavOpenAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const schemeType = useAtomValue(schemeTypeAtom);
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
        <div className={classes.treeMenu}>
          {filterNavigationBySchemeType(navigationConfig, schemeType)
            .filter((el) =>
              el.permission
                ? hasPermission({ permission: el.permission, permissions })
                : true
            )
            .map((menu) => {
              const isMainActive =
                routeInfo?.key === menu.key ||
                routeInfo?.key?.startsWith(`${menu.key}-`);

              return (
                <div className={classes.menuSection} key={menu.key}>
                  <TreeMenuItem
                    classes={classes}
                    getBadgeCount={getBadgeCount}
                    isActive={isMainActive && menu.submenu.length === 0}
                    item={menu}
                    level={0}
                    localization={localization}
                    onItemClick={closeMobileNav}
                  />

                  {menu.submenu.length > 0 && (
                    <div>
                      {menu.submenu
                        .filter((el) =>
                          el.permission
                            ? hasPermission({
                                permission: el.permission,
                                permissions,
                              })
                            : true
                        )
                        .map((subMenuFirst) => {
                          const isSubActive =
                            routeInfo?.key === subMenuFirst.key ||
                            routeInfo?.key?.startsWith(`${subMenuFirst.key}-`);

                          return (
                            <div key={subMenuFirst.key}>
                              <TreeMenuItem
                                classes={classes}
                                getBadgeCount={getBadgeCount}
                                isActive={
                                  isSubActive &&
                                  subMenuFirst.submenu.length === 0
                                }
                                item={subMenuFirst}
                                level={1}
                                localization={localization}
                                onItemClick={closeMobileNav}
                              />

                              {subMenuFirst.submenu.length > 0 && (
                                <div>
                                  {subMenuFirst.submenu.map((subMenuSecond) => {
                                    const isSubSubActive =
                                      routeInfo?.key === subMenuSecond.key;

                                    return (
                                      <TreeMenuItem
                                        classes={classes}
                                        getBadgeCount={getBadgeCount}
                                        isActive={isSubSubActive}
                                        item={subMenuSecond}
                                        key={subMenuSecond.key}
                                        level={2}
                                        localization={localization}
                                        onItemClick={closeMobileNav}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
      <div className={classes.bottomMenuSection}>
        <NavScheme />

        <Row style={{ width: '100%' }}>
          <Col className={classes.bottomMenuCol} span={8}>
            <NavProfile />
          </Col>
          <Col className={classes.bottomMenuCol} span={8}>
            <div className={classes.bottomMenuColContent}>
              <NavTranslations />
            </div>
          </Col>
          <Col className={classes.bottomMenuCol} span={8}>
            <div
              className={classes.bottomMenuColContent}
              onClick={toggleNotificationOpen}
              style={{ cursor: 'pointer' }}
            >
              <Badge count={notifications} offset={[8, 0]} size="small">
                <FontAwesomeIcon icon={faBell} size="xl" />
              </Badge>
            </div>
          </Col>
        </Row>
      </div>
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
