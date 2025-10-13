import type { PointTooltipProps } from '@nivo/line';

import { ResponsiveLine } from '@nivo/line';
import { Empty, Typography } from 'antd';
import React from 'react';

import { useStoreState } from '../../../state';

const LineGraph = ({
  data,
  dataLabel,
  emptyLabel,
  isPrinting,
  label,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  dataLabel: string;
  emptyLabel: string;
  isPrinting: boolean;
  label: string;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark' && !isPrinting;

  const tooltip = ({ point }: PointTooltipProps) => (
    <div
      style={{
        background: 'white',
        border: '1px solid #ccc',
        padding: '9px 12px',
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
    <div className="no-break" style={{ height: '100%', width: '100%%' }}>
      <Typography.Title level={4}>{label}</Typography.Title>
      {data && data.length > 0 ? (
        <ResponsiveLine
          areaBaselineValue={min}
          areaOpacity={0.45}
          axisLeft={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            format: (value) => (value % 1 === 0 ? value : ''),
            legend: 'Incidents',
            legendOffset: -44,
            legendPosition: 'middle',
            tickPadding: 15,
            tickSize: 1,
          }}
          colors={{
            scheme: 'accent',
          }}
          curve="linear"
          data={[
            {
              data:
                data?.map((item) => ({
                  x: item?.label || '',
                  y: item?.value || 0,
                })) || [],
              id: dataLabel,
            },
          ]}
          enableArea
          enableCrosshair={false}
          enablePointLabel
          margin={{
            bottom: 50,
            left: 50,
            right: 50,
            top: 50,
          }}
          pointBorderColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointColor={{ theme: 'background' }}
          pointLabelYOffset={-12}
          // yFormat=" >-.2f"
          pointSize={5}
          theme={{
            text: {
              color: darkMode ? '#fff' : '#000',
              fill: darkMode ? '#fff' : '#000',
            },
          }}
          tooltip={tooltip}
          useMesh
          xScale={{ type: 'point' }}
          yScale={{
            max: 'auto',
            min,
            reverse: false,
            stacked: true,
            type: 'linear',
          }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default LineGraph;
