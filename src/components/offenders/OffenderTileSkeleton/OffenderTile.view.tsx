import { Card } from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import React from 'react';

const OffenderTileSkeleton = (): JSX.Element => (
  <Card
    bodyStyle={{
      alignItems: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: '0.625rem',
      cursor: 'pointer',
      display: 'flex',
      height: 120,
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 0,
      position: 'relative',
      width: '100%',
    }}
  >
    <SkeletonAvatar active shape="square" size={120} />
  </Card>
);

export default OffenderTileSkeleton;
