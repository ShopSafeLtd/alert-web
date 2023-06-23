import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

const ImportMenu = () => (
  <div style={{ padding: 20 }}>
    <Row>
      <Col>
        <Link to="/app/scheme-settings/data-import/disc">
          <Card title="DISC Import">
            <Typography.Text type="secondary">
              Import data from a disc data dump into alert using a guided form
            </Typography.Text>
          </Card>
        </Link>
      </Col>
    </Row>
  </div>
);

export default ImportMenu;
