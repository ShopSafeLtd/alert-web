import React from 'react';
import { Button, Card } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import BarGraph from '../../../../components/reports/graphs/barGraph';

const TargetedGoodsGraph = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const data = [
    { label: 'Good 1', value: 10 },
    { label: 'Good 2', value: 15 },
    { label: 'Good 3', value: 20 },
    { label: 'Good 4', value: 18 },
    { label: 'Good 5', value: 2 },
  ];
  return (
    <Card
      style={{ height: '100%' }}
      bodyStyle={{ height: '90%' }}
      title={intl.formatMessage({
        defaultMessage: 'Top 5 Targeted Goods',
        id: '4Zd7Kq',
      })}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('targetedGoods')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <BarGraph
        data={data}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Targeted Goods',
          id: 'ZWF2ZV',
        })}
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

export default TargetedGoodsGraph;
