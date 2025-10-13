import { Card } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import BarGraph from '../../../../components/reports/graphs/barGraph';

interface Props {
  data: { label: string; value: number }[];
  loading: boolean;
}
const TargetedGoodsGraph = ({ data, loading }: Props) => {
  const intl = useIntl();

  return (
    <Card
      bodyStyle={{ height: '90%' }}
      loading={loading}
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Top 5 Targeted Goods',
      })}
    >
      <BarGraph
        data={data}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No incidents',
        })}
        margin={{
          bottom: 30,
          left: 20,
          right: 10,
          top: 10,
        }}
      />
    </Card>
  );
};

export default TargetedGoodsGraph;
