import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Input, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { LocalStorageKeys } from 'types';

import type { Scheme } from 'state';
import { useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { useIntl } from 'react-intl';

const { Text } = Typography;

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
    borderTop: `1px solid ${theme.borderColor}`,
  },
  active: {
    backgroundColor: theme.imageBackgroundColor,
  },
}));

export const NavScheme = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { schemes } = useStoreState((state) => state.user);
  const { id: activeScheme } = useStoreState((state) => state.scheme);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const activeSchemeName = useStoreState((state) => state.scheme.name);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setTodos = useStoreActions((actions) => actions.user.setTodos);
  const setNotifications = useStoreActions(
    (actions) => actions.user.setNotifications
  );
  const defaultGroups = useStoreState((state) => state.user.defaultGroups);
  const setFilterDefaultGroup = useStoreActions(
    (state) => state.user.setFilterDefaultGroup
  );

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.pathname);
  }, [activeScheme]);

  const handleSchemeChange = (scheme: Scheme) => {
    setSearch('');
    window.localStorage.removeItem(LocalStorageKeys.INCIDENT_FILTER);
    window.localStorage.removeItem(LocalStorageKeys.OFFENDER_FILTER);
    window.localStorage.setItem('currentScheme', scheme.scheme.id);
    window.localStorage.setItem(
      'logo',
      scheme.scheme.logo?.optimisedPersisted || ''
    );
    window.localStorage.setItem(
      'logo-dark',
      scheme.scheme.darkLogo?.optimisedPersisted || ''
    );
    setScheme({
      languageCount: scheme.scheme.languageCount,
      autoPopulateDescription: scheme.scheme.autoPopulateDescription,
      needJustification: scheme.scheme.needJustification,
      requireSiteNumberForUsers: scheme.scheme.requireSiteNumberForUsers,
      oneSelectedIncidentTypeOnly: scheme.scheme.oneSelectedIncidentTypeOnly,
      autoApproveIncidents: scheme.scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.scheme.autoApproveOffenders,
      defaultPublicOffenderDOB: scheme.scheme.defaultPublicOffenderDOB,
      id: scheme.scheme.id,
      name: scheme.scheme.name,
      logo: scheme.scheme.logo?.optimisedPersisted,
      darkLogo: scheme.scheme.darkLogo?.optimisedPersisted,
      userTodos: scheme.scheme.userTodos,
      userNotifications: scheme.scheme.userNotifications,
      goodsMode: scheme.scheme.goodsMode,
      facialRecognition: scheme.scheme.facialRecognition,
      activityAssignToUser: scheme.scheme.activityAssignToUser,
      imagesRequiredOnOffenders: scheme.scheme.imagesRequiredOnOffenders,
      taskTimeTracking: scheme.scheme.taskTimeTracking,
      restrictIncidentAccess: scheme.scheme.restrictIncidentAccess,
      reportOnly: scheme.scheme.reportOnly,
      facialDetection: scheme.scheme.facialDetection,
      connectedToSchemes: scheme.scheme.connectedToSchemes,
    });
    setFilterDefaultGroup({
      filterDefaultGroups: defaultGroups.filter(
        (el) => el.scheme.id === scheme.scheme.id
      ),
    });
    setTodos({ userTodos: scheme.scheme.userTodos || 0 });
    setNotifications({
      userNotifications: scheme.scheme.userNotifications || 0,
    });

    handleVisibleChange(false);
  };

  const [search, setSearch] = useState('');
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  return schemes.length > 1 ? (
    <Dropdown
      open={visible || !!search}
      onOpenChange={handleVisibleChange}
      menu={{
        style: {
          maxHeight: 400,
          overflowY: 'auto',
          colorScheme: currentTheme,
        },
        items:
          filteredSchemes.length > 0
            ? filteredSchemes.map((scheme) => ({
                key: scheme.id,
                className:
                  activeScheme === scheme.scheme.id
                    ? classes.active
                    : undefined,
                label: (
                  <Row
                    align="middle"
                    style={{
                      width: '100%',
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                    onClick={() => handleSchemeChange(scheme)}
                    wrap={false}
                  >
                    <Col flex={1}>
                      <Text
                        ellipsis
                        style={{ maxWidth: 180, marginRight: 20 }}
                        className="text-dark"
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {scheme.scheme.name}{' '}
                      </Text>
                    </Col>
                    {activeScheme === scheme.scheme.id ? (
                      <Col>
                        <Text type="success">
                          {intl.formatMessage({
                            defaultMessage: 'Selected',
                            id: 'byP6IC',
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
              }))
            : [
                {
                  key: 'no-schemes',
                  label: (
                    <Row
                      align="middle"
                      style={{
                        width: '100%',
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                      wrap={false}
                    >
                      <Col flex={1}>
                        <Text
                          ellipsis
                          style={{ maxWidth: 180, marginRight: 20 }}
                          className="text-dark"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'No schemes found',
                            id: 'ym1dBk',
                          })}
                        </Text>
                      </Col>
                    </Row>
                  ),
                },
              ],
      }}
      placement="topRight"
      dropdownRender={(menu) => (
        <div className="dropdown-content">
          <div>
            {menu}

            {schemes.length > 5 && (
              <Input
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search',
                  id: 'xmcVZ0',
                })}
                style={{
                  width: '100%',
                }}
              />
            )}
          </div>
        </div>
      )}
    >
      <div className={classes.notificationCol}>
        <Text style={{ maxWidth: 120 }} ellipsis>
          {activeSchemeName}
        </Text>
        <FontAwesomeIcon
          style={{
            fontSize: 18,
            marginLeft: 10,
            marginTop: -2,
          }}
          icon={faCaretDown}
        />
      </div>
    </Dropdown>
  ) : (
    <div />
  );
};

export default NavScheme;
