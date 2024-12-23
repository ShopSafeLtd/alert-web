import colours from '#/components/reports/graphs/colours';
import { useStoreState } from '#/state';
import { ResponsiveBar } from '@nivo/bar';
import { Empty } from 'antd';
import React from 'react';

const BarGraph = ({
  bottomLabel,
  data,
  emptyLabel,
  isPrinting = false,
  labelFormat,
  margin,
  simplifyGrid = false,
}: {
  bottomLabel?: string;
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  emptyLabel: string;
  isPrinting?: boolean; // required if printing to make it light mode
  labelFormat?: string;
  margin?: { bottom: number; left: number; right: number; top: number };
  simplifyGrid?: boolean;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;

  const findHighestValue = () => {
    if (!data || data.length === 0) {
      return 0;
    }

    return Math.max(...data.map((item) => item?.value || 0)) * 1.2;
  };

  function generateNumberArray(): number[] {
    if (!data) return [];
    // Extract values from the array
    const values = data.map((item) => item?.value || 0);

    // Find the highest value
    const highestValue = Math.max(...values);

    // Calculate the interval
    const interval = Math.ceil(highestValue / 10);

    // Generate the array of numbers
    return Array.from({ length: 11 }, (_, index) => index * interval);
  }
  return (
    <div
      className="no-break"
      style={{ height: '100%', marginLeft: 15, width: '100%%' }}
    >
      {data && data.length > 0 ? (
        <ResponsiveBar
          axisBottom={
            bottomLabel
              ? {
                  legend: bottomLabel,
                  legendOffset: 32,
                  legendPosition: 'middle',
                }
              : {
                  tickRotation: 8,
                }
          }
          axisLeft={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            format: (value) => (Number.isInteger(value) ? value : ''), // Display only whole numbers
            legend: labelFormat,
            legendOffset: -40,
            legendPosition: 'middle',
            tickPadding: 5,
            tickRotation: 0,

            tickSize: 5,
          }}
          axisRight={null}
          axisTop={null}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          colorBy="indexValue"
          colors={colours}
          data={
            data?.map((item) => ({
              label: item?.label || '',
              value: item?.value || 0,
            })) || []
          }
          gridYValues={simplifyGrid ? generateNumberArray() : undefined}
          indexBy="label"
          indexScale={{ round: true, type: 'band' }}
          labelSkipHeight={7}
          labelSkipWidth={12}
          margin={margin ?? { bottom: 60, left: 80, right: 20, top: 10 }}
          maxValue={findHighestValue()}
          padding={0.3}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
          valueScale={{ type: 'linear' }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default BarGraph;
