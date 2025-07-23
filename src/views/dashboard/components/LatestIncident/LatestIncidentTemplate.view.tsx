import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

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
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('latestIncident')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      {data ? (
        <Statistic
          loading={loading}
          title={intl.formatMessage({
            defaultMessage: 'Latest Incident',
          })}
          value={new Date(data.date).toLocaleString('en-GB', {
            timeZone: 'UTC',
          })}
          valueStyle={{ color: '#ff0000' }}
        />
      ) : (
        <div>{intl.formatMessage({ defaultMessage: 'No Incidents' })}</div>
      )}
    </Card>
  );
};

export default LatestIncident;
