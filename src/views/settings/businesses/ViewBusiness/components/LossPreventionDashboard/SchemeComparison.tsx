import { KpiStatCard } from '#/components/dashboard-widgets';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Col, Empty, Row, Skeleton, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

interface SchemeComparisonProps {
  comparison:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['schemeComparison']
    | null
    | undefined;
  loading: boolean;
  schemeId: null | string | undefined;
}

const SchemeComparison: React.FC<SchemeComparisonProps> = ({
  comparison,
  loading,
  schemeId,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (!schemeId) {
    return (
      <Card
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Business Scheme Comparison',
        })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No scheme selected',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Business Scheme Comparison',
      })}
    >
      {loading && !comparison ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : comparison ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col md={12} xs={24}>
              <KpiStatCard
                loading={false}
                title={intl.formatMessage({ defaultMessage: 'Incident Rank' })}
                tooltip={intl.formatMessage(
                  { defaultMessage: 'Ranked #{rank} of {total} businesses' },
                  {
                    rank: comparison.incidentCountRank,
                    total: comparison.schemeBusinessCount,
                  }
                )}
                value={`#${comparison.incidentCountRank} of ${comparison.schemeBusinessCount}`}
              />
            </Col>
            <Col md={12} xs={24}>
              <KpiStatCard
                loading={false}
                title={intl.formatMessage({ defaultMessage: 'Value Rank' })}
                tooltip={intl.formatMessage(
                  { defaultMessage: 'Ranked #{rank} of {total} businesses' },
                  {
                    rank: comparison.valueRank,
                    total: comparison.schemeBusinessCount,
                  }
                )}
                value={`#${comparison.valueRank} of ${comparison.schemeBusinessCount}`}
              />
            </Col>
          </Row>

          {comparison.incidentCountPercentile !== null && (
            <Typography.Paragraph>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Better than {pct}% of businesses by incident count',
                },
                {
                  pct: (comparison.incidentCountPercentile * 100).toFixed(0),
                }
              )}
            </Typography.Paragraph>
          )}

          {comparison.valuePercentile !== null && (
            <Typography.Paragraph>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Better than {pct}% of businesses by value lost',
                },
                { pct: (comparison.valuePercentile * 100).toFixed(0) }
              )}
            </Typography.Paragraph>
          )}

          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            {comparison.schemeAvgIncidentCount !== null && (
              <Col md={12} xs={24}>
                <KpiStatCard
                  loading={false}
                  title={intl.formatMessage({
                    defaultMessage: 'Business Avg Incidents',
                  })}
                  value={comparison.schemeAvgIncidentCount.toFixed(1)}
                />
              </Col>
            )}
            {comparison.schemeAvgValueLost !== null && (
              <Col md={12} xs={24}>
                <KpiStatCard
                  loading={false}
                  title={intl.formatMessage({
                    defaultMessage: 'Business Avg Value Lost',
                  })}
                  value={intl.formatNumber(comparison.schemeAvgValueLost, {
                    currency,
                    style: 'currency',
                  })}
                />
              </Col>
            )}
          </Row>
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No comparison data available',
          })}
        />
      )}
    </Card>
  );
};

export default SchemeComparison;
