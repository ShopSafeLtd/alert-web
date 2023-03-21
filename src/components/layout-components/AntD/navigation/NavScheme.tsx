import React, { useEffect, useState } from 'react';
import { Col, Dropdown, List, Menu, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCaretDown } from '@fortawesome/pro-light-svg-icons';
import { LocalStorageKeys } from 'types';

import { Scheme, useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

export const NavScheme = () => {
  const schemes = useStoreState((state) => state.user.schemes);
  const activeScheme = useStoreState((state) => state.scheme.id);
  const activeSchemeName = useStoreState((state) => state.scheme.name);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);

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
    window.localStorage.removeItem(LocalStorageKeys.INCIDENT_FILTER);
    window.localStorage.removeItem(LocalStorageKeys.OFFENDER_FILTER);
    window.localStorage.setItem('currentScheme', scheme.scheme.id);
    window.localStorage.setItem('logo', scheme.scheme.logo?.optimised || '');
    window.localStorage.setItem(
      'logo-dark',
      scheme.scheme.logo?.optimised || ''
    );

    setScheme({
      autoApproveIncidents: scheme.scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.scheme.autoApproveOffenders,
      id: scheme.scheme.id,
      name: scheme.scheme.name,
      logo: scheme.scheme.logo?.optimised,
    });
    handleVisibleChange(false);
  };

  const schemeList = (
    <div className="nav-dropdown nav-notification">
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Your Schemes</h4>
      </div>
      <div className="nav-notification-body">
        <List<Scheme>
          size="small"
          itemLayout="horizontal"
          dataSource={schemes}
          renderItem={(item) => (
            <List.Item
              className={
                activeScheme === item.scheme.id ? '' : 'list-clickable'
              }
              onClick={() =>
                activeScheme !== item.scheme.id && handleSchemeChange(item)
              }
            >
              <Row
                align="middle"
                style={{ width: '100%', paddingRight: 10, paddingLeft: 10 }}
              >
                <Col flex={1}>
                  <span className="text-dark">{item.scheme.name} </span>
                </Col>
                {activeScheme === item.scheme.id ? (
                  <Col>
                    <Text type="success">Selected</Text>
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
            </List.Item>
          )}
        />
      </div>
    </div>
  );

  return schemes.length > 1 ? (
    <Dropdown
      placement="topRight"
      overlay={schemeList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
    >
      <Menu
        mode="horizontal"
        style={{ width: '100%' }}
        items={[
          {
            key: 0,
            style: {
              width: '100%',
              padding: 0,
            },
            label: (
              <div style={{ padding: '0 20px', maxWidth: '100%' }}>
                <Text ellipsis>{activeSchemeName}</Text>
                <FontAwesomeIcon
                  style={{
                    fontSize: 20,
                    color: '#424242',
                    marginLeft: 10,
                    marginBottom: -3,
                  }}
                  icon={faCaretDown}
                />
              </div>
            ),
          },
        ]}
      />
    </Dropdown>
  ) : (
    <div />
  );
};

export default NavScheme;
