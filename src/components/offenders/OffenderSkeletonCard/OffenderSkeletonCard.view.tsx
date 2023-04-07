import React from 'react';
import { Card, Skeleton } from 'antd';

const OffenderSkeletonCard = (): JSX.Element => (
  <Card className="offender-card">
    <Skeleton.Image />

    <div
      style={{ paddingLeft: 10, paddingTop: 10 }}
      className="incident-card-content"
    >
      <Skeleton active />
    </div>
  </Card>
);

export default OffenderSkeletonCard;
