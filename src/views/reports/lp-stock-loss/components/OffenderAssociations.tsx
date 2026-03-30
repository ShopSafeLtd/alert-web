import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Empty, Segmented, Skeleton, Table, Tag } from 'antd';
import { LpStockLossOffenderOrderBy } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

type OffenderAssociation = NonNullable<
  LpStockLossReportQuery['lpStockLossReport']['offenderAssociations']
>[number];

interface OffenderAssociationsProps {
  data: OffenderAssociation[];
  loading: boolean;
  onOrderByChange?: (orderBy: LpStockLossOffenderOrderBy) => void;
  orderBy?: LpStockLossOffenderOrderBy;
}

const TagList: React.FC<{ items: string[] }> = ({ items }) => {
  const intl = useIntl();
  return (
    <>
      {items.slice(0, 3).map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
      {items.length > 3 && (
        <Tag>
          {intl.formatMessage(
            { defaultMessage: '+{n}' },
            { n: items.length - 3 }
          )}
        </Tag>
      )}
    </>
  );
};

const OffenderAssociations: React.FC<OffenderAssociationsProps> = ({
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
      render: (v: null | string) =>
        v ?? intl.formatMessage({ defaultMessage: 'Unknown' }),
      title: intl.formatMessage({ defaultMessage: 'Offender' }),
    },
    {
      dataIndex: 'incidentCount',
      key: 'incidentCount',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
    },
    {
      dataIndex: 'itemsTargeted',
      key: 'itemsTargeted',
      render: (items: string[]) => <TagList items={items} />,
      title: intl.formatMessage({ defaultMessage: 'Items Targeted' }),
    },
    {
      dataIndex: 'businessesTargeted',
      key: 'businessesTargeted',
      render: (items: string[]) => <TagList items={items} />,
      title: intl.formatMessage({ defaultMessage: 'Businesses Targeted' }),
    },
    {
      dataIndex: 'totalValueAssociated',
      key: 'totalValueAssociated',
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
  ];

  const sortSegmented = (
    <Segmented
      onChange={(v) => onOrderByChange?.(v as LpStockLossOffenderOrderBy)}
      options={[
        {
          label: intl.formatMessage({ defaultMessage: 'By Incidents' }),
          value: LpStockLossOffenderOrderBy.IncidentCount,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Lost' }),
          value: LpStockLossOffenderOrderBy.TotalValue,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Value Recovered' }),
          value: LpStockLossOffenderOrderBy.TotalValueRecovered,
        },
        {
          label: intl.formatMessage({ defaultMessage: 'By Net Value' }),
          value: LpStockLossOffenderOrderBy.NetValue,
        },
      ]}
      value={orderBy ?? LpStockLossOffenderOrderBy.IncidentCount}
    />
  );

  return (
    <Card
      extra={onOrderByChange ? sortSegmented : undefined}
      title={intl.formatMessage({ defaultMessage: 'Offender Associations' })}
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
          scroll={{ x: 800 }}
          size="small"
        />
      )}
    </Card>
  );
};

export default OffenderAssociations;
