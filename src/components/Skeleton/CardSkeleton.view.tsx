import { Card, Skeleton } from 'antd';
import React from 'react';

const CardSkeleton = ({ height }: { height?: number }): JSX.Element => (
  <Card
    bodyStyle={{
      alignItems: 'center',
      borderRadius: '0.625rem',
      display: 'flex',
      height: height || 140,
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 10,
      width: '100%',
    }}
  >
    <Skeleton active />
  </Card>
);

export default CardSkeleton;
