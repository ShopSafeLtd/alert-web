import { KpiStatCard } from '#/components/dashboard-widgets';
import { Alert, Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { StoreColleagueDashboardQuery } from '../../graphql/queries/__generated__/store-colleague-dashboard.generated';

interface StoreSummaryProps {
  loading: boolean;
  summary:
    | StoreColleagueDashboardQuery['storeColleagueDashboard']['summary']
    | null
    | undefined;
}

const StoreSummary: React.FC<StoreSummaryProps> = ({ loading, summary }) => {
  const intl = useIntl();

  if (loading && !summary) {
    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Col key={i} lg={8} sm={12} xs={24} xxl={5}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      {summary?.watchlistGeoBounded && (
        <Alert
          description={intl.formatMessage(
            {
              defaultMessage:
                'Watchlist is filtered to offenders seen within {radius}m of your store.',
            },
            { radius: summary.watchlistRadiusMeters ?? '?' }
          )}
          message={intl.formatMessage({
            defaultMessage: 'Geo-bounded watchlist active',
          })}
          showIcon
          style={{ marginBottom: 16 }}
          type="info"
        />
      )}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={8} sm={12} xs={24} xxl={5}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({ defaultMessage: "Today's Incidents" })}
            value={summary?.todayCount ?? null}
          />
        </Col>
        <Col lg={8} sm={12} xs={24} xxl={5}>
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
        <Col lg={8} sm={12} xs={24} xxl={5}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({ defaultMessage: 'This Month' })}
            value={summary?.thisMonthCount ?? null}
          />
        </Col>
        <Col lg={8} sm={12} xs={24} xxl={5}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({ defaultMessage: 'Active Bans' })}
            value={summary?.activeBansCount ?? null}
          />
        </Col>
        <Col lg={8} sm={12} xs={24} xxl={5}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({ defaultMessage: 'Pending Approval' })}
            value={summary?.pendingApprovalCount ?? null}
          />
        </Col>
      </Row>
    </>
  );
};

export default StoreSummary;
