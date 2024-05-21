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
        defaultMessage: 'Incidents by time of day',
        id: '9rgowk',
      })}
    >
      <BarGraph
        data={data}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No incidents',
          id: '7UNuAl',
        })}
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

export default DayOfWeekBar;
