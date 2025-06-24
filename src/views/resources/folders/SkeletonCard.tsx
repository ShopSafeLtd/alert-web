import { Card, Skeleton } from 'antd';
import React from 'react';

const SkeletonCard = () => (
  <Card style={{ height: 200, margin: 10 }}>
    <Skeleton active />
  </Card>
);

export default SkeletonCard;
