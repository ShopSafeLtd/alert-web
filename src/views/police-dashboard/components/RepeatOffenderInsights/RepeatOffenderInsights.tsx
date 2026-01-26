import {
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Statistic,
  Table,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

import RecidivismChart from './RecidivismChart';

interface RepeatOffenderInsightsProps {
  insights:
    | PoliceHubDashboardQuery['policeHubDashboard']['repeatOffenderInsights']
    | undefined;
  loading: boolean;
}

const RepeatOffenderInsights: React.FC<RepeatOffenderInsightsProps> = ({
  insights,
  loading,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Repeat Offender Analysis',
        })}
      >
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Repeat Offender Analysis',
        })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No repeat offender data available',
          })}
        />
      </Card>
    );
  }

  const topFrequencyColumns = [
    {
      dataIndex: 'policePriorityScore',
      key: 'priority',
      render: (score: null | number) => (score === null ? '-' : `${score}/100`),
      title: intl.formatMessage({ defaultMessage: 'Priority' }),
      width: 80,
    },
    {
      align: 'center' as const,
      dataIndex: 'incidentCount',
      key: 'incidents',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
      width: 80,
    },
    {
      dataIndex: 'daysSinceLastIncident',
      key: 'lastSeen',
      render: (days: null | number) => {
        if (days === null) return '-';
        if (days === 0) return intl.formatMessage({ defaultMessage: 'Today' });
        return intl.formatMessage({ defaultMessage: '{days}d ago' }, { days });
      },
      title: intl.formatMessage({ defaultMessage: 'Last Seen' }),
      width: 100,
    },
  ];

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Repeat Offender Analysis',
      })}
    >
      {/* Key Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col sm={8} xs={24}>
          <Statistic
            suffix={intl.formatMessage({ defaultMessage: '(3+ incidents)' })}
            title={intl.formatMessage({
              defaultMessage: 'Repeat Offenders',
            })}
            value={insights.totalRepeatOffenders}
          />
        </Col>
        <Col sm={8} xs={24}>
          <Statistic
            suffix={intl.formatMessage({ defaultMessage: '(5+ incidents)' })}
            title={intl.formatMessage({
              defaultMessage: 'High Frequency',
            })}
            value={insights.highFrequencyOffenders}
            valueStyle={{ color: '#f5222d' }}
          />
        </Col>
        <Col sm={8} xs={24}>
          <Statistic
            precision={0}
            suffix={intl.formatMessage({ defaultMessage: 'days' })}
            title={intl.formatMessage({
              defaultMessage: 'Avg Days Between',
            })}
            value={insights.averageDaysBetweenIncidents}
          />
        </Col>
      </Row>

      {/* Recidivism Distribution Chart */}
      {insights.recidivismDistribution && (
        <>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            {intl.formatMessage({
              defaultMessage: 'Recidivism Speed Distribution',
            })}
          </Typography.Title>
          <RecidivismChart
            distribution={
              insights.recidivismDistribution as Record<string, unknown>
            }
          />
        </>
      )}

      {/* Top 5 by Frequency */}
      {insights.topByFrequency && insights.topByFrequency.length > 0 && (
        <>
          <Typography.Title
            level={5}
            style={{ marginBottom: 16, marginTop: 24 }}
          >
            {intl.formatMessage({
              defaultMessage: 'Top 5 Most Frequent Offenders',
            })}
          </Typography.Title>
          <Table
            columns={topFrequencyColumns}
            dataSource={insights.topByFrequency.slice(0, 5)}
            onRow={(record) => ({
              onClick: () =>
                navigate(
                  `/app/police/offenders/view/${record.sharedOffenderId}`
                ),
              style: { cursor: 'pointer' },
            })}
            pagination={false}
            rowKey="sharedOffenderId"
            size="small"
          />
        </>
      )}
    </Card>
  );
};

export default RepeatOffenderInsights;
