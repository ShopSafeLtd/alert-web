import { Card, Skeleton } from 'antd';
import React from 'react';

const CompactSkeletonCard = (): JSX.Element => (
  <Card
    bodyStyle={{
      borderRadius: 10,
      display: 'flex',
      height: 150,
      padding: 0,
    }}
  >
    <Skeleton.Image style={{ height: 150, width: 150 }} />

    <Skeleton active style={{ padding: 10 }} />
  </Card>
);

export default CompactSkeletonCard;
