import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Empty, Segmented, Skeleton, Table, Tag } from 'antd';
import { LpStockLossBusinessHotspotsOrderBy } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

type BusinessHotspot = NonNullable<
  LpStockLossReportQuery['lpStockLossReport']['businessHotspots']
>[number];

interface BusinessHotspotsProps {
  data: BusinessHotspot[];
  loading: boolean;
  onOrderByChange?: (orderBy: LpStockLossBusinessHotspotsOrderBy) => void;
  orderBy?: LpStockLossBusinessHotspotsOrderBy;
}

const recoveryRateColor = (rate: number): string => {
  const pct = rate * 100;
  if (pct < 20) return 'error';
  if (pct <= 60) return 'warning';
  return 'success';
};

const BusinessHotspots: React.FC<BusinessHotspotsProps> = ({
  data,
  loading,
  onOrderByChange,
  orderBy,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  const tableData = useMemo(
    () => data.map((item) => ({ ...item, key: item.id })),
    [data]
  );

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Business' }),
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
      title: intl.formatMessage({ defaultMessage: 'Value Recovered' }),
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
      render: (v: number) => (
        <Tag color={recoveryRateColor(v)}>
          {intl.formatNumber(v, {
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
            style: 'percent',
          })}
        </Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Recovery Rate' }),
    },
    {
      dataIndex: 'topTargetedItems',
      key: 'topTargetedItems',
      render: (items: string[]) => items.slice(0, 5).join(', '),
      title: intl.formatMessage({ defaultMessage: 'Top Targeted Items' }),
    },
  ];

  const sortSegmented = (
    <Segmented
      onChange={(v) =>
        onOrderByChange?.(v as LpStockLossBusinessHotspotsOrderBy)
      }
      options={[
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Lost' }),
          value: LpStockLossBusinessHotspotsOrderBy.TotalValue,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Incidents' }),
          value: LpStockLossBusinessHotspotsOrderBy.IncidentCount,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Recovered' }),
          value: LpStockLossBusinessHotspotsOrderBy.TotalValueRecovered,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Net Value' }),
          value: LpStockLossBusinessHotspotsOrderBy.NetValue,
        },
      ]}
      value={orderBy ?? LpStockLossBusinessHotspotsOrderBy.TotalValue}
    />
  );

  return (
    <Card
      extra={onOrderByChange ? sortSegmented : undefined}
      title={intl.formatMessage({ defaultMessage: 'Business Hotspots' })}
    >
      {loading && data.length === 0 ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : data.length === 0 ? (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No data available',
          })}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
          size="small"
        />
      )}
    </Card>
  );
};

export default BusinessHotspots;
