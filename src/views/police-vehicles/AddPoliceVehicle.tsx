import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AddPoliceVehicle = () => (
  <div className="page-container">
    <Card>
      <Typography.Title level={2}>
        <FormattedMessage defaultMessage="Add Vehicle" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Add new vehicle form coming soon." />
      </Typography.Paragraph>
    </Card>
  </div>
);

export default AddPoliceVehicle;
