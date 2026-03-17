import { RecidivismDonutChart } from '#/components/dashboard-widgets';
import {
  AlertOutlined,
  ClockCircleOutlined,
  FireOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface RepeatOffenderInsightsProps {
  insights:
    | PoliceHubDashboardQuery['policeHubDashboard']['repeatOffenderInsights']
    | undefined;
  loading: boolean;
}

const rankColors = ['#d4af37', '#a8a9ad', '#cd7f32', '#6c757d', '#6c757d'];
const rankLabels = ['#1', '#2', '#3', '#4', '#5'];

const getPriorityColor = (score: null | number) => {
  if (score === null) return 'default';
  if (score >= 75) return 'error';
  if (score >= 50) return 'warning';
  return 'processing';
};

const getLastSeenColor = (days: null | number) => {
  if (days === null) return undefined;
  if (days <= 7) return '#f5222d';
  if (days <= 30) return '#fa8c16';
  return '#52c41a';
};

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

  const formatLastSeen = (days: null | number) => {
    if (days === null) return '-';
    if (days === 0) return intl.formatMessage({ defaultMessage: 'Today' });
    if (days === 1) return intl.formatMessage({ defaultMessage: '1d ago' });
    return intl.formatMessage({ defaultMessage: '{days}d ago' }, { days });
  };

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
          <RecidivismDonutChart
            distribution={
              insights.recidivismDistribution as {
                period0to30?: number;
                period31to90?: number;
                period91to180?: number;
                period180plus?: number;
              }
            }
          />
        </>
      )}

      {/* Top 5 by Frequency */}
      {insights.topByFrequency && insights.topByFrequency.length > 0 && (
        <>
          <Typography.Title
            level={5}
            style={{ marginBottom: 12, marginTop: 24 }}
          >
            {intl.formatMessage({
              defaultMessage: 'Top 5 Most Frequent Offenders',
            })}
          </Typography.Title>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            {insights.topByFrequency.slice(0, 5).map((offender, index) => (
              <div
                key={offender.sharedOffenderId}
                onClick={() =>
                  navigate(
                    `/app/police/offenders/view/${offender.sharedOffenderId}`
                  )
                }
                style={{
                  alignItems: 'flex-start',
                  background:
                    index === 0 ? 'rgba(245, 34, 45, 0.04)' : '#fafafa',
                  border: `1px solid ${index === 0 ? 'rgba(245, 34, 45, 0.2)' : '#f0f0f0'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 12,
                  padding: '10px 12px',
                  transition: 'background 0.2s',
                }}
              >
                {/* Rank badge */}
                <Avatar
                  size={32}
                  style={{
                    backgroundColor: rankColors[index],
                    flexShrink: 0,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {rankLabels[index]}
                </Avatar>

                {/* Main content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Space align="center" size={6} wrap>
                    {offender.policePriorityScore !== null &&
                      offender.policePriorityScore !== undefined && (
                        <Tag
                          color={getPriorityColor(offender.policePriorityScore)}
                          style={{ fontWeight: 600, margin: 0 }}
                        >
                          <AlertOutlined style={{ marginRight: 3 }} />
                          {intl.formatMessage(
                            { defaultMessage: '{score}/100' },
                            { score: offender.policePriorityScore }
                          )}
                        </Tag>
                      )}
                    <Badge
                      color={
                        offender.incidentCount >= 5 ? '#f5222d' : '#1677ff'
                      }
                      text={
                        <Typography.Text style={{ fontSize: 13 }}>
                          {offender.incidentCount >= 5 && (
                            <FireOutlined
                              style={{ color: '#f5222d', marginRight: 3 }}
                            />
                          )}
                          {intl.formatMessage(
                            { defaultMessage: '{count} incidents' },
                            { count: offender.incidentCount }
                          )}
                        </Typography.Text>
                      }
                    />
                  </Space>

                  {offender.aiSummary && (
                    <Tooltip title={offender.aiSummary}>
                      <Typography.Text
                        ellipsis
                        style={{
                          color: '#595959',
                          display: 'block',
                          fontSize: 12,
                          marginTop: 4,
                        }}
                        type="secondary"
                      >
                        {offender.aiSummary}
                      </Typography.Text>
                    </Tooltip>
                  )}
                </div>

                {/* Right stats */}
                <Space
                  direction="vertical"
                  size={4}
                  style={{
                    alignItems: 'flex-end',
                    flexShrink: 0,
                    textAlign: 'right',
                  }}
                >
                  <Typography.Text
                    style={{
                      color:
                        getLastSeenColor(offender.daysSinceLastIncident) ??
                        undefined,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    <ClockCircleOutlined style={{ marginRight: 3 }} />
                    {formatLastSeen(offender.daysSinceLastIncident)}
                  </Typography.Text>
                  {offender.affectedSchemes &&
                    offender.affectedSchemes.length > 0 && (
                      <Typography.Text
                        style={{ color: '#8c8c8c', fontSize: 11 }}
                      >
                        <TeamOutlined style={{ marginRight: 3 }} />
                        {intl.formatMessage(
                          { defaultMessage: '{count} schemes' },
                          { count: offender.affectedSchemes.length }
                        )}
                      </Typography.Text>
                    )}
                </Space>
              </div>
            ))}
          </Space>
        </>
      )}
    </Card>
  );
};

export default RepeatOffenderInsights;
