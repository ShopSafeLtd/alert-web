import type { AgChartOptions } from 'ag-charts-community';

import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import { Empty } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

interface HourBucket {
  count: number;
  hour: number;
}

interface PeakHoursBarChartProps {
  data: HourBucket[] | null | undefined;
}

const ALL_HOURS = Array.from({ length: 24 }, (_, i) => i);
const AM_HOURS = ALL_HOURS.slice(0, 12);
const PM_HOURS = ALL_HOURS.slice(12);

// 12 blue shades for AM, 12 orange/amber shades for PM
const AM_COLORS = AM_HOURS.map((_, i) => `hsl(210, 80%, ${35 + i * 3.5}%)`);
const PM_COLORS = PM_HOURS.map((_, i) => `hsl(28, 90%, ${35 + i * 3.5}%)`);

const PeakHoursBarChart: React.FC<PeakHoursBarChartProps> = ({ data }) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const { amPmData, hourData } = useMemo(() => {
    const countByHour = new Map((data ?? []).map((h) => [h.hour, h.count]));

    const amTotal = AM_HOURS.reduce(
      (sum, h) => sum + (countByHour.get(h) ?? 0),
      0
    );
    const pmTotal = PM_HOURS.reduce(
      (sum, h) => sum + (countByHour.get(h) ?? 0),
      0
    );

    return {
      amPmData: [
        { count: amTotal, label: 'AM' },
        { count: pmTotal, label: 'PM' },
      ],
      hourData: ALL_HOURS.map((hour) => ({
        count: countByHour.get(hour) ?? 0,
        label: `${String(hour).padStart(2, '0')}:00`,
      })),
    };
  }, [data]);

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      legend: { enabled: false },
      series: [
        // Inner ring — AM / PM breakdown
        {
          angleKey: 'count',
          calloutLabel: { enabled: false },
          data: amPmData,
          fills: ['#1890ff', '#fa8c16'],
          innerRadiusOffset: -100,
          outerRadiusOffset: -60,
          sectorLabel: {
            enabled: true,
            formatter: (params: { datum: { count: number; label: string } }) =>
              params.datum.count > 0 ? params.datum.label : '',
          },
          sectorLabelKey: 'label',
          strokes: ['#1890ff', '#fa8c16'],
          tooltip: {
            renderer: ({
              datum,
            }: {
              datum: { count: number; label: string };
            }) => ({
              content: `${datum.label}: ${datum.count} ${intl.formatMessage({ defaultMessage: 'incidents' })}`,
            }),
          },
          type: 'donut',
        },
        // Outer ring — individual hours
        {
          angleKey: 'count',
          calloutLabel: { enabled: false },
          data: hourData,
          fills: [...AM_COLORS, ...PM_COLORS],
          innerRadiusOffset: -50,
          outerRadiusOffset: 0,
          sectorLabel: {
            enabled: true,
            formatter: (params: { datum: { count: number; label: string } }) =>
              params.datum.count > 0 ? params.datum.label : '',
          },
          sectorLabelKey: 'label',
          showInLegend: false,
          strokes: [...AM_COLORS, ...PM_COLORS],
          tooltip: {
            renderer: ({
              datum,
            }: {
              datum: { count: number; label: string };
            }) => ({
              content: `${datum.label}: ${datum.count} ${intl.formatMessage({ defaultMessage: 'incidents' })}`,
            }),
          },
          type: 'donut',
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [amPmData, hourData, darkMode, intl]
  );

  if (!data || data.length === 0) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No data available',
        })}
      />
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default PeakHoursBarChart;
