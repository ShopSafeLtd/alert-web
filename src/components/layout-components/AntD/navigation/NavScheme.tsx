import type { Theme } from 'configs/ThemeConfig';
import type { Scheme } from 'state';

import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Dropdown, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import { LocalStorageKeys } from 'types';

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
      activityAssignToUser: scheme.scheme.activityAssignToUser,
      autoApproveIncidents: scheme.scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.scheme.autoApproveOffenders,
      autoPopulateDescription: scheme.scheme.autoPopulateDescription,
      connectedToSchemes: scheme.scheme.connectedToSchemes,
      darkLogo: scheme.scheme.darkLogo?.optimisedPersisted,
      defaultPublicOffenderDOB: scheme.scheme.defaultPublicOffenderDOB,
      facialDetection: scheme.scheme.facialDetection,
      facialRecognition: scheme.scheme.facialRecognition,
      facialRedaction: scheme.scheme.facialRedaction,
      goodsMode: scheme.scheme.goodsMode,
      id: scheme.scheme.id,
      imagesRequiredOnOffenders: scheme.scheme.imagesRequiredOnOffenders,
      languageCount: scheme.scheme.languageCount,
      logo: scheme.scheme.logo?.optimisedPersisted,
      name: scheme.scheme.name,
      needJustification: scheme.scheme.needJustification,
      oneSelectedIncidentTypeOnly: scheme.scheme.oneSelectedIncidentTypeOnly,
      reportOnly: scheme.scheme.reportOnly,
      requireSiteNumberForUsers: scheme.scheme.requireSiteNumberForUsers,
      restrictIncidentAccess: scheme.scheme.restrictIncidentAccess,
      taskTimeTracking: scheme.scheme.taskTimeTracking,
      useBusinessGroupsOnIncident: scheme.scheme.useBusinessGroupsOnIncident,
      userNotifications: scheme.scheme.userNotifications,
      userTodos: scheme.scheme.userTodos,
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
      dropdownRender={(menu) => (
        <div className="dropdown-content">
          <div>
            {menu}

            {schemes.length > 5 && (
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search schemes...',
                })}
                style={{
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderTopWidth: 2.5,
                  borderWidth: 0,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingTop: 10,
                  width: '100%',
                }}
                value={search}
              />
            )}
          </div>
        </div>
      )}
      menu={{
        items:
          filteredSchemes.length > 0
            ? filteredSchemes.map((scheme) => ({
                className:
                  activeScheme === scheme.scheme.id
                    ? classes.active
                    : undefined,
                key: scheme.id,
                label: (
                  <Row
                    align="middle"
                    onClick={() => handleSchemeChange(scheme)}
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
                        {scheme.scheme.name}{' '}
                      </Text>
                    </Col>
                    {activeScheme === scheme.scheme.id ? (
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
              }))
            : [
                {
                  key: 'no-schemes',
                  label: (
                    <Row
                      align="middle"
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
                          {intl.formatMessage({
                            defaultMessage: 'No schemes found',
                          })}
                        </Text>
                      </Col>
                    </Row>
                  ),
                },
              ],
        style: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          colorScheme: currentTheme,
          maxHeight: 400,
          overflowY: 'auto',
        },
      }}
      onOpenChange={handleVisibleChange}
      open={visible || !!search}
      placement="topRight"
    >
      <div className={classes.notificationCol}>
        <Text ellipsis style={{ maxWidth: 120 }}>
          {activeSchemeName}
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
  ) : (
    <div />
  );
};

export default NavScheme;
