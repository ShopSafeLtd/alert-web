import { Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

const ViewPoliceOffender = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <Card>
        <Typography.Title level={2}>
          <FormattedMessage defaultMessage="View Offender" />
        </Typography.Title>
        <Typography.Paragraph>
          <FormattedMessage
            defaultMessage="Viewing offender ID: {id}"
            values={{ id }}
          />
        </Typography.Paragraph>
        <Typography.Paragraph>
          <FormattedMessage defaultMessage="Offender details view coming soon." />
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default ViewPoliceOffender;
