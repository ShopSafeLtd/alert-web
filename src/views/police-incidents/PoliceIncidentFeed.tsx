import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const PoliceIncidentFeed = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Incidents" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Incidents feed view coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default PoliceIncidentFeed;
