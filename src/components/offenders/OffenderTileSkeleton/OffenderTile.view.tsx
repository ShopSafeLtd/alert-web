import React from 'react';
import { Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

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
    <Spin indicator={Icon} />
  </Card>
);

export default OffenderTileSkeleton;
