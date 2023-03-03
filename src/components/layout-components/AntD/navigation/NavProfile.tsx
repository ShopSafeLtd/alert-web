import React from 'react';
import { Avatar, Dropdown, Menu, Row, Switch, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from 'state';
import { useAuth } from 'hooks';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/pro-light-svg-icons';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { LocalStorageKeys, typedLocalStorage } from 'utils';

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

const menuItem: MenuItem[] = [
  {
    title: 'User Settings',
    icon: '', //EditOutlined,
    path: `${APP_PREFIX_PATH}/user-settings`,
  },
  {
    title: 'Terms & Conditions',
    icon: '', //EditOutlined,
    path: `${APP_PREFIX_PATH}/user-settings/terms`,
  },

  // {
  //   title: "Account Setting",
  //   icon: "", // SettingOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
  // {
  //   title: "Billing",
  //   icon: "", // ShopOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
  // {
  //   title: "Help Center",
  //   icon: "", // QuestionCircleOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
];

export const NavProfile = () => {
  const { switcher, themes } = useThemeSwitcher();

  const name = useStoreState((state) => state.user.fullName);
  const email = useStoreState((state) => state.user.email);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  const { signOut } = useAuth();
  const { logout } = useAuth0();

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex" style={{ alignItems: 'center' }}>
          <Avatar
            style={{ backgroundColor: 'rgb(222, 68, 54)', minWidth: 35 }}
            size={35}
          >
            {name?.charAt(0)}
          </Avatar>
          <div className="pl-2">
            <h4 className="mb-0">{name}</h4>
            <span className="text-muted">{email}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <div style={{ padding: '0 15px 10px' }}>
          <Typography.Text>Theme Mode: </Typography.Text>
          <Switch
            checkedChildren={<FontAwesomeIcon color="#F5F3CE" icon={faMoon} />}
            unCheckedChildren={
              <FontAwesomeIcon color="GoldenRod" icon={faSun} />
            }
            checked={currentTheme === 'dark'}
            onChange={(value) => {
              switchTheme(value ? 'dark' : 'light');
              typedLocalStorage.set(
                LocalStorageKeys.theme,
                value ? 'dark' : 'light'
              );

              switcher({ theme: value ? themes.dark : themes.light });
            }}
          />
        </div>
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <Link to={el.path}>
                  <Row>
                    {/* <Icon className="mr-3" type={el.icon} /> */}
                    <span className="font-weight-normal">{el.title}</span>
                  </Row>
                </Link>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key={menuItem.length + 1}
            onClick={() => {
              signOut();
              logout({ returnTo: window.location.origin });
            }}
          >
            <Row>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </Row>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="topRight" overlay={profileMenu} trigger={['click']}>
      <Menu
        className="d-flex align-item-center"
        mode="horizontal"
        style={{ width: '100%' }}
        items={[
          {
            key: 0,
            style: {
              width: '100%',
            },
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: 'rgb(222, 68, 54)',
                    marginRight: 10,
                  }}
                >
                  {name?.charAt(0)}
                </Avatar>
                <Typography.Text className="mb-0">{name}</Typography.Text>
              </div>
            ),
          },
        ]}
      />
    </Dropdown>
  );
};

export default NavProfile;
