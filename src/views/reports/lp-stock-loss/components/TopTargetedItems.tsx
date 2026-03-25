import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Empty, Segmented, Skeleton, Table, Tag } from 'antd';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

import { LpStockLossTopItemsOrderBy } from '../graphql/__generated__/lp-stock-loss-report.generated';

type TopTargetedItem = NonNullable<
  LpStockLossReportQuery['lpStockLossReport']['topTargetedItems']
>[number];

interface TopTargetedItemsProps {
  data: TopTargetedItem[];
  loading: boolean;
  onOrderByChange?: (orderBy: LpStockLossTopItemsOrderBy) => void;
  onSelectBusiness?: (businessId: string) => void;
  onSelectStockItem?: (stockItemId: string, name: null | string) => void;
  orderBy?: LpStockLossTopItemsOrderBy;
}

const recoveryRateColor = (rate: number): string => {
  const pct = rate * 100;
  if (pct < 20) return 'error';
  if (pct <= 60) return 'warning';
  return 'success';
};

const TopTargetedItems: React.FC<TopTargetedItemsProps> = ({
  data,
  loading,
  onOrderByChange,
  onSelectBusiness,
  onSelectStockItem,
  orderBy,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  const tableData = useMemo(
    () => data.map((item) => ({ ...item, key: item.stockItemId })),
    [data]
  );

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (v: null | string) => v ?? '—',
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    {
      dataIndex: 'goodsTypeName',
      key: 'goodsTypeName',
      render: (v: null | string) => v ?? '—',
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
      dataIndex: 'topBusinesses',
      key: 'topBusinesses',
      render: (businesses: TopTargetedItem['topBusinesses']) => (
        <>
          {businesses.slice(0, 3).map((b) => (
            <Tag
              key={b.id}
              onClick={
                onSelectBusiness
                  ? (e) => {
                      e.stopPropagation();
                      onSelectBusiness(b.id);
                    }
                  : undefined
              }
              style={onSelectBusiness ? { cursor: 'pointer' } : undefined}
            >
              {b.name}
            </Tag>
          ))}
          {businesses.length > 3 && (
            <Tag>
              {intl.formatMessage(
                { defaultMessage: '+{n}' },
                { n: businesses.length - 3 }
              )}
            </Tag>
          )}
        </>
      ),
      title: intl.formatMessage({ defaultMessage: 'Top Businesses' }),
    },
  ];

  const orderBySegmented = (
    <Segmented
      onChange={(v) => onOrderByChange?.(v as LpStockLossTopItemsOrderBy)}
      options={[
        {
          label: intl.formatMessage({ defaultMessage: 'By Incidents' }),
          value: LpStockLossTopItemsOrderBy.IncidentCount,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Lost' }),
          value: LpStockLossTopItemsOrderBy.TotalValue,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Recovered' }),
          value: LpStockLossTopItemsOrderBy.TotalValueRecovered,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Net Value' }),
          value: LpStockLossTopItemsOrderBy.NetValue,
        },
      ]}
      value={orderBy ?? LpStockLossTopItemsOrderBy.IncidentCount}
    />
  );

  return (
    <Card
      extra={onOrderByChange ? orderBySegmented : undefined}
      title={intl.formatMessage({ defaultMessage: 'Top Targeted Items' })}
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
          onRow={(record) => ({
            onClick: () =>
              onSelectStockItem?.(record.stockItemId, record.name ?? null),
            style: onSelectStockItem ? { cursor: 'pointer' } : undefined,
          })}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
          size="small"
        />
      )}
    </Card>
  );
};

export default TopTargetedItems;
