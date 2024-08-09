import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Empty } from 'antd';
import React from 'react';

import { useStoreState } from '../../../state';

const RadialGraph = ({
  data,
  emptyLabel,
  isPrinting,
}: {
  data:
    | ({
        __typename?: 'RadialGraph' | 'RadialValueGraph' | undefined;
        data:
          | { __typename?: 'Graph' | undefined; label: string; value: number }[]
          | null;
        label: string;
      } | null)[]
    | null
    | undefined;
  emptyLabel: string;
  isPrinting: boolean;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark' && !isPrinting;

  return (
    <div
      className="no-break"
      style={{ height: '100%', marginLeft: 15, width: '100%%' }}
    >
      {data && data.length > 0 ? (
        <ResponsiveRadialBar
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          borderWidth={1}
          circularAxisOuter={{
            tickPadding: 12,
            tickRotation: 0,
            tickSize: 5,
          }}
          colors={{ scheme: darkMode ? 'dark2' : 'set2' }}
          cornerRadius={2}
          // arcLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          data={data?.map((item) => ({
            data: item?.data
              ? item?.data?.map((d) => ({
                  x: d?.label || '',
                  y: d?.value || 0,
                }))
              : [
                  {
                    x: 'No data',
                    y: 0,
                  },
                ],
            id: item?.label || '',
          }))}
          innerRadius={0.15}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
              itemDirection: 'left-to-right',
              itemHeight: 20,
              itemTextColor: darkMode ? '#fff' : '#3a3a3a',
              itemWidth: 100,
              itemsSpacing: 5,
              justify: false,
              symbolShape: 'square',
              symbolSize: 20,
              translateX: -40,
              translateY: -20,
            },
          ]}
          margin={{ bottom: 20, left: -120, right: 0, top: 20 }}
          padding={0.6}
          radialAxisStart={{
            tickPadding: 5,
            tickRotation: 0,
            tickSize: 5,
          }}
          theme={{
            axis: { ticks: { text: { fill: darkMode ? '#fff' : '#000' } } },
            text: { color: darkMode ? '#fff' : '#000' },
          }}
          // arcLinkLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          valueFormat=">-.2f"
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default RadialGraph;
