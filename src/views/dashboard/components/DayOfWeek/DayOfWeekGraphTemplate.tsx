import React from 'react';
import { Button, Card } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import BarGraph from '../../../../components/reports/graphs/barGraph';

const DayOfWeekBar = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const data = [
    { label: 'Mon', value: 10 },
    { label: 'Tues', value: 15 },
    { label: 'Wed', value: 20 },
    { label: 'Thurs', value: 18 },
    { label: 'Fri', value: 25 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 22 },
  ];
  const loading = false;
  return (
    <Card
      loading={loading}
      style={{ height: '100%' }}
      bodyStyle={{ height: '90%' }}
      title={intl.formatMessage({
        defaultMessage: 'Incidents by day of week',
        id: 'LPtzWr',
      })}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('dayOfWeekBar')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <BarGraph
        data={data}
        emptyLabel="No incidents"
        margin={{
          bottom: 30,
          top: 10,
          right: 10,
          left: 20,
        }}
      />
    </Card>
  );
};

export default DayOfWeekBar;
