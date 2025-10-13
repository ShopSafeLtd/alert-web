import type { TimeHeatMap as TimeHeatMapT } from 'graphql/types';

import { useStoreState } from '#/state';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Empty } from 'antd';
import React from 'react';

const TimeHeatmap = ({
  bottomLabel,
  data,
  emptyLabel,
  isPrinting = false,
  labelFormat,
  margin,
}: {
  bottomLabel?: string;
  data: Array<TimeHeatMapT | null> | null | undefined;
  emptyLabel: string;
  isPrinting?: boolean; // required if printing to make it light mode
  labelFormat?: string;
  margin?: { bottom: number; left: number; right: number; top: number };
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;

  const filteredTs: TimeHeatMapT[] = data?.filter(
    (item) => item !== null
  ) as TimeHeatMapT[];

  return (
    <div
      className="no-break"
      style={{ height: '100%', marginLeft: 15, width: '100%%' }}
    >
      {data && data.length > 0 ? (
        <ResponsiveHeatMap
          axisBottom={
            bottomLabel
              ? {
                  legend: '',
                  legendOffset: 36,
                  legendPosition: 'middle',
                  tickPadding: 5,
                  tickRotation: 0,
                  tickSize: 5,
                  truncateTickAt: 0,
                }
              : undefined
          }
          axisLeft={{
            legend: labelFormat,
            legendOffset: -72,
            legendPosition: 'middle',
            tickPadding: 5,
            tickRotation: 0,
            tickSize: 5,
            truncateTickAt: 0,
          }}
          axisRight={null}
          axisTop={null}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          colors={{
            scheme: 'reds',
            type: 'sequential',
          }}
          data={filteredTs}
          labelTextColor={isDark ? '#fff' : '#000'}
          margin={margin ?? { bottom: 40, left: 80, right: 20, top: 10 }}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default TimeHeatmap;
