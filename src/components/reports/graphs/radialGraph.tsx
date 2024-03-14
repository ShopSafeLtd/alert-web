import { Empty } from 'antd';
import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { useStoreState } from '../../../state';

const RadialGraph = ({
  data,
  emptyLabel,
  isPrinting,
}: {
  data:
    | Array<{
        __typename?: 'RadialGraph' | undefined;
        label: string;
        data:
          | { __typename?: 'Graph' | undefined; value: number; label: string }[]
          | null;
      } | null>
    | null
    | undefined;
  emptyLabel: string;
  isPrinting: boolean;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark' && !isPrinting;
  return (
    <div
      style={{ height: '100%', width: '100%%', marginLeft: 15 }}
      className="no-break"
    >
      {data && data.length > 0 ? (
        <ResponsiveRadialBar
          theme={{
            text: { color: darkMode ? '#ffffff' : '#000' },
          }}
          valueFormat=">-.2f"
          padding={0.6}
          cornerRadius={2}
          borderWidth={1}
          innerRadius={0.15}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          margin={{ top: 20, right: 0, bottom: 20, left: -120 }}
          colors={{ scheme: darkMode ? 'dark2' : 'set2' }}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: -40,
              translateY: -20,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 5,
              symbolSize: 20,
              itemDirection: 'left-to-right',
              itemTextColor: darkMode ? '#fff' : '#3a3a3a',
              symbolShape: 'square',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
          radialAxisStart={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          circularAxisOuter={{
            tickSize: 5,
            tickPadding: 12,
            tickRotation: 0,
          }}
          // arcLinkLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          // arcLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          data={data?.map((item) => ({
            id: item?.label || '',
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
          }))}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default RadialGraph;
