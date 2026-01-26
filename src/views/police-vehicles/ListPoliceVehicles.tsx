import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ListPoliceVehicles = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Vehicles" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Vehicles list view coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default ListPoliceVehicles;
