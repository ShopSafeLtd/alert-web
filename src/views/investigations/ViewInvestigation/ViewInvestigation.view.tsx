import { PageHeader, Tabs, Typography } from 'antd';
import TabbedView from 'components/TabbedView';
import React from 'react';
import { ViewInvestigationQuery } from '../../../graphql/generated';
import Flow from './views/Flow/Flow.container';
import ViewDetails from './views/Details';

interface Props {
  data: ViewInvestigationQuery | undefined;
}

const ViewInvestigation = ({ data }: Props) => (
  <TabbedView>
    <div style={{ flex: 1 }}>
      <PageHeader
        style={{ paddingBottom: 0, paddingTop: 5 }}
        title={data?.investigation?.name}
      />
      <Tabs>
        <Tabs.TabPane key="Dashboard" tab="Details">
          <ViewDetails investigationId={data?.investigation?.id || ''} />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="Flow"
          tab={<Typography.Text>Flow Map</Typography.Text>}
        >
          <Flow />
        </Tabs.TabPane>
      </Tabs>
    </div>
  </TabbedView>
);

export default ViewInvestigation;
