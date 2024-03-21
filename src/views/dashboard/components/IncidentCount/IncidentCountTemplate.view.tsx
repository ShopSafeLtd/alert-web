import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const IncidentCount = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const loading = false;
  const data = 123;
  const intl = useIntl();
  return (
    <Card style={{ height: '100%' }}>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('incidentCount')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <Statistic
        title={intl.formatMessage({
          defaultMessage: 'Incident Count',
          id: 'otC1Ao',
        })}
        value={data}
        loading={loading}
      />
    </Card>
  );
};

export default IncidentCount;
