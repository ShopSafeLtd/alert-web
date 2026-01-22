import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AddPoliceIncident = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Add Incident" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Add new incident form coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default AddPoliceIncident;
