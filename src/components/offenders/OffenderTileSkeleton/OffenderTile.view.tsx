import React from 'react';
import { Card } from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';

const OffenderTileSkeleton = (): JSX.Element => (
  <Card
    bodyStyle={{
      width: '100%',
      height: 120,
      position: 'relative',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: 0,
      borderRadius: '0.625rem',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    <SkeletonAvatar active size={120} shape="square" />
  </Card>
);

export default OffenderTileSkeleton;
