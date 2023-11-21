import React from 'react';
import { Card, Skeleton } from 'antd';

const CompactSkeletonCard = (): JSX.Element => (
  <Card
    bodyStyle={{
      borderRadius: 10,
      padding: 0,
      display: 'flex',
      height: 150,
    }}
  >
    <Skeleton.Image style={{ width: 150, height: 150 }} />

    <Skeleton active style={{ padding: 10 }} />
  </Card>
);

export default CompactSkeletonCard;
