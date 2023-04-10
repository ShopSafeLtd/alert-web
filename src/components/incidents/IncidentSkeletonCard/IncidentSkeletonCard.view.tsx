import React from 'react';
import { Card, Skeleton } from 'antd';

const IncidentSkeletonCard = (): JSX.Element => (
  <Card className="incident-card">
    <Skeleton.Image />

    <div style={{ paddingLeft: 10 }} className="incident-card-content">
      <Skeleton active />
    </div>
  </Card>
);

export default IncidentSkeletonCard;
