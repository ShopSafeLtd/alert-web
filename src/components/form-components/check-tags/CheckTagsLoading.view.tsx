import { Col, Row, Skeleton } from 'antd';
import React from 'react';

const CheckTagsLoading = () => (
  <Row gutter={[10, 10]}>
    <Col>
      <Skeleton.Input
        active
        style={{ borderRadius: 100, height: 31, width: 80 }}
      />
    </Col>
    <Col>
      <Skeleton.Input
        active
        style={{ borderRadius: 100, height: 31, width: 80 }}
      />
    </Col>
    <Col>
      <Skeleton.Input
        active
        style={{ borderRadius: 100, height: 31, width: 80 }}
      />
    </Col>
  </Row>
);

export default CheckTagsLoading;
