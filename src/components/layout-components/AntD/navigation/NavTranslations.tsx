import type { AvailableLanguages } from '#/lang';
import type { Theme } from 'configs/ThemeConfig';

import { LocalStorageKeys, typedLocalStorage } from '#/utils';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
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
  languageIcon: {
    color: theme.headerColor,
    fontSize: 20,
  },
  languageSelector: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
      flag: '🇬🇧',
      label: intl.formatMessage({
        defaultMessage: 'English 🇬🇧',
      }),
      value: 'en',
    },
    {
      flag: '🇫🇷',
      label: intl.formatMessage({
        defaultMessage: 'French 🇫🇷',
      }),
      value: 'fr',
    },
    {
      flag: '🇩🇪',
      label: intl.formatMessage({
        defaultMessage: 'German 🇩🇪',
      }),
      value: 'de',
    },
    {
      flag: '🇪🇸',
      label: intl.formatMessage({
        defaultMessage: 'Spanish 🇪🇸',
      }),
      value: 'es',
    },
    {
      flag: '🇩🇰',
      label: intl.formatMessage({
        defaultMessage: 'Danish 🇩🇰',
      }),
      value: 'da',
    },
    {
      flag: '🇮🇹',
      label: intl.formatMessage({
        defaultMessage: 'Italian 🇮🇹',
      }),
      value: 'it',
    },
    {
      flag: '🇳🇱',
      label: intl.formatMessage({
        defaultMessage: 'Dutch 🇳🇱',
      }),
      value: 'nl',
    },
    {
      flag: '🇧🇪',
      label: intl.formatMessage({
        defaultMessage: 'Flemish 🇧🇪',
      }),
      value: 'rbe',
    },
    {
      flag: '🇵🇹',
      label: intl.formatMessage({
        defaultMessage: 'Portuguese 🇵🇹',
      }),
      value: 'pt',
    },
    {
      flag: '🇸🇪',
      label: intl.formatMessage({
        defaultMessage: 'Swedish 🇸🇪',
      }),
      value: 'sv',
    },
    {
      flag: '🇵🇱',
      label: intl.formatMessage({
        defaultMessage: 'Polish 🇵🇱',
      }),
      value: 'pl',
    },
    {
      flag: '🇫🇮',
      label: intl.formatMessage({
        defaultMessage: 'Finnish 🇫🇮',
      }),
      value: 'fi',
    },
    {
      flag: '🇲🇾',
      label: intl.formatMessage({
        defaultMessage: 'Malay 🇲🇾',
      }),
      value: 'ms',
    },
    {
      flag: '🇹🇭',
      label: intl.formatMessage({
        defaultMessage: 'Thai 🇹🇭',
      }),
      value: 'th',
    },
    {
      flag: '🇷🇴',
      label: intl.formatMessage({
        defaultMessage: 'Romanian 🇷🇴',
      }),
      value: 'ro',
    },
    {
      flag: '🇮🇩',
      label: intl.formatMessage({
        defaultMessage: 'Indonesian 🇮🇩',
      }),
      value: 'id',
    },
    {
      flag: '🇭🇺',
      label: intl.formatMessage({
        defaultMessage: 'Hungarian 🇭🇺',
      }),
      value: 'hu',
    },
    {
      flag: '🇬🇷',
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
      <div className={classes.languageSelector}>
        <span style={{ fontSize: 20 }}>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          {items.find((item) => item.value === locale)?.flag || '🌐'}
        </span>
      </div>
    </Dropdown>
  );
};

export default NavTranslations;
