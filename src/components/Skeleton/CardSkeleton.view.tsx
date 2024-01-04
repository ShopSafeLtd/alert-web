import React from 'react';
import { Card, Skeleton } from 'antd';

const CardSkeleton = ({ height }: { height?: number }): JSX.Element => (
  <Card
    bodyStyle={{
      padding: 10,
      borderRadius: '0.625rem',
      height: height || 140,
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Skeleton active />
  </Card>
);

export default CardSkeleton;
