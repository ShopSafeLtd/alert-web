import { Card, Empty, Skeleton, Table, Tag, Typography } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface VehiclesTableProps {
  loading: boolean;
  vehicles:
    | PoliceHubDashboardQuery['policeHubDashboard']['vehiclesOfInterest']
    | undefined;
}

const VehiclesTable: React.FC<VehiclesTableProps> = ({ loading, vehicles }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  type VehicleSummary = NonNullable<
    PoliceHubDashboardQuery['policeHubDashboard']['vehiclesOfInterest']
  >[number];

  const columns = [
    {
      dataIndex: 'registration',
      key: 'registration',
      render: (reg: null | string) => (
        <Typography.Text strong>
          {reg || intl.formatMessage({ defaultMessage: 'Unknown' })}
        </Typography.Text>
      ),
      title: intl.formatMessage({ defaultMessage: 'Registration' }),
      width: 130,
    },
    {
      key: 'makeModel',
      render: (_: unknown, record: VehicleSummary) => {
        const make = record.make || '';
        const model = record.model || '';
        const display =
          [make, model].filter(Boolean).join(' ') ||
          intl.formatMessage({ defaultMessage: 'Unknown' });
        return <Typography.Text>{display}</Typography.Text>;
      },
      title: intl.formatMessage({ defaultMessage: 'Make & Model' }),
      width: 150,
    },
    {
      dataIndex: 'color',
      key: 'color',
      render: (color: null | string) => (
        <Tag>{color || intl.formatMessage({ defaultMessage: 'Unknown' })}</Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Color' }),
      width: 100,
    },
    {
      align: 'center' as const,
      dataIndex: 'incidentCount',
      key: 'incidents',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
      width: 90,
    },
    {
      align: 'center' as const,
      dataIndex: 'associatedOffenderCount',
      key: 'offenders',
      title: intl.formatMessage({ defaultMessage: 'Offenders' }),
      width: 90,
    },
    {
      dataIndex: 'lastSeenDate',
      key: 'lastSeen',
      render: (date: null | string) => {
        if (!date) {
          return (
            <Typography.Text type="secondary">
              {intl.formatMessage({ defaultMessage: 'Unknown' })}
            </Typography.Text>
          );
        }
        try {
          return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
          return date;
        }
      },
      title: intl.formatMessage({ defaultMessage: 'Last Seen' }),
      width: 120,
    },
    {
      align: 'center' as const,
      dataIndex: 'policePriorityScore',
      key: 'priority',
      render: (score: null | number) => (
        <Typography.Text strong>
          {score === null
            ? intl.formatMessage({ defaultMessage: '-' })
            : intl.formatMessage({ defaultMessage: '{score}/100' }, { score })}
        </Typography.Text>
      ),
      title: intl.formatMessage({ defaultMessage: 'Priority' }),
      width: 80,
    },
  ];

  if (loading) {
    return (
      <Card
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Vehicles of Interest',
        })}
      >
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <Card
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Vehicles of Interest',
        })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No vehicles of interest tracked',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Vehicles of Interest',
      })}
    >
      <Table
        columns={columns}
        dataSource={vehicles.slice(0, 5)}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '8px 16px' }}>
              {record.aiSummary && (
                <div style={{ marginBottom: 8 }}>
                  <Typography.Text strong>
                    {intl.formatMessage({ defaultMessage: 'Summary:' })}
                  </Typography.Text>
                  <Typography.Text style={{ marginLeft: 4 }}>
                    {record.aiSummary}
                  </Typography.Text>
                </div>
              )}
              {record.aiUsagePatterns && (
                <div>
                  <Typography.Text strong>
                    {intl.formatMessage({ defaultMessage: 'Usage Patterns:' })}
                  </Typography.Text>
                  <Typography.Text style={{ marginLeft: 4 }}>
                    {record.aiUsagePatterns}
                  </Typography.Text>
                </div>
              )}
              {!record.aiSummary && !record.aiUsagePatterns && (
                <Typography.Text italic type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'No additional details available',
                  })}
                </Typography.Text>
              )}
            </div>
          ),
        }}
        onRow={(record) => ({
          onClick: () =>
            navigate(`/app/police/vehicles/view/${record.sharedVehicleId}`),
          style: { cursor: 'pointer' },
        })}
        pagination={false}
        rowKey="sharedVehicleId"
        size="small"
      />
    </Card>
  );
};

export default VehiclesTable;
