import type { AgChartOptions } from 'ag-charts-community';

import { AgCharts } from 'ag-charts-react';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface Props {
  data:
    | PoliceHubDashboardQuery['policeHubDashboard']['monthlyIncidentCounts']
    | undefined;
  loading: boolean;
}

const MonthlyIncidentTrend: React.FC<Props> = ({ data, loading }) => {
  const intl = useIntl();
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';

  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return data
      .map((item) => ({
        count: item.count,
        month: dayjs(item.month).format('MMM YYYY'),
        monthDate: dayjs(item.month).toDate(),
      }))
      .sort((a, b) => a.monthDate.getTime() - b.monthDate.getTime());
  }, [data]);

  const chartOptions: AgChartOptions = React.useMemo(
    () => ({
      axes: [
        {
          position: 'bottom',
          title: {
            text: intl.formatMessage({ defaultMessage: 'Month' }),
          },
          type: 'category',
        },
        {
          position: 'left',
          title: {
            text: intl.formatMessage({ defaultMessage: 'Incidents' }),
          },
          type: 'number',
        },
      ],
      background: {
        fill: 'transparent',
      },
      data: chartData,
      height: 300,
      series: [
        {
          marker: {
            enabled: true,
            size: 8,
          },
          tooltip: {
            renderer: (params: {
              datum: { count: number; month: string };
            }) => ({
              content: `${params.datum.count} ${intl.formatMessage({ defaultMessage: 'incidents' })}`,
              title: params.datum.month,
            }),
          },
          type: 'line',
          xKey: 'month',
          xName: intl.formatMessage({ defaultMessage: 'Month' }),
          yKey: 'count',
          yName: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
      ],
      theme: isDark ? 'ag-default-dark' : 'ag-default',
    }),
    [chartData, isDark, intl]
  );

  if (!loading && (!data || data.length === 0)) {
    return (
      <Card
        style={{ marginBottom: 0 }}
        title={intl.formatMessage({
          defaultMessage: 'Monthly Incident Trend',
        })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No trend data available',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      loading={loading}
      style={{ marginBottom: 0 }}
      title={intl.formatMessage({
        defaultMessage: 'Monthly Incident Trend',
      })}
    >
      <div style={{ height: 300 }}>
        <AgCharts options={chartOptions} />
      </div>
    </Card>
  );
};

export default MonthlyIncidentTrend;
