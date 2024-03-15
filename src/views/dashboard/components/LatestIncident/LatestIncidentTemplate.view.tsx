import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const LatestIncident = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const data = {
    date: new Date(),
  };
  const loading = false;
  return (
    <Card style={{ height: '100%' }}>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('latestIncident')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      {data ? (
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
      ) : (
        <div>
          {intl.formatMessage({ defaultMessage: 'No Incidents', id: '+nJOH5' })}
        </div>
      )}
    </Card>
  );
};

export default LatestIncident;
