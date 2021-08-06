import React, { useState } from "react";
import { Menu, Dropdown, Typography, List, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faCaretDown,
  faArrowRight,
} from "@fortawesome/pro-light-svg-icons";

import { useStoreState, Scheme, useStoreActions } from "state";

const { Text } = Typography;

export const NavNotification = () => {
  const schemes = useStoreState((state) => state.user.schemes);
  const activeScheme = useStoreState((state) => state.scheme.id);
  const activeSchemeName = useStoreState((state) => state.scheme.name);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleSchemeChange = (scheme: Scheme) => {
    window.localStorage.setItem("currentScheme", scheme.scheme.id);
    setScheme({
      autoApproveIncidents: scheme.scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.scheme.autoApproveOffenders,
      id: scheme.scheme.id,
      name: scheme.scheme.name,
    });
    handleVisibleChange(false)
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
                activeScheme === item.scheme.id ? "" : "list-clickable"
              }
              onClick={() =>
                activeScheme !== item.scheme.id && handleSchemeChange(item)
              }
            >
              <Row
                align="middle"
                style={{ width: "100%", paddingRight: 10, paddingLeft: 10 }}
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

  return (
    <Dropdown
      placement="bottomRight"
      overlay={schemeList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={["click"]}
    >
      <Menu mode="horizontal">
        <Menu.Item>
          <FontAwesomeIcon
            style={{ fontSize: 20, color: "#424242", marginRight: 10 }}
            icon={faCity}
          />
          <Text>{activeSchemeName}</Text>
          <FontAwesomeIcon
            style={{
              fontSize: 20,
              color: "#424242",
              marginLeft: 10,
              marginBottom: -3,
            }}
            icon={faCaretDown}
          />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavNotification;
