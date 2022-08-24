import React from 'react';
import { Card, Skeleton, Tabs } from 'antd';

const OffenderSkeletonCard = (): JSX.Element => (
  <Card className="offender-card">
    <Skeleton.Image />
    <Tabs size="middle" defaultActiveKey="DETAILS">
      <Tabs.TabPane disabled tab="DETAILS" key="DETAILS">
        <div className="incident-card-content">
          <Skeleton active />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane key="INCIDENTS" tab="INCIDENTS" disabled>
        <div />
      </Tabs.TabPane>
    </Tabs>
  </Card>
);

export default OffenderSkeletonCard;
