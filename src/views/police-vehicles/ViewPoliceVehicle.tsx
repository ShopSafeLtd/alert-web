import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

const ViewPoliceVehicle = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <Card>
        <Typography.Title level={2}>
          <FormattedMessage defaultMessage="View Vehicle" />
        </Typography.Title>
        <Typography.Paragraph>
          <FormattedMessage
            defaultMessage="Viewing vehicle ID: {id}"
            values={{ id }}
          />
        </Typography.Paragraph>
        <Typography.Paragraph>
          <FormattedMessage defaultMessage="Vehicle details view coming soon." />
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default ViewPoliceVehicle;
