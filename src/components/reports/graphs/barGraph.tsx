import { ResponsiveBar } from '@nivo/bar';

import { Empty } from 'antd';
import React from 'react';
import { useStoreState } from '../../../state';

const BarGraph = ({
  data,
  emptyLabel,
  labelFormat,
  margin,
  isPrinting,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  emptyLabel: string;
  labelFormat?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  isPrinting: boolean;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;

  const findHighestValue = () => {
    if (!data || data.length === 0) {
      return 0;
    }

    return Math.max(...data.map((item) => item?.value || 0));
  };

  return (
    <div
      style={{ height: '100%', width: '100%%', marginLeft: 15 }}
      className="no-break"
    >
      {data && data.length > 0 ? (
        <ResponsiveBar
          data={
            data?.map((item) => ({
              label: item?.label || '',
              value: item?.value || 0,
            })) || []
          }
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
          indexBy="label"
          margin={margin ?? { top: 10, right: 20, bottom: 40, left: 80 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: isDark ? 'dark2' : 'set2' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          maxValue={findHighestValue()}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: labelFormat,
            legendPosition: 'middle',
            legendOffset: -40,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            format: (value) => (Number.isInteger(value) ? value : ''), // Display only whole numbers
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          colorBy="indexValue"
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default BarGraph;
