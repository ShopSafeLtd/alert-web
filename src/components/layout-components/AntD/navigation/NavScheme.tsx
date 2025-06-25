import type { InputRef } from 'antd';
import type { Theme } from 'configs/ThemeConfig';

import {
  currentSchemeAtom,
  currentSchemeIdAtom,
  useSchemeProvider,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userSchemesAtom } from '#/providers/UserProvider/UserProvider';
import { faArrowRight, faSearch } from '@fortawesome/pro-light-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Dropdown, Input, Row, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useStoreState } from 'state';

const { Text } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  active: {
    '& $schemeItemText': {
      color: theme.primary,
      fontWeight: 600,
    },
    backgroundColor: `${theme.primary}15`,
  },
  arrowIcon: {
    color: theme.secondaryText,
    fontSize: 12,
    opacity: 0.6,
  },
  dropdownContainer: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.5)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  menuItemContent: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.04)',
    },
    borderRadius: 0,
    margin: 0,
    padding: '10px 16px',
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
  noSchemes: {
    color: theme.secondaryText,
    fontSize: 13,
    padding: '16px',
    textAlign: 'center',
  },
  schemeIcon: {
    color: theme.secondaryText,
    fontSize: 12,
    marginLeft: 8,
    transition: 'transform 0.2s ease',
  },
  schemeIconOpen: {
    transform: 'rotate(180deg)',
  },
  schemeItem: {
    cursor: 'pointer',
    margin: '0',
    padding: '0',
  },
  schemeItemText: {
    color: theme.headerColor,
    fontSize: 14,
    transition: 'all 0.2s ease',
  },
  schemeSelector: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
    },
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.02)',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
    padding: '8px 12px',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  schemeText: {
    color: theme.headerColor,
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    textAlign: 'left',
  },
  searchContainer: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    borderTop: `1px solid ${theme.borderColor}`,
    padding: '8px',
  },
  searchInput: {
    '& .ant-input': {
      '&::placeholder': {
        color: theme.secondaryText,
      },
      backgroundColor: theme.componentBackground,
      borderRadius: 8,
      fontSize: 13,
      padding: '8px 12px 8px 36px',
    },
    '& .ant-input-clear-icon': {
      fontSize: 12,
    },
    '& .ant-input-prefix': {
      marginRight: 8,
    },
  },
  selectedBadge: {
    backgroundColor: `${theme.primary}15`,
    borderRadius: 4,
    color: theme.primary,
    fontSize: 12,
    fontWeight: 600,
    padding: '2px 8px',
  },
}));

export const NavScheme = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { setScheme } = useSchemeProvider();

  const schemesO = useAtomValue(userSchemesAtom);
  const schemes = [...schemesO].sort((a, b) =>
    a.scheme.name.localeCompare(b.scheme.name)
  );
  const activeScheme = useAtomValue(currentSchemeIdAtom);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const activeSchemeName = useAtomValue(currentSchemeAtom)?.name ?? '';

  const [visible, setVisible] = useState(false);
  const searchInputRef = useRef<InputRef>(null);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
    if (flag && schemes.length > 5) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.pathname);
  }, [activeScheme]);

  const handleSchemeChange = (scheme: { id: string }) => {
    setSearch('');

    setScheme(scheme.id);

    navigate(location.pathname);
    handleVisibleChange(false);
  };

  const [search, setSearch] = useState('');
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  return schemes.length > 1 ? (
    <Dropdown
      dropdownRender={(menu) => (
        <div className={classes.dropdownContainer}>
          {menu}
          {schemes.length > 5 && (
            <div className={classes.searchContainer}>
              <Input
                allowClear
                className={classes.searchInput}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search schemes...',
                })}
                prefix={
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ fontSize: 12, opacity: 0.6 }}
                  />
                }
                ref={searchInputRef}
                value={search}
              />
            </div>
          )}
        </div>
      )}
      menu={{
        className: classes.menuStyle,
        items:
          filteredSchemes.length > 0
            ? filteredSchemes.map((scheme) => ({
                className:
                  activeScheme === scheme.schemeId ? classes.active : undefined,
                key: scheme.id,
                label: (
                  <div className={classes.schemeItem}>
                    <Row
                      align="middle"
                      className={classes.menuItemContent}
                      onClick={() => handleSchemeChange(scheme)}
                      wrap={false}
                    >
                      <Col flex={1}>
                        <Text className={classes.schemeItemText} ellipsis>
                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                          {scheme.scheme.name}
                        </Text>
                      </Col>
                      {activeScheme === scheme.schemeId ? (
                        <Col>
                          <span className={classes.selectedBadge}>
                            {intl.formatMessage({
                              defaultMessage: 'Active',
                            })}
                          </span>
                        </Col>
                      ) : (
                        <Col>
                          <FontAwesomeIcon
                            className={classes.arrowIcon}
                            icon={faArrowRight}
                          />
                        </Col>
                      )}
                    </Row>
                  </div>
                ),
              }))
            : [
                {
                  key: 'no-schemes',
                  label: (
                    <div className={classes.noSchemes}>
                      {intl.formatMessage({
                        defaultMessage: 'No schemes found',
                      })}
                    </div>
                  ),
                },
              ],
        style: {
          colorScheme: currentTheme,
          maxHeight: 400,
          overflowY: 'auto',
        },
      }}
      onOpenChange={handleVisibleChange}
      open={visible || !!search}
      placement="topRight"
      trigger={['hover']}
    >
      <div className={classes.schemeSelector}>
        <Text className={classes.schemeText} ellipsis>
          {activeSchemeName}
        </Text>
        <FontAwesomeIcon
          className={`${classes.schemeIcon} ${visible ? classes.schemeIconOpen : ''}`}
          icon={faCaretDown}
        />
      </div>
    </Dropdown>
  ) : (
    <div />
  );
};

export default NavScheme;
