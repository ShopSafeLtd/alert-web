import { Card, Col, Row, Skeleton } from 'antd';
import React from 'react';

const ArticleSkeletonCard = (): JSX.Element => (
  <Card style={{ marginBottom: 10 }}>
    <Row>
      <Col>
        <Skeleton.Image
          style={{
            borderRadius: 5,
            height: 130,
            width: 130,
          }}
        />
      </Col>
      <Col flex={1}>
        <div style={{ paddingLeft: 10 }}>
          <Skeleton active />
        </div>
      </Col>
    </Row>
  </Card>
);

export default ArticleSkeletonCard;
