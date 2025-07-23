import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

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
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('incidentCount')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <Statistic
        loading={loading}
        title={intl.formatMessage({
          defaultMessage: 'Incident Count',
        })}
        value={data}
      />
    </Card>
  );
};

export default IncidentCount;
