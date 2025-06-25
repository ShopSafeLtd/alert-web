import type { Theme } from 'configs/ThemeConfig';

import { useSignOut } from '#/hooks/signOut';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faCog,
  faFileContract,
  faMoon,
  faSignOut,
  faSun,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Dropdown, Row, Switch } from 'antd';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import { LocalStorageKeys, typedLocalStorage } from 'utils';

const useStyles = createUseStyles((theme: Theme) => ({
  dropdownContainer: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.5)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
    minWidth: 280,
    overflow: 'hidden',
  },
  menuItem: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.04)',
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: 12,
    padding: '12px 16px',
    transition: 'all 0.2s ease',
  },
  menuItemIcon: {
    color: theme.secondaryText,
    fontSize: 16,
    textAlign: 'center',
    width: 20,
  },
  menuItemText: {
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 500,
  },
  menuStyle: {
    '& .ant-dropdown-menu-item': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      padding: '0',
    },
    border: 'none',
    borderRadius: 12,
    boxShadow: 'none',
    padding: 0,
  },
  profileContainer: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
      transform: 'translateX(2px)',
    },
    alignItems: 'center',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    padding: '4px',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  signOutIcon: {
    fontSize: 16,
    textAlign: 'center',
    width: 20,
  },
  signOutItem: {
    '&:hover': {
      backgroundColor: 'rgba(255, 77, 79, 0.1)',
    },
    alignItems: 'center',
    color: '#ff4d4f',
    cursor: 'pointer',
    display: 'flex',
    gap: 12,
    padding: '12px 16px',
    transition: 'all 0.2s ease',
  },
  signOutText: {
    fontSize: 14,
    fontWeight: 500,
  },
  themeToggle: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.04)',
    },
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderTop: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    transition: 'all 0.2s ease',
  },
  themeToggleText: {
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 500,
  },
  userEmail: {
    color: theme.secondaryText,
    fontSize: 13,
  },
  userHeader: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '16px',
  },
  userName: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
  },
}));

