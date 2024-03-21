import React from 'react';
import { Button, Card } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import BarGraph from '../../../../components/reports/graphs/barGraph';

const TimeOfDay = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const data = [
    { label: '0', value: 10 },
    { label: '1', value: 15 },
    { label: '2', value: 20 },
    { label: '3', value: 18 },
    { label: '4', value: 2 },
    { label: '5', value: 10 },
    { label: '6', value: 15 },
    { label: '7', value: 20 },
    { label: '8', value: 18 },
    { label: '9', value: 2 },
    { label: '10', value: 10 },
    { label: '11', value: 15 },
    { label: '12', value: 20 },
    { label: '13', value: 18 },
    { label: '14', value: 2 },
    { label: '15', value: 10 },
    { label: '16', value: 15 },
    { label: '17', value: 20 },
    { label: '18', value: 18 },
    { label: '19', value: 2 },
    { label: '20', value: 10 },
    { label: '21', value: 15 },
    { label: '22', value: 20 },
    { label: '23', value: 18 },
  ];
  return (
    <Card
      style={{ height: '100%' }}
      bodyStyle={{ height: '90%' }}
      title={intl.formatMessage({
        defaultMessage: 'Incidents by time of day',
        id: '9rgowk',
      })}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('timeOfDayBar')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <BarGraph
        data={data}
        emptyLabel="No incidents"
        margin={{
          bottom: 40,
          top: 10,
          right: 10,
          left: 20,
        }}
        simplifyGrid
        bottomLabel="(Hr)"
      />
    </Card>
  );
};

export default TimeOfDay;
