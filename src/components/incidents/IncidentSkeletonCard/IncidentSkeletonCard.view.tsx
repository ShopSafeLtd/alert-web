import { Card, Skeleton } from 'antd';
import React from 'react';

const IncidentSkeletonCard = (): JSX.Element => (
  <Card className="incident-card">
    <Skeleton.Image />

    <div className="incident-card-content" style={{ paddingLeft: 10 }}>
      <Skeleton active />
    </div>
  </Card>
);

export default IncidentSkeletonCard;
