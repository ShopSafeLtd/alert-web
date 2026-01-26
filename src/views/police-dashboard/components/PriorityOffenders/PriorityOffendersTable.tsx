import { faEye } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Empty,
  Skeleton,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

import PriorityBadge from './PriorityBadge';
import ThreatBadge from './ThreatBadge';

interface PriorityOffendersTableProps {
  loading: boolean;
  offenders:
    | PoliceHubDashboardQuery['policeHubDashboard']['topOffenders']
    | undefined;
}

const PriorityOffendersTable: React.FC<PriorityOffendersTableProps> = ({
  loading,
  offenders,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const columns = [
    {
      dataIndex: 'policePriorityScore',
      key: 'priority',
      render: (score: null | number) => <PriorityBadge score={score} />,
      title: intl.formatMessage({ defaultMessage: 'Priority' }),
      width: 120,
    },
    {
      dataIndex: 'threatLevel',
      key: 'threat',
      render: (level: 'HIGH' | 'LOW' | 'MEDIUM' | null) => (
        <ThreatBadge level={level} />
      ),
      title: intl.formatMessage({ defaultMessage: 'Threat' }),
      width: 130,
    },
    {
      align: 'center' as const,
      dataIndex: 'incidentCount',
      key: 'incidents',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
      width: 100,
    },
    {
      dataIndex: 'daysSinceLastIncident',
      key: 'lastActive',
      render: (days: null | number) => {
        if (days === null || days === undefined) {
          return (
            <Typography.Text type="secondary">
              {intl.formatMessage({ defaultMessage: 'Unknown' })}
            </Typography.Text>
          );
        }
        if (days === 0) {
          return (
            <Typography.Text strong style={{ color: '#f5222d' }}>
              {intl.formatMessage({ defaultMessage: 'Today' })}
            </Typography.Text>
          );
        }
        return intl.formatMessage(
          { defaultMessage: '{days} days ago' },
          { days }
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Last Active' }),
      width: 120,
    },
    {
      dataIndex: 'aiSummary',
      ellipsis: true,
      key: 'summary',
      render: (summary: null | string) => {
        if (!summary) {
          return (
            <Typography.Text italic type="secondary">
              {intl.formatMessage({ defaultMessage: 'No summary available' })}
            </Typography.Text>
          );
        }
        return (
          <Tooltip placement="topLeft" title={summary}>
            <Typography.Text>{summary}</Typography.Text>
          </Tooltip>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Summary' }),
    },
    {
      align: 'center' as const,
      key: 'actions',
      render: (_: unknown, record: { sharedOffenderId: string }) => (
        <Button
          icon={<FontAwesomeIcon icon={faEye} />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/app/police/offenders/view/${record.sharedOffenderId}`);
          }}
          type="link"
        >
          {intl.formatMessage({ defaultMessage: 'View' })}
        </Button>
      ),
      title: intl.formatMessage({ defaultMessage: 'Actions' }),
      width: 100,
    },
  ];

  if (loading) {
    return (
      <Card
        style={{ marginBottom: 24 }}
        title={intl.formatMessage({ defaultMessage: '🎯 Priority Offenders' })}
      >
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    );
  }

  if (!offenders || offenders.length === 0) {
    return (
      <Card
        style={{ marginBottom: 24 }}
        title={intl.formatMessage({ defaultMessage: '🎯 Priority Offenders' })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage:
              'No high-risk individuals found. Try adjusting your filters.',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      style={{ marginBottom: 24 }}
      title={intl.formatMessage({ defaultMessage: '🎯 Priority Offenders' })}
    >
      <Table
        columns={columns}
        dataSource={offenders.slice(0, 10)}
        onRow={(record) => ({
          onClick: () =>
            navigate(`/app/police/offenders/view/${record.sharedOffenderId}`),
          style: { cursor: 'pointer' },
        })}
        pagination={false}
        rowKey="sharedOffenderId"
      />
    </Card>
  );
};

export default PriorityOffendersTable;
