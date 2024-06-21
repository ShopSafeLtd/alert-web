import { Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const IncidentCount = ({
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
          defaultMessage: 'Incident Count',
        })}
        value={data}
        loading={loading}
      />
    </Card>
  );
};

export default IncidentCount;
