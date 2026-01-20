import { Card, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const PoliceOffenderFeed = () => {
  const intl = useIntl();

  return (
    <div className="page-container">
      <Card>
        <Typography.Title level={2}>
          {intl.formatMessage({ defaultMessage: 'Offenders' })}
        </Typography.Title>
        <Typography.Paragraph>
          {intl.formatMessage({
            defaultMessage: 'Offenders feed view coming soon.',
          })}
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default PoliceOffenderFeed;
