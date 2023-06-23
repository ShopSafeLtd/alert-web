import React from 'react';
import { Avatar, Col, Dropdown, Menu, Row, Switch, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from 'state';
import { useAuth } from 'hooks';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileContract,
  faMoon,
  faSignOut,
  faSun,
} from '@fortawesome/pro-light-svg-icons';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { LocalStorageKeys, typedLocalStorage } from 'utils';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

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
    paddingTop: 10,
    paddingBottom: 10,
    borderRight: `1px solid ${theme.borderColor}`,
  },
}));

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
];

export const NavProfile = () => {
  const { switcher, themes } = useThemeSwitcher();
  const classes = useStyles();

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
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            label: (
              <Row>
                <Col>
                  <Avatar
                    style={{
                      backgroundColor: 'rgb(222, 68, 54)',
                      minWidth: 35,
                    }}
                    size={35}
                  >
                    {name?.charAt(0)}
                  </Avatar>
                </Col>
                <Col>
                  <div className="pl-2">
                    <h4 className="mb-0">{name}</h4>
                    <span className="text-muted">{email}</span>
                  </div>
                </Col>
              </Row>
            ),
          },
          {
            key: '2',
            label: (
              <Row gutter={8}>
                <Col>
                  <Typography.Text>Theme Mode: </Typography.Text>
                </Col>
                <Col>
                  <Switch
                    checkedChildren={
                      <FontAwesomeIcon color="#F5F3CE" icon={faMoon} />
                    }
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
                      document.documentElement.setAttribute(
                        'style',
                        `color-scheme: ${value ? 'dark' : 'light'}`
                      );
                      switcher({ theme: value ? themes.dark : themes.light });
                    }}
                  />
                </Col>
              </Row>
            ),
          },
          {
            key: '3',
            label: (
              <Link to={`${APP_PREFIX_PATH}/user-settings`}>
                <Row>
                  <span className="font-weight-normal">User Settings</span>
                </Row>
              </Link>
            ),
          },
          {
            key: '4',
            label: (
              <Link to={`${APP_PREFIX_PATH}/user-settings/terms`}>
                <Row gutter={8}>
                  <Col>
                    <FontAwesomeIcon icon={faFileContract} />
                  </Col>
                  <Col>
                    <span className="font-weight-normal">
                      Terms & Conditions
                    </span>
                  </Col>
                </Row>
              </Link>
            ),
          },
          {
            key: '5',
            label: (
              <Row gutter={8}>
                <Col>
                  <FontAwesomeIcon icon={faSignOut} />
                </Col>
                <Col>
                  <span className="font-weight-normal">Sign Out</span>
                </Col>
              </Row>
            ),
          },
        ],
      }}
      placement="topRight"
    >
      <div className={classes.notificationCol}>
        <Avatar
          size="small"
          style={{
            backgroundColor: 'rgb(222, 68, 54)',
            marginRight: 10,
          }}
        >
          {name?.charAt(0)}
        </Avatar>
      </div>
    </Dropdown>
  );
};

export default NavProfile;
