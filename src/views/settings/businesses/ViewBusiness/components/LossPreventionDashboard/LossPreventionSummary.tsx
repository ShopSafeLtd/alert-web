import { KpiStatCard } from '#/components/dashboard-widgets';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Col, Row, Skeleton } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

interface LossPreventionSummaryProps {
  loading: boolean;
  summary:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['summary']
    | null
    | undefined;
}

const LossPreventionSummary: React.FC<LossPreventionSummaryProps> = ({
  loading,
  summary,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (loading && !summary) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <Col key={i} lg={3} md={6} sm={12} xs={24}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  const recoveryRateDisplay =
    summary?.recoveryRate !== null && summary?.recoveryRate !== undefined
      ? `${(summary.recoveryRate * 100).toFixed(1)}%`
      : null;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col lg={3} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: "Today's Incidents" })}
          value={summary?.todayCount ?? null}
        />
      </Col>
      <Col lg={3} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'This Week' })}
          trend={
            summary?.weeklyChange !== null &&
            summary?.weeklyChange !== undefined
              ? summary.weeklyChange
              : null
          }
          value={summary?.thisWeekCount ?? null}
        />
      </Col>
      <Col lg={3} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'This Month' })}
          value={summary?.thisMonthCount ?? null}
        />
      </Col>
      <Col lg={4} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Value Lost' })}
          value={
            summary?.totalValueLost !== null &&
            summary?.totalValueLost !== undefined
              ? intl.formatNumber(summary.totalValueLost, {
                  currency,
                  style: 'currency',
                })
              : null
          }
        />
      </Col>
      <Col lg={4} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Recovered' })}
          value={
            summary?.totalRecoveredValue !== null &&
            summary?.totalRecoveredValue !== undefined
              ? intl.formatNumber(summary.totalRecoveredValue, {
                  currency,
                  style: 'currency',
                })
              : null
          }
        />
      </Col>
      <Col lg={4} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Recovery Rate' })}
          value={recoveryRateDisplay}
        />
      </Col>
      <Col lg={3} md={6} sm={12} xs={24}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Active Bans' })}
          value={summary?.activeBansCount ?? null}
        />
      </Col>
    </Row>
  );
};

export default LossPreventionSummary;
