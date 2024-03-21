import { Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const IncidentValue = ({
  data,
  loading,
}: {
  data: number;
  loading: boolean;
}) => {
  const intl = useIntl();
  return (
    <Card style={{ height: '100%' }}>
      <Statistic
        title={intl.formatMessage({
          defaultMessage: 'Total Value Lost',
          id: 'fWpZ4S',
        })}
        value={intl.formatNumber(data, { style: 'currency', currency: 'GBP' })}
        loading={loading}
      />
    </Card>
  );
};

export default IncidentValue;
