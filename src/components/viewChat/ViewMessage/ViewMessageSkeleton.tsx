import { Col, Row, Skeleton } from 'antd';
import React from 'react';

const ViewMessageSkeleton = (): JSX.Element => (
  <>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginLeft: 20,
          }}
        />
      </Col>
    </Row>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginLeft: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="end">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginRight: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="end">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginRight: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginLeft: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="end">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginRight: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginLeft: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            height: 35,
            marginLeft: 20,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
  </>
);

export default ViewMessageSkeleton;
