import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AddPoliceCrimeGroup = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Add Crime Group" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Add new crime group form coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default AddPoliceCrimeGroup;
