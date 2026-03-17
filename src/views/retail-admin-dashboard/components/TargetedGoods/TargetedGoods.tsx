import type { AgChartOptions } from 'ag-charts-community';

import { useStoreState } from '#/state';
import { TableOutlined } from '@ant-design/icons';
import { AgCharts } from 'ag-charts-react';
import { Button, Card, Empty, Modal, Skeleton, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

type GoodsItem = NonNullable<
  RetailAdminDashboardQuery['retailAdminDashboard']['targetedGoods']
>[number];

interface TargetedGoodsProps {
  data: GoodsItem[];
  loading: boolean;
}

const TargetedGoods: React.FC<TargetedGoodsProps> = ({ data, loading }) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const [modalOpen, setModalOpen] = useState(false);

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'left', type: 'category' },
        {
          position: 'bottom',
          title: { text: intl.formatMessage({ defaultMessage: 'Count' }) },
          type: 'number',
        },
      ],
      data: [...data].sort((a, b) => b.count - a.count).slice(0, 5),
      series: [
        {
          direction: 'horizontal',
          fill: '#eb2f96',
          stroke: '#eb2f96',
          type: 'bar',
          xKey: 'name',
          yKey: 'count',
          yName: intl.formatMessage({ defaultMessage: 'Count' }),
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [data, darkMode, intl]
  );

  const tableData = useMemo(
    () =>
      [...data]
        .sort((a, b) => b.count - a.count)
        .map((item, i) => ({ ...item, key: i })),
    [data]
  );

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Item' }),
    },
    {
      dataIndex: 'count',
      key: 'count',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
    },
    {
      dataIndex: 'totalValue',
      key: 'totalValue',
      title: intl.formatMessage({ defaultMessage: 'Total Value' }),
    },
  ];

  return (
    <>
      <Card
        extra={
          <Button
            icon={<TableOutlined />}
            onClick={() => setModalOpen(true)}
            size="small"
            type="text"
          />
        }
        style={{ height: '100%' }}
        title={intl.formatMessage({ defaultMessage: 'Targeted Goods' })}
      >
        <Typography.Text
          style={{ display: 'block', fontSize: 12, marginBottom: 8 }}
          type="secondary"
        >
          {intl.formatMessage({
            defaultMessage:
              'Note: value data may be unavailable for some goods (shows 0 when not reported).',
          })}
        </Typography.Text>
        {loading && data.length === 0 ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : data.length === 0 ? (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No data available',
            })}
          />
        ) : (
          <div style={{ height: 300, width: '100%' }}>
            <AgCharts options={chartOptions} />
          </div>
        )}
      </Card>

      <Modal
        footer={null}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        title={intl.formatMessage({ defaultMessage: 'Targeted Goods' })}
        width={500}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          size="small"
        />
      </Modal>
    </>
  );
};

export default TargetedGoods;
