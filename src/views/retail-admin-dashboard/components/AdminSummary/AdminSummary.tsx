import { KpiStatCard } from '#/components/dashboard-widgets';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Col, Row, Skeleton } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

interface AdminSummaryProps {
  loading: boolean;
  summary:
    | RetailAdminDashboardQuery['retailAdminDashboard']['summary']
    | null
    | undefined;
}

const AdminSummary: React.FC<AdminSummaryProps> = ({ loading, summary }) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (loading && !summary) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col key={i} lg={6} sm={12} xs={24} xxl={3}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  const repeatFraction =
    summary !== null &&
    summary !== undefined &&
    summary.repeatOffenders !== null &&
    summary.activeOffenders !== null
      ? `${summary.repeatOffenders} of ${summary.activeOffenders}`
      : null;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Total Incidents' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Total number of incidents logged in the last 30 days. The trend shows the percentage change compared to the previous 30-day period — a rise indicates more incidents.',
          })}
          trend={
            summary?.periodIncidentChange !== null &&
            summary?.periodIncidentChange !== undefined
              ? summary.periodIncidentChange
              : null
          }
          value={summary?.totalIncidents ?? null}
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Value Lost' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Total estimated value of goods lost to theft or damage in the last 30 days. The trend shows the percentage change compared to the previous 30-day period — a rise indicates more loss.',
          })}
          trend={
            summary?.periodValueChange !== null &&
            summary?.periodValueChange !== undefined
              ? summary.periodValueChange
              : null
          }
          value={
            summary?.totalValueLost === null ||
            summary?.totalValueLost === undefined
              ? null
              : intl.formatNumber(summary.totalValueLost, {
                  currency,
                  style: 'currency',
                })
          }
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Active Offenders' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Number of unique offenders with at least one incident in the last 30 days.',
          })}
          value={summary?.activeOffenders ?? null}
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Repeat Offenders' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Number of offenders who have committed more than one incident, shown as a fraction of all active offenders.',
          })}
          value={repeatFraction}
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Incident Change' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Percentage change in incident count compared to the previous 30-day period. A positive value means more incidents this period.',
          })}
          trend={
            summary?.periodIncidentChange !== null &&
            summary?.periodIncidentChange !== undefined
              ? summary.periodIncidentChange
              : null
          }
          value={
            summary?.periodIncidentChange !== null &&
            summary?.periodIncidentChange !== undefined
              ? `${summary.periodIncidentChange > 0 ? '+' : ''}${Number.parseFloat(summary.periodIncidentChange.toFixed(2))}%`
              : '—'
          }
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          invertTrend
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Value Change' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Percentage change in total value lost compared to the previous 30-day period. A positive value means greater losses this period.',
          })}
          trend={
            summary?.periodValueChange !== null &&
            summary?.periodValueChange !== undefined
              ? summary.periodValueChange
              : null
          }
          value={
            summary?.periodValueChange !== null &&
            summary?.periodValueChange !== undefined
              ? `${summary.periodValueChange > 0 ? '+' : ''}${Number.parseFloat(summary.periodValueChange.toFixed(2))}%`
              : '—'
          }
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Pending Approval' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Incidents that have been submitted but are awaiting review and approval by a manager.',
          })}
          value={summary?.pendingApproval ?? null}
        />
      </Col>
      <Col lg={6} sm={12} xs={24} xxl={3}>
        <KpiStatCard
          loading={loading}
          title={intl.formatMessage({ defaultMessage: 'Open Investigations' })}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Incidents currently under active investigation that have not yet been resolved or closed.',
          })}
          value={summary?.openInvestigations ?? null}
        />
      </Col>
    </Row>
  );
};

export default AdminSummary;
