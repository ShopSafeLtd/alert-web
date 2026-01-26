import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

const ViewPoliceIncident = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <Card>
        <Typography.Title level={2}>
          <FormattedMessage defaultMessage="View Incident" />
        </Typography.Title>
        <Typography.Paragraph>
          <FormattedMessage
            defaultMessage="Viewing incident ID: {id}"
            values={{ id }}
          />
        </Typography.Paragraph>
        <Typography.Paragraph>
          <FormattedMessage defaultMessage="Incident details view coming soon." />
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default ViewPoliceIncident;
