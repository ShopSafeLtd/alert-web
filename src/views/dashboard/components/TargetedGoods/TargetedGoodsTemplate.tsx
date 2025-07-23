import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';
import type { AgChartOptions } from 'ag-charts-community';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgCharts } from 'ag-charts-react';
import { Button, Card } from 'antd';
import { useStoreState } from 'easy-peasy';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

const TargetedGoodsGraph = ({
  _metadata,
  _updateMetadata,
  elementId,
  removeItem,
}: {
  _metadata?: DashboardGraphMetadata;
  _updateMetadata?: (metadata: DashboardGraphMetadata) => void;
  elementId?: string;
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';
  const [chartHeight, setChartHeight] = useState(300);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          if (height > 0) {
            setChartHeight(height - 16);
          }
        }
      }
    );

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const data = [
    { good: 'Electronics', incidents: 45 },
    { good: 'Clothing', incidents: 38 },
    { good: 'Alcohol', incidents: 32 },
    { good: 'Cosmetics', incidents: 28 },
    { good: 'Food Items', incidents: 22 },
  ];

  const loading = false;

  const chartOptions = useMemo<AgChartOptions>(
    () => ({
      axes: [
        {
          position: 'left',
          title: {
            enabled: false,
          },
          type: 'category',
        },
        {
          position: 'bottom',
          title: {
            enabled: true,
            text: intl.formatMessage({ defaultMessage: 'Number of Incidents' }),
          },
          type: 'number',
        },
      ],
      background: {
        fill: 'transparent',
      },
      data,
      height: chartHeight,
      legend: {
        enabled: false,
      },
      series: [
        {
          direction: 'horizontal',
          fill: '#fa8c16',
          type: 'bar',
          xKey: 'good',
          yKey: 'incidents',
          yName: 'Incidents',
        },
      ],
      theme: isDark ? 'ag-default-dark' : 'ag-default',
    }),
    [data, isDark, intl, chartHeight]
  );

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '16px',
        position: 'relative',
      }}
      loading={loading}
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Top 5 Targeted Goods',
      })}
    >
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() =>
          removeItem(
            (elementId || 'targetedGoods') as AvailableDashboardElements
          )
        }
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <div
        ref={chartContainerRef}
        style={{ flex: 1, minHeight: 0, paddingBottom: 16, width: '100%' }}
      >
        {!loading && <AgCharts options={chartOptions} />}
      </div>
    </Card>
  );
};

export default TargetedGoodsGraph;