export const NavProfile = () => {
  const { switcher, themes } = useThemeSwitcher();
  const classes = useStyles();
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);
  const name = currentUser?.fullName ?? '';
  const email = currentUser?.email ?? '';
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  const { signOut } = useSignOut();

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    switchTheme(newTheme);
    typedLocalStorage.set(LocalStorageKeys.theme, newTheme);
    document.documentElement.setAttribute('style', `color-scheme: ${newTheme}`);
    switcher({ theme: newTheme === 'dark' ? themes.dark : themes.light });
  };

  return (
    <Dropdown
      dropdownRender={(menu) => (
        <div className={classes.dropdownContainer}>
          <div className={classes.userHeader}>
            <Row align="middle" gutter={12}>
              <Col>
                <Avatar
                  size={40}
                  style={{
                    backgroundColor: 'rgb(222, 68, 54)',
                  }}
                >
                  {name?.charAt(0)}
                </Avatar>
              </Col>
              <Col flex={1}>
                <div className={classes.userName}>{name}</div>
                <div className={classes.userEmail}>{email}</div>
              </Col>
            </Row>
          </div>
          {menu}
        </div>
      )}
      menu={{
        className: classes.menuStyle,
        items: [
          {
            key: 'theme',
            label: (
              <div
                className={classes.themeToggle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeToggle();
                }}
              >
                <span className={classes.themeToggleText}>
                  {intl.formatMessage({
                    defaultMessage: 'Dark Mode',
                  })}
                </span>
                <Switch
                  checked={currentTheme === 'dark'}
                  checkedChildren={
                    <FontAwesomeIcon icon={faMoon} style={{ fontSize: 12 }} />
                  }
                  onChange={handleThemeToggle}
                  size="small"
                  unCheckedChildren={
                    <FontAwesomeIcon icon={faSun} style={{ fontSize: 12 }} />
                  }
                />
              </div>
            ),
          },
          // {
          //   disabled: true,
          //   key: 'lang',
          //   label: (
          //     <Row>
          //       <Select
          //         bordered={false}
          //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          //         defaultValue={locale as AvailableLanguages}
          //         onChange={handleChangeLang}
          //         options={[
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'English 🇬🇧',
          //             }),
          //             value: 'en',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'French 🇫🇷',
          //             }),
          //             value: 'fr',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'German 🇩🇪',
          //             }),
          //             value: 'de',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Spanish 🇪🇸',
          //             }),
          //             value: 'es',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Danish 🇩🇰',
          //             }),
          //             value: 'da',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Italian 🇮🇹',
          //             }),
          //             value: 'it',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Dutch 🇳🇱',
          //             }),
          //             value: 'nl',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Flemish 🇧🇪',
          //             }),
          //             value: 'rbe',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Portuguese 🇵🇹',
          //             }),
          //             value: 'pt',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Swedish 🇸🇪',
          //             }),
          //             value: 'sv',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Polish 🇵🇱',
          //             }),
          //             value: 'pl',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Finnish 🇫🇮',
          //             }),
          //             value: 'fi',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Malay 🇲🇾',
          //             }),
          //             value: 'ms',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Thai 🇹🇭',
          //             }),
          //             value: 'th',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Romanian 🇷🇴',
          //             }),
          //             value: 'ro',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Indonesian 🇮🇩',
          //             }),
          //             value: 'id',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Hungarian 🇭🇺',
          //             }),
          //             value: 'hu',
          //           },
          //           {
          //             label: intl.formatMessage({
          //               defaultMessage: 'Greek 🇬🇷',
          //             }),
          //             value: 'el',
          //           },
          //         ]}
          //         placement="topLeft"
          //         style={{ paddingLeft: 8, width: '100%' }}
          //         value={locale as AvailableLanguages}
          //       />
          //     </Row>
          //   ),
          //   onClick: () => {},
          //   style: {
          //     cursor: 'default',
          //     padding: 0,
          //   },
          // },
          {
            key: 'user-settings',
            label: (
              <Link
                style={{ textDecoration: 'none' }}
                to={`${APP_PREFIX_PATH}/user-settings`}
              >
                <div className={classes.menuItem}>
                  <FontAwesomeIcon
                    className={classes.menuItemIcon}
                    icon={faCog}
                  />
                  <span className={classes.menuItemText}>
                    {intl.formatMessage({
                      defaultMessage: 'User Settings',
                    })}
                  </span>
                </div>
              </Link>
            ),
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.UserSettings,
            },
          },
          {
            key: 'terms',
            label: (
              <Link
                style={{ textDecoration: 'none' }}
                to={`${APP_PREFIX_PATH}/user-settings/terms`}
              >
                <div className={classes.menuItem}>
                  <FontAwesomeIcon
                    className={classes.menuItemIcon}
                    icon={faFileContract}
                  />
                  <span className={classes.menuItemText}>
                    {intl.formatMessage({
                      defaultMessage: 'Terms & Conditions',
                    })}
                  </span>
                </div>
              </Link>
            ),
          },
          {
            key: 'sign-out',
            label: (
              <div
                className={classes.signOutItem}
                onClick={() => {
                  signOut();
                }}
              >
                <FontAwesomeIcon
                  className={classes.signOutIcon}
                  icon={faSignOut}
                />
                <span className={classes.signOutText}>
                  {intl.formatMessage({
                    defaultMessage: 'Sign Out',
                  })}
                </span>
              </div>
            ),
          },
        ].filter((item) =>
          item.permission === undefined
            ? true
            : hasRolePermission({ permission: item.permission })
        ),
      }}
      placement="topRight"
      trigger={['click']}
    >
      <div className={classes.profileContainer}>
        <Avatar
          size="small"
          style={{
            backgroundColor: 'rgb(222, 68, 54)',
          }}
        >
          {name?.charAt(0)}
        </Avatar>
      </div>
    </Dropdown>
  );
};

export default NavProfile;
