import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';

const ArticleSkeletonCard = (): JSX.Element => (
  <Card style={{ marginBottom: 10 }}>
    <Row>
      <Col>
        <Skeleton.Image
          style={{
            width: 140,
            height: 160,
            borderRadius: 5,
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
