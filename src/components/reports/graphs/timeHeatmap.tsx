import { Empty } from 'antd';
import React from 'react';
import { useStoreState } from '#/state';

import { ResponsiveHeatMap } from '@nivo/heatmap';
import type { TimeHeatMap as TimeHeatMapT } from 'graphql/types';

const TimeHeatmap = ({
  data,
  emptyLabel,
  labelFormat,
  margin,
  isPrinting = false,
  bottomLabel,
}: {
  data: Array<TimeHeatMapT | null> | null | undefined;
  emptyLabel: string;
  labelFormat?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  isPrinting?: boolean; // required if printing to make it light mode
  bottomLabel?: string;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;

  const filteredTs: TimeHeatMapT[] = data?.filter(
    (item) => item !== null
  ) as TimeHeatMapT[];

  return (
    <div
      style={{ height: '100%', width: '100%%', marginLeft: 15 }}
      className="no-break"
    >
      {data && data.length > 0 ? (
        <ResponsiveHeatMap
          data={filteredTs}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
          labelTextColor={isDark ? '#fff' : '#000'}
          margin={margin ?? { top: 10, right: 20, bottom: 40, left: 80 }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          colors={{
            type: 'sequential',
            scheme: 'reds',
          }}
          axisBottom={
            bottomLabel
              ? {
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: '',
                  legendPosition: 'middle',
                  legendOffset: 36,
                  truncateTickAt: 0,
                }
              : undefined
          }
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: labelFormat,
            legendPosition: 'middle',
            legendOffset: -72,
            truncateTickAt: 0,
          }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default TimeHeatmap;
