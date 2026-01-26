import { Col, Result, Row } from 'antd';
import { subDays, subMonths } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import type { DateRange } from './types';

import DashboardFilters from './components/DashboardFilters';
import IncidentTypeDistribution from './components/IncidentTypeDistribution';
import MonthlyIncidentTrend from './components/MonthlyIncidentTrend';
import PriorityOffendersCards from './components/PriorityOffenders/PriorityOffendersCards';
import RepeatOffenderInsights from './components/RepeatOffenderInsights/RepeatOffenderInsights';
import SummaryMetrics from './components/SummaryMetrics/SummaryMetrics';
import VehiclesTable from './components/VehiclesOfInterest/VehiclesTable';
import { usePoliceDashboard } from './hooks/usePoliceDashboard';

const PoliceDashboard: React.FC = () => {
  const intl = useIntl();

  // Default to Last 12 Months
  const [dateRange, setDateRange] = useState<DateRange>({
    endDate: new Date(),
    startDate: subMonths(new Date(), 12),
  });

  const {
    error,
    incidentTypeDistribution,
    loading,
    monthlyIncidentCounts,
    refetch,
    repeatOffenderInsights,
    summary,
    topOffenders,
    vehiclesOfInterest,
  } = usePoliceDashboard(dateRange);

  // Helper to get current preset label
  const datePresetLabel = useMemo(() => {
    if (!dateRange) return intl.formatMessage({ defaultMessage: 'All Time' });

    const now = new Date();
    const isWithinDay = (date1: Date, date2: Date) =>
      Math.abs(date1.getTime() - date2.getTime()) < 24 * 60 * 60 * 1000;

    if (isWithinDay(dateRange.startDate, subDays(now, 30))) {
      return intl.formatMessage({ defaultMessage: 'Last 30 Days' });
    }
    if (isWithinDay(dateRange.startDate, subMonths(now, 3))) {
      return intl.formatMessage({ defaultMessage: 'Last 3 Months' });
    }
    if (isWithinDay(dateRange.startDate, subMonths(now, 6))) {
      return intl.formatMessage({ defaultMessage: 'Last 6 Months' });
    }
    if (isWithinDay(dateRange.startDate, subMonths(now, 12))) {
      return intl.formatMessage({ defaultMessage: 'Last 12 Months' });
    }

    return intl.formatMessage({ defaultMessage: 'Custom Range' });
  }, [dateRange, intl]);

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
      {/* Dashboard Filters */}
      <DashboardFilters
        dateRange={dateRange}
        loading={loading}
        onChangeDateRange={setDateRange}
      />

      {/* Hero KPI Statistics */}
      <SummaryMetrics loading={loading} summary={summary} />

      {/* Charts Section: Incident Type Distribution + Monthly Trend */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={12} xs={24}>
          <IncidentTypeDistribution
            data={incidentTypeDistribution}
            loading={loading}
          />
        </Col>
        <Col lg={12} xs={24}>
          <MonthlyIncidentTrend
            data={monthlyIncidentCounts}
            loading={loading}
          />
        </Col>
      </Row>

      {/* Priority Offenders Cards */}
      <PriorityOffendersCards
        datePreset={datePresetLabel}
        loading={loading}
        offenders={topOffenders}
      />

      {/* Split Section: Repeat Offenders + Vehicles */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={12} xs={24}>
          <RepeatOffenderInsights
            insights={repeatOffenderInsights}
            loading={loading}
          />
        </Col>
        <Col lg={12} xs={24}>
          <VehiclesTable loading={loading} vehicles={vehiclesOfInterest} />
        </Col>
      </Row>
    </div>
  );
};

export default PoliceDashboard;
