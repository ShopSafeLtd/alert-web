import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const PoliceCrimeGroupsFeed = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Crime Groups" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Crime groups feed view coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default PoliceCrimeGroupsFeed;
