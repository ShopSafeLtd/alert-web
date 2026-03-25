import type { DateRange } from 'views/police-dashboard/types';

import { Col, Result, Row } from 'antd';
import { subMonths } from 'date-fns';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import DashboardFilters from 'views/police-dashboard/components/DashboardFilters';

import AdminSummary from './components/AdminSummary/AdminSummary';
import BusinessIntelligence from './components/BusinessIntelligence/BusinessIntelligence';
import CrimePatterns from './components/CrimePatterns/CrimePatterns';
import CrimeTypeDistribution from './components/CrimeTypeDistribution/CrimeTypeDistribution';
import OperationalQueue from './components/OperationalQueue/OperationalQueue';
import RepeatOffenderInsights from './components/RepeatOffenderInsights/RepeatOffenderInsights';
import TargetedGoods from './components/TargetedGoods/TargetedGoods';
import TopOffenders from './components/TopOffenders/TopOffenders';
import { useRetailAdminDashboard } from './hooks/useRetailAdminDashboard';

const RetailAdminDashboard: React.FC = () => {
  const intl = useIntl();

  const [dateRange, setDateRange] = useState<DateRange>({
    endDate: new Date(),
    startDate: subMonths(new Date(), 3),
  });

  const {
    businessIntelligence,
    crimePatterns,
    crimeTypeDistribution,
    error,
    loading,
    operationalQueue,
    refetch,
    repeatOffenderInsights,
    summary,
    targetedGoods,
    topOffenders,
  } = useRetailAdminDashboard(dateRange);

  if (error) {
    return (
      <div className="page-container" style={{ padding: 24 }}>
        <Result
          extra={[
            <button
              key="retry"
              onClick={() => {
                void refetch();
              }}
              style={{
                backgroundColor: '#1890ff',
                border: 'none',
                borderRadius: 4,
                color: 'white',
                cursor: 'pointer',
                padding: '8px 16px',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Retry' })}
            </button>,
          ]}
          status="warning"
          subTitle={error.message}
          title={intl.formatMessage({
            defaultMessage: 'Unable to load dashboard data',
          })}
        />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: 24 }}>
      {/* Date Filters */}
      <DashboardFilters
        dateRange={dateRange}
        loading={loading}
        onChangeDateRange={setDateRange}
      />

      {/* 8 KPI Cards */}
      <AdminSummary loading={loading} summary={summary} />

      {/* Top Offenders + Repeat Offender Insights */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col
          lg={14}
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          xs={24}
          xxl={16}
        >
          <TopOffenders loading={loading} offenders={topOffenders} />
        </Col>
        <Col
          lg={10}
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          xs={24}
          xxl={8}
        >
          <RepeatOffenderInsights
            insights={repeatOffenderInsights}
            loading={loading}
          />
        </Col>
      </Row>

      {/* Crime Type Distribution + Business Intelligence */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={12} xs={24}>
          <CrimeTypeDistribution
            data={crimeTypeDistribution}
            loading={loading}
          />
        </Col>
        <Col lg={12} xs={24}>
          <BusinessIntelligence data={businessIntelligence} loading={loading} />
        </Col>
      </Row>

      {/* Crime Patterns — full width */}
      <div style={{ marginBottom: 24 }}>
        <CrimePatterns data={crimePatterns} loading={loading} />
      </div>

      {/* Targeted Goods + Operational Queue */}
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <TargetedGoods data={targetedGoods} loading={loading} />
        </Col>
        <Col lg={12} xs={24}>
          <OperationalQueue data={operationalQueue} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default RetailAdminDashboard;
