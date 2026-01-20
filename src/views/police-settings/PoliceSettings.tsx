import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const PoliceSettings = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Settings" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Settings configuration coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default PoliceSettings;
