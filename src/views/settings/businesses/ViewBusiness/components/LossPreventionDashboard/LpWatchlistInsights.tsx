import {
  KpiStatCard,
  RecidivismDonutChart,
} from '#/components/dashboard-widgets';
import { Card, Col, Empty, List, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

interface LpWatchlistInsightsProps {
  insights:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['watchlistInsights']
    | null
    | undefined;
  loading: boolean;
}

const LpWatchlistInsights: React.FC<LpWatchlistInsightsProps> = ({
  insights,
  loading,
}) => {
  const intl = useIntl();

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Repeat Offender Insights' })}
    >
      {loading && !insights ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : insights ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={12}>
              <KpiStatCard
                loading={false}
                title={intl.formatMessage({
                  defaultMessage: 'Repeat Offenders',
                })}
                value={insights.totalRepeatOffenders}
              />
            </Col>
            <Col xs={12}>
              <KpiStatCard
                loading={false}
                title={intl.formatMessage({
                  defaultMessage: 'Avg Days Between',
                })}
                value={Math.round(insights.averageDaysBetweenIncidents)}
              />
            </Col>
          </Row>

          {insights.recidivismDistribution && (
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
          )}

          {insights.topByFrequency && insights.topByFrequency.length > 0 && (
            <>
              <Typography.Title level={5} style={{ marginTop: 16 }}>
                {intl.formatMessage({ defaultMessage: 'Top by Frequency' })}
              </Typography.Title>
              <List
                dataSource={insights.topByFrequency.slice(0, 3)}
                renderItem={(o, idx) => (
                  <List.Item>
                    <Typography.Text style={{ minWidth: 24 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: '{n}.' },
                        { n: idx + 1 }
                      )}
                    </Typography.Text>
                    <Typography.Text style={{ flex: 1, marginLeft: 8 }}>
                      {o.name ??
                        intl.formatMessage({ defaultMessage: 'Unknown' })}
                    </Typography.Text>
                    <Typography.Text strong>
                      {intl.formatMessage(
                        { defaultMessage: '{n} incidents' },
                        { n: o.incidentCount }
                      )}
                    </Typography.Text>
                  </List.Item>
                )}
                size="small"
              />
            </>
          )}
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No repeat offender data available',
          })}
        />
      )}
    </Card>
  );
};

export default LpWatchlistInsights;
