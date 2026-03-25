import { KpiStatCard } from '#/components/dashboard-widgets';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Col, Row, Skeleton } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

interface LpStockLossSummaryProps {
  loading: boolean;
  summary:
    | LpStockLossReportQuery['lpStockLossReport']['summary']
    | null
    | undefined;
}

const LpStockLossSummary: React.FC<LpStockLossSummaryProps> = ({
  loading,
  summary,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (loading && !summary) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <Col key={i} lg={6} sm={12} xs={24} xxl={3}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  const recoveryRatePct =
    summary?.recoveryRate !== null && summary?.recoveryRate !== undefined
      ? summary.recoveryRate * 100
      : null;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Total Incidents' })}
          trend={summary?.periodIncidentChange ?? null}
          value={summary?.totalIncidents ?? null}
        />
      </Col>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Value Lost' })}
          trend={summary?.periodValueChange ?? null}
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
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Value Recovered' })}
          value={
            summary?.totalValueRecovered !== null &&
            summary?.totalValueRecovered !== undefined
              ? intl.formatNumber(summary.totalValueRecovered, {
                  currency,
                  style: 'currency',
                })
              : null
          }
        />
      </Col>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Recovery Rate' })}
          value={
            recoveryRatePct === null ? null : `${recoveryRatePct.toFixed(1)}%`
          }
        />
      </Col>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Unique Items Stolen' })}
          value={summary?.uniqueItemsStolen ?? null}
        />
      </Col>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Unique Offenders' })}
          value={summary?.uniqueOffenders ?? null}
        />
      </Col>
      <Col lg={6} sm={12} style={{ display: 'flex' }} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Businesses Affected' })}
          value={summary?.businessesAffected ?? null}
        />
      </Col>
    </Row>
  );
};

export default LpStockLossSummary;
