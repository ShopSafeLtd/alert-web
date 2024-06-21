import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const IncidentValue = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const data = '123222.50';
  const loading = false;
  const intl = useIntl();
  return (
    <Card style={{ height: '100%' }}>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('incidentValue')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <Statistic
        title={intl.formatMessage({
          defaultMessage: 'Total Value Lost',
        })}
        value={intl.formatNumber(Number.parseFloat(data), {
          style: 'currency',
          currency: 'GBP',
        })}
        loading={loading}
      />
    </Card>
  );
};

export default IncidentValue;
