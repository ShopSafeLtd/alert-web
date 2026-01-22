import { Card, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const AddPoliceOffender = () => {
  const intl = useIntl();

  return (
    <div className="page-container">
      <Card>
        <Typography.Title level={2}>
          {intl.formatMessage({ defaultMessage: 'Add Offender' })}
        </Typography.Title>
        <Typography.Paragraph>
          {intl.formatMessage({
            defaultMessage: 'Add new offender form coming soon.',
          })}
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default AddPoliceOffender;
