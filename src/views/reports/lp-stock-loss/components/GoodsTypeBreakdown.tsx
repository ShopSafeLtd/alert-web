import type { AgChartOptions } from 'ag-charts-community';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import {
  Card,
  Col,
  Empty,
  Row,
  Segmented,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import { LpStockLossGoodsTypeOrderBy } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

type GoodsTypeBreakdownItem = NonNullable<
  LpStockLossReportQuery['lpStockLossReport']['goodsTypeBreakdown']
>[number];

interface GoodsTypeBreakdownProps {
  data: GoodsTypeBreakdownItem[];
  loading: boolean;
  onOrderByChange?: (orderBy: LpStockLossGoodsTypeOrderBy) => void;
  orderBy?: LpStockLossGoodsTypeOrderBy;
}

const GoodsTypeBreakdown: React.FC<GoodsTypeBreakdownProps> = ({
  data,
  loading,
  onOrderByChange,
  orderBy,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'bottom', type: 'category' },
        { position: 'left', type: 'number' },
      ],
      data: [...data].sort((a, b) => b.totalValueLost - a.totalValueLost),
      series: [
        {
          fill: '#1890ff',
          stroke: '#1890ff',
          type: 'bar',
          xKey: 'goodsTypeName',
          yKey: 'totalValueLost',
          yName: intl.formatMessage({ defaultMessage: 'Value Lost' }),
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [data, darkMode, intl]
  );

  const tableData = useMemo(
    () => data.map((item) => ({ ...item, key: item.goodsTypeId })),
    [data]
  );

  const expandedRowRender = (record: GoodsTypeBreakdownItem) => (
    <Row gutter={16}>
      <Col md={12} xs={24}>
        <Typography.Title level={5} style={{ marginBottom: 8 }}>
          {intl.formatMessage({ defaultMessage: 'Top Items' })}
        </Typography.Title>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              render: (v: null | string) => v ?? '—',
              title: intl.formatMessage({ defaultMessage: 'Item' }),
            },
            {
              dataIndex: 'incidentCount',
              key: 'incidentCount',
              title: intl.formatMessage({ defaultMessage: 'Incidents' }),
            },
          ]}
          dataSource={record.topItems.map((t, i) => ({ ...t, key: i }))}
          pagination={false}
          size="small"
        />
      </Col>
      {record.monthlyTrend.length > 0 && (
        <Col md={12} xs={24}>
          <Typography.Title level={5} style={{ marginBottom: 8 }}>
            {intl.formatMessage({ defaultMessage: 'Monthly Trend' })}
          </Typography.Title>
          <div style={{ height: 320 }}>
            <AgCharts
              options={{
                axes: [
                  { position: 'bottom', type: 'category' },
                  { position: 'left', type: 'number' },
                ],
                data: record.monthlyTrend,
                series: [
                  {
                    type: 'line',
                    xKey: 'month',
                    yKey: 'count',
                    yName: intl.formatMessage({ defaultMessage: 'Incidents' }),
                  },
                ],
                theme: darkMode ? 'ag-default-dark' : 'ag-default',
              }}
            />
          </div>
        </Col>
      )}
    </Row>
  );

  const sortSegmented = (
    <Segmented
      onChange={(v) => onOrderByChange?.(v as LpStockLossGoodsTypeOrderBy)}
      options={[
        {
          label: intl.formatMessage({ defaultMessage: 'By Incidents' }),
          value: LpStockLossGoodsTypeOrderBy.IncidentCount,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Lost' }),
          value: LpStockLossGoodsTypeOrderBy.TotalValue,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Recovered' }),
          value: LpStockLossGoodsTypeOrderBy.TotalValueRecovered,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Net Value' }),
          value: LpStockLossGoodsTypeOrderBy.NetValue,
        },
      ]}
      value={orderBy ?? LpStockLossGoodsTypeOrderBy.IncidentCount}
    />
  );

  return (
    <Card
      extra={onOrderByChange ? sortSegmented : undefined}
      title={intl.formatMessage({ defaultMessage: 'Goods Type Breakdown' })}
    >
      {loading && data.length === 0 ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : data.length === 0 ? (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No data available',
          })}
        />
      ) : (
        <>
          <div style={{ height: 320, marginBottom: 24 }}>
            <AgCharts options={chartOptions} />
          </div>
          <Table
            columns={[
              {
                dataIndex: 'goodsTypeName',
                key: 'goodsTypeName',
                title: intl.formatMessage({ defaultMessage: 'Goods Type' }),
              },
              {
                dataIndex: 'incidentCount',
                key: 'incidentCount',
                title: intl.formatMessage({ defaultMessage: 'Incidents' }),
              },
              {
                dataIndex: 'totalValueLost',
                key: 'totalValueLost',
                render: (v: number) =>
                  intl.formatNumber(v, { currency, style: 'currency' }),
                title: intl.formatMessage({ defaultMessage: 'Value Lost' }),
              },
              {
                dataIndex: 'totalValueRecovered',
                key: 'totalValueRecovered',
                render: (v: number) =>
                  intl.formatNumber(v, { currency, style: 'currency' }),
                title: intl.formatMessage({
                  defaultMessage: 'Value Recovered',
                }),
              },
              {
                dataIndex: 'netValueLost',
                key: 'netValueLost',
                render: (v: number) =>
                  intl.formatNumber(v, { currency, style: 'currency' }),
                title: intl.formatMessage({ defaultMessage: 'Net Value Lost' }),
              },
              {
                dataIndex: 'recoveryRate',
                key: 'recoveryRate',
                render: (v: number) => `${(v * 100).toFixed(1)}%`,
                title: intl.formatMessage({ defaultMessage: 'Recovery Rate' }),
              },
            ]}
            dataSource={tableData}
            expandable={{ expandedRowRender }}
            pagination={false}
            size="small"
          />
        </>
      )}
    </Card>
  );
};

export default GoodsTypeBreakdown;
