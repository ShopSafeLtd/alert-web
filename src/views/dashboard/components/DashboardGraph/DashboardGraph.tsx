import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';
import type { AgChartOptions } from 'ag-charts-community';

import { GraphType, IncidentYAxis } from '#/types/dashboard-metadata';
import { AgCharts } from 'ag-charts-react';
import { Card, Grid } from 'antd';
import { useStoreState } from 'easy-peasy';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
const { useBreakpoint } = Grid;

import utils from '#/utils';

// Predefined color schemes
const colorSchemes = {
  corporate: [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ],
  default: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
  monochrome: [
    '#000000',
    '#2c2c2c',
    '#555555',
    '#7f7f7f',
    '#a8a8a8',
    '#d1d1d1',
    '#e8e8e8',
    '#f5f5f5',
    '#ffffff',
  ],
  nature: [
    '#2ecc71',
    '#3498db',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#1abc9c',
    '#34495e',
    '#f1c40f',
    '#e67e22',
    '#95a5a6',
  ],
  ocean: [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
    '#ffd600',
  ],
  sunset: [
    '#ff6b6b',
    '#fd7e14',
    '#ffd43b',
    '#51cf66',
    '#0b7285',
    '#364fc7',
    '#7950f2',
    '#e64980',
    '#fab005',
    '#ff4757',
  ],
};

