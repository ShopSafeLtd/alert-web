import type { AgChartOptions } from 'ag-charts-community';

import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

interface RecidivismDistribution {
  period0to30?: number;
  period31to90?: number;
  period91to180?: number;
  period180plus?: number;
}

interface RecidivismChartProps {
  distribution: RecidivismDistribution | null | undefined;
}

const RecidivismChart: React.FC<RecidivismChartProps> = ({ distribution }) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const chartData = useMemo(() => {
    if (!distribution) return [];

    return [
      {
        category: intl.formatMessage({ defaultMessage: '0-30 days' }),
        color: '#f5222d', // Red - High risk
        count: distribution.period0to30 || 0,
      },
      {
        category: intl.formatMessage({ defaultMessage: '31-90 days' }),
        color: '#fa8c16', // Orange
        count: distribution.period31to90 || 0,
      },
      {
        category: intl.formatMessage({ defaultMessage: '91-180 days' }),
        color: '#faad14', // Yellow
        count: distribution.period91to180 || 0,
      },
      {
        category: intl.formatMessage({ defaultMessage: '180+ days' }),
        color: '#52c41a', // Green - Lower risk
        count: distribution.period180plus || 0,
      },
    ];
  }, [distribution, intl]);

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      data: chartData,
      legend: {
        enabled: true,
        position: 'bottom',
      },
      series: [
        {
          angleKey: 'count',
          fills: chartData.map((d) => d.color),
          innerLabels: [
            {
              color: darkMode ? '#fff' : '#000',
              fontSize: 14,
              text: intl.formatMessage({ defaultMessage: 'Recidivism' }),
            },
            {
              color: darkMode ? '#aaa' : '#666',
              fontSize: 12,
              text: intl.formatMessage({ defaultMessage: 'Distribution' }),
            },
          ],
          innerRadiusRatio: 0.6,
          legendItemKey: 'category',
          strokes: chartData.map((d) => d.color),
          type: 'donut',
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [chartData, darkMode, intl]
  );

  if (!distribution) {
    return null;
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default RecidivismChart;
