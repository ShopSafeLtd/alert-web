import React from 'react';
import { Avatar, Col, Dropdown, Row, Select, Switch, Typography } from 'antd';
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
import { useIntl } from 'react-intl';
import type { AvailableLanguages } from 'lang';

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

// interface MenuItem {
//   title: string;
//   icon: string;
//   path: string;
// }

// const menuItem: MenuItem[] = [
//   {
//     title: 'User Settings',
//     icon: '', // EditOutlined,
//     path: `${APP_PREFIX_PATH}/user-settings`,
//   },
//   {
//     title: 'Terms & Conditions',
//     icon: '', // EditOutlined,
//     path: `${APP_PREFIX_PATH}/user-settings/terms`,
//   },
// ];

export const NavProfile = () => {
  const { switcher, themes } = useThemeSwitcher();
  const classes = useStyles();
  const intl = useIntl();
  const name = useStoreState((state) => state.user.fullName);
  const email = useStoreState((state) => state.user.email);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  const switchLocale = useStoreActions((actions) => actions.theme.changeLocale);
  const locale = useStoreState((state) => state.theme.locale);
  const { signOut } = useAuth();
  const { logout } = useAuth0();

  const handleChangeLang = (value: AvailableLanguages) => {
    switchLocale(value as string);
    typedLocalStorage.set(LocalStorageKeys.lang, value as string);
  };
  // // TODO REMOVE
  // const profileMenu = (
  //   <div className="nav-profile nav-dropdown">
  //     <div className="nav-profile-header">
  //       <div className="d-flex" style={{ alignItems: 'center' }}>
  //         <Avatar
  //           style={{ backgroundColor: 'rgb(222, 68, 54)', minWidth: 35 }}
  //           size={35}
  //         >
  //           {name?.charAt(0)}
  //         </Avatar>
  //         <div className="pl-2">
  //           <h4 className="mb-0">{name}</h4>
  //           <span className="text-muted">{email}</span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="nav-profile-body">
  //       <Menu>
  //         {menuItem.map((el, i) => (
  //           <Menu.Item key={i}>
  //             <Link to={el.path}>
  //               <Row>
  //                 {/* <Icon className="mr-3" type={el.icon} /> */}
  //                 <span className="font-weight-normal">{el.title}</span>
  //               </Row>
  //             </Link>
  //           </Menu.Item>
  //         ))}
  //         <Menu.Item
  //           key={menuItem.length + 1}
  //           onClick={() => {
  //             signOut();
  //             logout({ returnTo: window.location.origin });
  //           }}
  //         >
  //           <Row>
  //             <LogoutOutlined className="mr-3" />
  //             <span className="font-weight-normal">
  //               {intl.formatMessage({
  //                 defaultMessage: 'Sign Out',
  //                 id: 'F62y+K',
  //               })}
  //             </span>
  //           </Row>
  //         </Menu.Item>
  //       </Menu>
  //     </div>
  //   </div>
  // );

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
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Theme Mode: ',
                      id: 'QAmP+7',
                    })}
                  </Typography.Text>
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
            key: 'lang',
            onClick: () => {},
            disabled: true,
            style: {
              padding: 0,
              cursor: 'default',
            },
            label: (
              <Row>
                <Select
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  defaultValue={locale as AvailableLanguages}
                  value={locale as AvailableLanguages}
                  bordered={false}
                  style={{ width: '100%', paddingLeft: 8 }}
                  onChange={handleChangeLang}
                  options={[
                    {
                      value: 'en',
                      label: intl.formatMessage({
                        defaultMessage: 'English 🇬🇧',
                        id: 'j66p6j',
                      }),
                    },
                    {
                      value: 'fr',
                      label: intl.formatMessage({
                        defaultMessage: 'French 🇫🇷',
                        id: '115KOd',
                      }),
                    },
                    {
                      value: 'de',
                      label: intl.formatMessage({
                        defaultMessage: 'German 🇩🇪',
                        id: 'SjSAxT',
                      }),
                    },
                    {
                      value: 'es',
                      label: intl.formatMessage({
                        defaultMessage: 'Spanish 🇪🇸',
                        id: 'B+T9Ie',
                      }),
                    },
                    {
                      value: 'dk',
                      label: intl.formatMessage({
                        defaultMessage: 'Danish 🇩🇰',
                        id: 'Xg7VWX',
                      }),
                    },
                    {
                      value: 'it',
                      label: intl.formatMessage({
                        defaultMessage: 'Italian 🇮🇹',
                        id: 'RVX8BX',
                      }),
                    },
                  ]}
                />
              </Row>
            ),
          },
          {
            key: '3',
            label: (
              <Link to={`${APP_PREFIX_PATH}/user-settings`}>
                <Row>
                  <span className="font-weight-normal">
                    {intl.formatMessage({
                      defaultMessage: 'User Settings',
                      id: 'jUes8R',
                    })}
                  </span>
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
                      {intl.formatMessage({
                        defaultMessage: 'Terms & Conditions',
                        id: 'arPp4e',
                      })}
                    </span>
                  </Col>
                </Row>
              </Link>
            ),
          },
          {
            key: '5',
            label: (
              <Row
                gutter={8}
                onClick={() => {
                  signOut();
                  logout({ returnTo: window.location.origin });
                }}
              >
                <Col>
                  <FontAwesomeIcon icon={faSignOut} />
                </Col>
                <Col>
                  <span className="font-weight-normal">
                    {intl.formatMessage({
                      defaultMessage: 'Sign Out',
                      id: 'F62y+K',
                    })}
                  </span>
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
