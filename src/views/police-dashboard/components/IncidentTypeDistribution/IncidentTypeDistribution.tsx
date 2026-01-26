import type { AgChartOptions } from 'ag-charts-community';

import { AgCharts } from 'ag-charts-react';
import { Card, Empty } from 'antd';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface Props {
  data:
    | PoliceHubDashboardQuery['policeHubDashboard']['incidentTypeDistribution']
    | undefined;
  loading: boolean;
}

const IncidentTypeDistribution: React.FC<Props> = ({ data, loading }) => {
  const intl = useIntl();
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';

  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      category: item.tagName || item.crimeType || 'Unknown',
      value: item.count,
    }));
  }, [data]);

  const chartOptions: AgChartOptions = React.useMemo(
    () => ({
      background: {
        fill: 'transparent',
      },
      data: chartData,
      height: 300,
      legend: {
        enabled: true,
        position: 'right',
      },
      series: [
        {
          angleKey: 'value',
          angleName: intl.formatMessage({ defaultMessage: 'Count' }),
          calloutLabel: {
            enabled: false,
          },
          legendItemKey: 'category',
          sectorLabel: {
            enabled: true,
            formatter: (params: {
              datum: { category: string; value: number };
            }) => {
              const total = chartData.reduce(
                (sum, item) => sum + item.value,
                0
              );
              const percentage =
                total > 0 ? ((params.datum.value / total) * 100).toFixed(1) : 0;
              return `${percentage}%`;
            },
          },
          tooltip: {
            renderer: (params: {
              datum: { category: string; value: number };
            }) => {
              const total = chartData.reduce(
                (sum, item) => sum + item.value,
                0
              );
              const percentage =
                total > 0 ? ((params.datum.value / total) * 100).toFixed(1) : 0;
              return {
                content: `${params.datum.value} (${percentage}%)`,
                title: params.datum.category,
              };
            },
          },
          type: 'pie',
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
          defaultMessage: 'Incident Type Distribution',
        })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No incident data available',
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
        defaultMessage: 'Incident Type Distribution',
      })}
    >
      <div style={{ height: 300 }}>
        <AgCharts options={chartOptions} />
      </div>
    </Card>
  );
};

export default IncidentTypeDistribution;
