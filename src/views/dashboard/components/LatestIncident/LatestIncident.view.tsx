import { Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const LatestIncident = ({
  data,
  loading,
}: {
  data: {
    date: Date;
    id: string;
  } | null;
  loading: boolean;
}) => {
  const intl = useIntl();
  return (
    <Card style={{ height: '100%' }}>
      {data ? (
        <Link to={`/app/incidents/view/${data.id}`}>
          <Statistic
            title={intl.formatMessage({
              defaultMessage: 'Latest Incident',
              id: 'iJgFvw',
            })}
            valueStyle={{ color: '#ff0000' }}
            value={new Date(data.date).toLocaleString('en-GB', {
              timeZone: 'UTC',
            })}
            loading={loading}
          />
        </Link>
      ) : (
        <div>
          {intl.formatMessage({ defaultMessage: 'No Incidents', id: '+nJOH5' })}
        </div>
      )}
    </Card>
  );
};

export default LatestIncident;
