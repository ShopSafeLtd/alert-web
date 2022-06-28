import React from 'react'
import { Card, Skeleton, Tabs } from 'antd'

const IncidentSkeletonCard = ():JSX.Element => (
    <Card className="incident-card">
      <Skeleton.Image />
      <Tabs size="middle" defaultActiveKey="DETAILS">
        <Tabs.TabPane disabled tab="DETAILS" key="DETAILS">
          <div className="incident-card-content">
            <Skeleton active />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="OFFENDERS"
          tab="OFFENDERS"
          disabled
        >
          <div />
        </Tabs.TabPane>
      </Tabs>
    </Card>
 )

export default IncidentSkeletonCard