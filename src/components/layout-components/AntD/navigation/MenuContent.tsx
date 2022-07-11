import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntlMessage from '../../../util-components/AntD/IntlMessage';
import navConfig, { NavItem } from 'configs/NavigationConfig';
import utils from 'utils';
import { useStoreState, useStoreActions, NavType, SideNavTheme } from 'state';
import { APP_NAME } from 'configs/AppConfig';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn: boolean, localeKey: string) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key: string) => {
  let keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const Icon = ({ icon }: { icon: any }) => (
  <FontAwesomeIcon
    icon={icon}
    style={{ fontSize: 22, marginRight: 10, marginBottom: -3 }}
  />
);
const SubIcon = ({ icon }: { icon: any }) => (
  <FontAwesomeIcon icon={icon} style={{ fontSize: 14, marginRight: 5 }} />
);

interface SideNavContentProps {
  sideNavTheme: SideNavTheme;
  routeInfo: NavItem;
  hideGroupTitle?: boolean;
  localization: boolean;
  onMobileNavToggle(value: boolean): void;
}

const SideNavContent = (props: SideNavContentProps) => {
  const {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
    localization,
    onMobileNavToggle,
  } = props;

  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };

  const userRole = useStoreState((state) => state.user.role);
  const navigationConfig =
    userRole === 'SCHEME_ADMIN'
      ? navConfig
      : navConfig.filter((el) => el.title !== 'sidenav.scheme');

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
      <Menu
        theme={sideNavTheme === SideNavTheme.LIGHT ? 'light' : 'dark'}
        mode="inline"
        style={{ flex: 1, borderRight: 0 }}
        defaultSelectedKeys={[routeInfo?.key]}
        defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
        className={hideGroupTitle ? 'hide-group-title' : ''}
      >
        {navigationConfig.map((menu) =>
          menu.submenu.length > 0 ? (
            <Menu.SubMenu
              key={menu.key}
              icon={<Icon icon={menu.icon} />}
              title={setLocale(localization, menu.title)}
            >
              {menu.submenu.map((subMenuFirst) =>
                subMenuFirst.submenu.length > 0 ? (
                  <SubMenu
                    icon={
                      subMenuFirst.icon ? (
                        <Icon icon={subMenuFirst?.icon} />
                      ) : null
                    }
                    key={subMenuFirst.key}
                    title={setLocale(localization, subMenuFirst.title)}
                  >
                    {subMenuFirst.submenu.map((subMenuSecond) => (
                      <Menu.Item key={subMenuSecond.key}>
                        {subMenuSecond.icon ? (
                          <Icon icon={subMenuSecond?.icon} />
                        ) : null}
                        <span>
                          {setLocale(localization, subMenuSecond.title)}
                        </span>
                        <Link
                          onClick={() => closeMobileNav()}
                          to={subMenuSecond.path}
                        />
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={subMenuFirst.key} style={{ paddingLeft: 15 }}>
                    {subMenuFirst.icon ? (
                      <SubIcon icon={subMenuFirst.icon} />
                    ) : null}
                    <span>{setLocale(localization, subMenuFirst.title)}</span>
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
              <span>{setLocale(localization, menu?.title)}</span>
              {menu.path ? (
                <Link onClick={() => closeMobileNav()} to={menu.path} />
              ) : null}
            </Menu.Item>
          )
        )}
      </Menu>
      <span style={{ padding: '12px' }}>
        Copyright &copy; {`${new Date().getFullYear()}`} <br />
        <span className="font-weight-semibold">{`${APP_NAME}`}</span> <br />
        All rights reserved.
      </span>
    </div>
  );
};

interface TopNavContentProps {
  topNavColor: string;
  localization: boolean;
}

const TopNavContent = (props: TopNavContentProps) => {
  const { topNavColor, localization } = props;

  const userRole = useStoreState((state) => state.user.role);
  const navigationConfig =
    userRole === 'SCHEME_ADMIN'
      ? navConfig
      : navConfig.filter((el) => el.title !== 'sidenav.scheme');
  return (
    <Menu mode="horizontal" style={{ backgroundColor: topNavColor }}>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName="top-nav-menu"
            title={
              <span>
                {menu.icon ? <Icon icon={menu?.icon} /> : null}
                <span>{setLocale(localization, menu.title)}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  icon={
                    subMenuFirst.icon ? (
                      <Icon icon={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon icon={subMenuFirst?.icon} />
                  ) : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon icon={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
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
  const topNavColor = useStoreState((state) => state.theme.topNavColor);
  const onMobileNavToggle = useStoreActions(
    (actions) => actions.theme.toggleMobileNav
  );

  return props.type === NavType.SIDE ? (
    <SideNavContent
      {...props}
      onMobileNavToggle={onMobileNavToggle}
      sideNavTheme={sideNavTheme}
    />
  ) : (
    <TopNavContent topNavColor={topNavColor} {...props} />
  );
};

export default MenuContent;
