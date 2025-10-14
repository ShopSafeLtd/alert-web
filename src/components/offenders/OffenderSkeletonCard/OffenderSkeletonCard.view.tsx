import { Card, Skeleton } from 'antd';
import React from 'react';

const OffenderSkeletonCard = (): JSX.Element => (
  <Card className="offender-card">
    <Skeleton.Image />

    <div
      className="incident-card-content"
      style={{ paddingLeft: 10, paddingTop: 10 }}
    >
      <Skeleton active />
    </div>
  </Card>
);

export default OffenderSkeletonCard;
