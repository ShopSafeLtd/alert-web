import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Badge, Card, Empty, Skeleton, Table, Tag, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { StoreColleagueDashboardQuery } from '../../graphql/queries/__generated__/store-colleague-dashboard.generated';

type Incident = NonNullable<
  StoreColleagueDashboardQuery['storeColleagueDashboard']['recentIncidents']
>[number];

interface RecentIncidentsProps {
  incidents: Incident[] | null | undefined;
  loading: boolean;
}

const RecentIncidents: React.FC<RecentIncidentsProps> = ({
  incidents,
  loading,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const columns = [
    {
      dataIndex: 'reference',
      key: 'reference',
      render: (ref: null | number) => (
        <Typography.Text code>
          {ref ?? intl.formatMessage({ defaultMessage: '—' })}
        </Typography.Text>
      ),
      title: intl.formatMessage({ defaultMessage: 'Ref' }),
      width: 80,
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: (d: Date) => new Date(d).toLocaleDateString(),
      title: intl.formatMessage({ defaultMessage: 'Date' }),
      width: 100,
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (v: null | number) =>
        v !== null && v !== undefined
          ? intl.formatNumber(v, { currency, style: 'currency' })
          : intl.formatMessage({ defaultMessage: '—' }),
      title: intl.formatMessage({ defaultMessage: 'Value' }),
      width: 100,
    },
    {
      dataIndex: 'approved',
      key: 'approved',
      render: (approved: boolean | null) =>
        approved ? (
          <Badge
            status="success"
            text={intl.formatMessage({ defaultMessage: 'Approved' })}
          />
        ) : (
          <Badge
            status="warning"
            text={intl.formatMessage({ defaultMessage: 'Pending' })}
          />
        ),
      title: intl.formatMessage({ defaultMessage: 'Status' }),
      width: 100,
    },
    {
      dataIndex: 'crimeTypes',
      key: 'crimeTypes',
      render: (types: string[]) =>
        types.map((t) => (
          <Tag key={t} style={{ marginBottom: 2 }}>
            {t}
          </Tag>
        )),
      title: intl.formatMessage({ defaultMessage: 'Crime Types' }),
    },
    {
      dataIndex: 'offenderCount',
      key: 'offenderCount',
      title: intl.formatMessage({ defaultMessage: 'Offenders' }),
      width: 80,
    },
  ];

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Recent Incidents' })}
    >
      {loading && !incidents ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : !incidents || incidents.length === 0 ? (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No recent incidents',
          })}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={incidents}
          onRow={(record) => ({
            onClick: () => navigate(`/app/incidents/view/${record.id}`),
            style: { cursor: 'pointer' },
          })}
          pagination={false}
          rowKey="id"
          scroll={{ x: 600 }}
          size="small"
        />
      )}
    </Card>
  );
};

export default RecentIncidents;