interface Props {
  data: { label: string; value: number }[];
  gridHeight?: number;
  loading: boolean;
  metadata?: DashboardGraphMetadata;
}
const DashboardGraph = ({ data, gridHeight, loading, metadata }: Props) => {
  const intl = useIntl();
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Debug logging
  if (gridHeight) {
    console.log('DashboardGraph gridHeight:', gridHeight);
  }

  const [dimensions, setDimensions] = useState({
    height: 300,
    width: 0,
  });

  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('xl');
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';

  useEffect(() => {
    // If we already have gridHeight, we don't need complex measurement
    if (gridHeight) {
      return;
    }

    if (!cardRef.current) return;

    // Fallback measurement for when gridHeight is not provided
    const measureCard = () => {
      if (cardRef.current) {
        const cardBody = cardRef.current.querySelector('.ant-card-body');
        if (cardBody) {
          const computedStyle = window.getComputedStyle(cardBody);
          const paddingTop = Number.parseFloat(computedStyle.paddingTop);
          const paddingBottom = Number.parseFloat(computedStyle.paddingBottom);
          const rect = cardBody.getBoundingClientRect();
          const contentHeight = rect.height - paddingTop - paddingBottom;

          if (contentHeight > 0 && rect.width > 0) {
            setDimensions({ height: contentHeight, width: rect.width });
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      measureCard();
    });

    resizeObserver.observe(cardRef.current);
    measureCard();

    return () => {
      resizeObserver.disconnect();
    };
  }, [gridHeight]);

  // Build chart options based on metadata
  const chartOptions = React.useMemo(() => {
    // Use gridHeight if provided, otherwise fall back to dimensions or default
    const chartHeight = gridHeight
      ? gridHeight - 40
      : dimensions.height > 0
        ? dimensions.height
        : 300;

    if (!metadata || data.length === 0) {
      return {
        background: {
          fill: 'transparent',
        },
        data: [],
        height: chartHeight,
        theme: isDark ? 'ag-default-dark' : 'ag-default',
        title: {
          text:
            metadata?.title ||
            intl.formatMessage({ defaultMessage: 'No data' }),
        },
      };
    }

    const chartData = data.map((item) => ({
      category: item.label,
      value: item.value,
    }));

    const baseOptions: AgChartOptions = {
      background: {
        fill: 'transparent',
      },
      data: chartData,
      height: chartHeight,
      theme: isDark ? 'ag-default-dark' : 'ag-default',
      title: {
        text: metadata.title || '',
      },
    };

    // Helper function for currency formatting
    const formatCurrency = (value: number) =>
      `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;

    // Get color scheme
    const selectedColorScheme = metadata?.colorScheme || 'default';
    const colors =
      colorSchemes[selectedColorScheme as keyof typeof colorSchemes] ||
      colorSchemes.default;

    // Configure chart based on graph type
    switch (metadata.graphType) {
      case GraphType.bar: {
        return {
          ...baseOptions,
          axes: [
            {
              label: {
                enabled: !isMobile,
              },
              position: 'bottom',
              title: {
                text: metadata.xAxisLabel || '',
              },
              type: 'category',
            },
            {
              label: {
                formatter:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { value: number }) =>
                        formatCurrency(params.value)
                    : undefined,
              },
              position: 'left',
              title: {
                text: metadata.yAxisLabel || '',
              },
              type: 'number',
            },
          ],
          series: [
            {
              fill: colors[0],
              tooltip: {
                renderer:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { datum: { value: number } }) => ({
                        content: formatCurrency(params.datum.value),
                      })
                    : undefined,
              },
              type: 'bar',
              xKey: 'category',
              xName: metadata.xAxisLabel || 'Category',
              yKey: 'value',
              yName: metadata.yAxisLabel || 'Value',
            },
          ],
        };
      }

      case GraphType.line: {
        return {
          ...baseOptions,
          axes: [
            {
              position: 'bottom',
              title: {
                text: metadata.xAxisLabel || '',
              },
              type: 'category',
            },
            {
              label: {
                formatter:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { value: number }) =>
                        formatCurrency(params.value)
                    : undefined,
              },
              position: 'left',
              title: {
                text: metadata.yAxisLabel || '',
              },
              type: 'number',
            },
          ],
          series: [
            {
              marker: {
                fill: colors[0],
                stroke: colors[0],
              },
              stroke: colors[0],
              tooltip: {
                renderer:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { datum: { value: number } }) => ({
                        content: formatCurrency(params.datum.value),
                      })
                    : undefined,
              },
              type: 'line',
              xKey: 'category',
              xName: metadata.xAxisLabel || 'Category',
              yKey: 'value',
              yName: metadata.yAxisLabel || 'Value',
            },
          ],
        };
      }

      case GraphType.area: {
        return {
          ...baseOptions,
          axes: [
            {
              position: 'bottom',
              title: {
                text: metadata.xAxisLabel || '',
              },
              type: 'category',
            },
            {
              label: {
                formatter:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { value: number }) =>
                        formatCurrency(params.value)
                    : undefined,
              },
              position: 'left',
              title: {
                text: metadata.yAxisLabel || '',
              },
              type: 'number',
            },
          ],
          series: [
            {
              fill: colors[0],
              fillOpacity: 0.5,
              stroke: colors[0],
              tooltip: {
                renderer:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: { datum: { value: number } }) => ({
                        content: formatCurrency(params.datum.value),
                      })
                    : undefined,
              },
              type: 'area',
              xKey: 'category',
              xName: metadata.xAxisLabel || 'Category',
              yKey: 'value',
              yName: metadata.yAxisLabel || 'Value',
            },
          ],
        };
      }

      case GraphType.pie: {
        return {
          ...baseOptions,
          legend: {
            enabled: true,
          },
          series: [
            {
              angleKey: 'value',
              angleName: metadata.yAxisLabel || 'Value',
              fills: colors,
              innerRadiusRatio: metadata.innerRadiusRatio || 0,
              legendItemKey: 'category',
              tooltip: {
                renderer:
                  metadata.yAxis === IncidentYAxis.value
                    ? (params: {
                        datum: { category: string; value: number };
                      }) => ({
                        content: formatCurrency(params.datum.value),
                        title: params.datum.category,
                      })
                    : undefined,
              },
              type: 'pie',
            },
          ],
        };
      }

      case GraphType.gauge: {
        // Gauge is rendered as a donut chart with center text
        const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
        const totalCount = chartData.length;
        const percentage =
          totalCount > 0 ? Math.round((totalValue / totalCount) * 100) : 0;

        return {
          ...baseOptions,
          data: [
            { category: metadata.yAxisLabel || 'Value', value: percentage },
            { category: 'Remaining', value: 100 - percentage },
          ],
          legend: {
            enabled: false,
          },
          series: [
            {
              angleKey: 'value',
              fills: [colors[0], isDark ? '#333' : '#e0e0e0'],
              innerRadiusRatio: 0.8,
              type: 'pie',
            },
          ],
        };
      }

      default: {
        // Default to bar chart
        return {
          ...baseOptions,
          series: [
            {
              fill: colors[0],
              type: 'bar',
              xKey: 'category',
              yKey: 'value',
            },
          ],
        };
      }
    }
  }, [metadata, data, dimensions.height, gridHeight, intl, isMobile, isDark]);

  const isGauge = metadata?.graphType === GraphType.gauge;
  const gaugePercentage = React.useMemo(() => {
    if (!isGauge || data.length === 0) return 0;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const totalCount = data.length;
    return totalCount > 0 ? Math.round((totalValue / totalCount) * 100) : 0;
  }, [isGauge, data]);

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: gridHeight ? gridHeight - 20 : '100%',
        padding: 10,
      }}
      loading={loading}
      ref={cardRef}
      style={{ height: '100%' }}
    >
      {!loading && data.length === 0 ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#999' }}>
            {intl.formatMessage({ defaultMessage: 'No data available' })}
          </span>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            position: 'relative',
          }}
        >
          <AgCharts options={chartOptions as AgChartOptions} />
          {isGauge && (
            <div
              style={{
                left: '50%',
                pointerEvents: 'none',
                position: 'absolute',
                textAlign: 'center',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                style={{
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: 1,
                }}
              >
                {intl.formatMessage(
                  { defaultMessage: '{percentage}%' },
                  { percentage: gaugePercentage }
                )}
              </div>
              <div
                style={{
                  color: isDark ? '#cccccc' : '#666666',
                  fontSize: '14px',
                  marginTop: '8px',
                }}
              >
                {metadata?.yAxisLabel ||
                  intl.formatMessage({ defaultMessage: 'Value' })}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default DashboardGraph;
