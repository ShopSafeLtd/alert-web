import type { Theme } from 'configs/ThemeConfig';
import type { AvailableLanguages } from 'lang';

import { useSignOut } from '#/hooks/signOut';
import {
  faFileContract,
  faMoon,
  faSignOut,
  faSun,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Col, Dropdown, Row, Select, Switch, Typography } from 'antd';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import { LocalStorageKeys, typedLocalStorage } from 'utils';

const useStyles = createUseStyles((theme: Theme) => ({
  notificationCol: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
}));

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
  const { signOut } = useSignOut();
  const handleChangeLang = (value: AvailableLanguages) => {
    switchLocale(value as string);
    typedLocalStorage.set(LocalStorageKeys.lang, value as string);
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            label: (
              <Link to={`${APP_PREFIX_PATH}/user-settings`}>
                <Row>
                  <Col>
                    <Avatar
                      size={35}
                      style={{
                        backgroundColor: 'rgb(222, 68, 54)',
                        minWidth: 35,
                      }}
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
              </Link>
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
                    })}
                  </Typography.Text>
                </Col>
                <Col>
                  <Switch
                    checked={currentTheme === 'dark'}
                    checkedChildren={
                      <FontAwesomeIcon color="#F5F3CE" icon={faMoon} />
                    }
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
                    unCheckedChildren={
                      <FontAwesomeIcon color="GoldenRod" icon={faSun} />
                    }
                  />
                </Col>
              </Row>
            ),
          },
          {
            disabled: true,
            key: 'lang',
            label: (
              <Row>
                <Select
                  bordered={false}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  defaultValue={locale as AvailableLanguages}
                  onChange={handleChangeLang}
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'English 🇬🇧',
                      }),
                      value: 'en',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'French 🇫🇷',
                      }),
                      value: 'fr',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'German 🇩🇪',
                      }),
                      value: 'de',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Spanish 🇪🇸',
                      }),
                      value: 'es',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Danish 🇩🇰',
                      }),
                      value: 'da',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Italian 🇮🇹',
                      }),
                      value: 'it',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Dutch 🇳🇱',
                      }),
                      value: 'nl',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Flemish 🇧🇪',
                      }),
                      value: 'rbe',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Portuguese 🇵🇹',
                      }),
                      value: 'pt',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Swedish 🇸🇪',
                      }),
                      value: 'sv',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Polish 🇵🇱',
                      }),
                      value: 'pl',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Finnish 🇫🇮',
                      }),
                      value: 'fi',
                    },
                  ]}
                  placement="topLeft"
                  style={{ paddingLeft: 8, width: '100%' }}
                  value={locale as AvailableLanguages}
                />
              </Row>
            ),
            onClick: () => {},
            style: {
              cursor: 'default',
              padding: 0,
            },
          },
          {
            key: '3',
            label: (
              <Link to={`${APP_PREFIX_PATH}/user-settings`}>
                <Row>
                  <span className="font-weight-normal">
                    {intl.formatMessage({
                      defaultMessage: 'User Settings',
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
                }}
              >
                <Col>
                  <FontAwesomeIcon icon={faSignOut} />
                </Col>
                <Col>
                  <span className="font-weight-normal">
                    {intl.formatMessage({
                      defaultMessage: 'Sign Out',
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
