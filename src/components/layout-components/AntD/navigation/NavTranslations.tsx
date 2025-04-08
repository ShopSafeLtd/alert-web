import type { AvailableLanguages } from '#/lang';
import type { Theme } from 'configs/ThemeConfig';

import { LocalStorageKeys, typedLocalStorage } from '#/utils';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Dropdown, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useStoreActions, useStoreState } from 'state';

const { Text } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  active: {
    backgroundColor: theme.imageBackgroundColor,
  },
  notificationCol: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderTop: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
}));

export const NavTranslations = () => {
  const classes = useStyles();
  const intl = useIntl();
  const switchLocale = useStoreActions((actions) => actions.theme.changeLocale);
  const locale = useStoreState((state) => state.theme.locale);

  const handleChangeLang = (value: AvailableLanguages) => {
    switchLocale(value as string);
    typedLocalStorage.set(LocalStorageKeys.lang, value as string);
    window.location.reload();
  };

  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const items = [
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
    {
      label: intl.formatMessage({
        defaultMessage: 'Malay 🇲🇾',
      }),
      value: 'ms',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Thai 🇹🇭',
      }),
      value: 'th',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Romanian 🇷🇴',
      }),
      value: 'ro',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Indonesian 🇮🇩',
      }),
      value: 'id',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Hungarian 🇭🇺',
      }),
      value: 'hu',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Greek 🇬🇷',
      }),
      value: 'el',
    },
  ];
  return (
    <Dropdown
      dropdownRender={(menu) => (
        <div className="dropdown-content">
          <div>{menu}</div>
        </div>
      )}
      menu={{
        items: items.map((item) => ({
          className: locale === item.value ? classes.active : undefined,
          key: item.value,
          label: (
            <Row
              align="middle"
              onClick={() => handleChangeLang(item.value as AvailableLanguages)}
              style={{
                paddingBottom: 4,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 4,
                width: '100%',
              }}
              wrap={false}
            >
              <Col flex={1}>
                <Text
                  className="text-dark"
                  ellipsis
                  style={{ marginRight: 20, maxWidth: 180 }}
                >
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  {item.label}{' '}
                </Text>
              </Col>
              {locale === item.value ? (
                <Col>
                  <Text type="success">
                    {intl.formatMessage({
                      defaultMessage: 'Selected',
                    })}
                  </Text>
                </Col>
              ) : (
                <Col>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ fontSize: 16, marginLeft: 10 }}
                  />
                </Col>
              )}
            </Row>
          ),
        })),
        style: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          colorScheme: currentTheme,
          maxHeight: 400,
          overflowY: 'auto',
        },
      }}
      onOpenChange={handleVisibleChange}
      open={visible}
      placement="topRight"
      trigger={['click']}
    >
      <div className={classes.notificationCol}>
        <Text ellipsis style={{ maxWidth: 120 }}>
          {items.find((item) => item.value === locale)?.label}
        </Text>
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{
            fontSize: 18,
            marginLeft: 10,
            marginTop: -2,
          }}
        />
      </div>
    </Dropdown>
  );
};

export default NavTranslations;
