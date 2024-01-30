import { Empty, Typography } from 'antd';
import React from 'react';
import type { PointTooltipProps } from '@nivo/line';
import { ResponsiveLine } from '@nivo/line';
import { useStoreState } from '../../../state';

const LineGraph = ({
  data,
  label,
  emptyLabel,
  dataLabel,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  label: string;
  emptyLabel: string;
  dataLabel: string;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark';

  const tooltip = ({ point }: PointTooltipProps) => (
    <div
      style={{
        background: 'white',
        padding: '9px 12px',
        border: '1px solid #ccc',
      }}
    >
      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
      <Typography.Text strong>{point.data.xFormatted}: </Typography.Text>
      <Typography.Text>
        {point.data.yFormatted} {dataLabel}
      </Typography.Text>
    </div>
  );

  const min = data ? Math.min(...data.map((item) => item?.value || 0)) : 0;
  return (
    <div style={{ height: '100%', width: '100%%' }} className="no-break">
      <Typography.Title level={4}>{label}</Typography.Title>
      {data && data.length > 0 ? (
        <ResponsiveLine
          theme={{
            text: {
              color: darkMode ? '#fff' : '#000',
              fill: darkMode ? '#fff' : '#000',
            },
          }}
          data={[
            {
              id: dataLabel,
              data:
                data?.map((item) => ({
                  x: item?.label || '',
                  y: item?.value || 0,
                })) || [],
            },
          ]}
          enableCrosshair={false}
          margin={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min,
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          axisLeft={{
            tickPadding: 15,
            tickSize: 1,
            legend: 'Incidents',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            format: (value) => (value % 1 === 0 ? value : ''),
            legendOffset: -44,
            legendPosition: 'middle',
          }}
          curve="linear"
          colors={{
            scheme: 'accent',
          }}
          // yFormat=" >-.2f"
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'color', modifiers: [] }}
          enablePointLabel
          pointLabelYOffset={-12}
          enableArea
          areaBaselineValue={min}
          areaOpacity={0.45}
          useMesh
          tooltip={tooltip}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default LineGraph;
