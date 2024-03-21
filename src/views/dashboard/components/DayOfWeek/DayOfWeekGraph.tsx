import React from 'react';
import { Card } from 'antd';
import { useIntl } from 'react-intl';
import BarGraph from '../../../../components/reports/graphs/barGraph';

interface Props {
  data: { label: string; value: number }[];
  loading: boolean;
}
const DayOfWeekBar = ({ data, loading }: Props) => {
  const intl = useIntl();

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
