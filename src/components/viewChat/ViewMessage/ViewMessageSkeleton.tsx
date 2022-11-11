import React from 'react';
import { Col, Row, Skeleton } from 'antd';

const ViewMessageSkeleton = (): JSX.Element => (
  <>
    <Row justify="start">
      <Col>
        <Skeleton.Input
          active
          style={{
            borderRadius: 5,
            marginLeft: 20,
            height: 35,
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
            marginLeft: 20,
            height: 35,
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
            marginRight: 20,
            height: 35,
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
            marginRight: 20,
            height: 35,
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
            marginLeft: 20,
            height: 35,
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
            marginRight: 20,
            height: 35,
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
            marginLeft: 20,
            height: 35,
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
            marginLeft: 20,
            height: 35,
            marginTop: 10,
          }}
        />
      </Col>
    </Row>
  </>
);

export default ViewMessageSkeleton;
