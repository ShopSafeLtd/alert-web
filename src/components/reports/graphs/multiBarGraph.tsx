import { ResponsiveBar } from '@nivo/bar';

import { Empty } from 'antd';
import React from 'react';
import { useStoreState } from '../../../state';
import filteredBarData from '../../../views/reports/crime-groups/crime-group-report/utils/FilteredBarData';

const MultiBarGraph = ({
  data,
  emptyLabel,
}: {
  data:
    | Array<{
        label: string;
        data: Array<{ value: number; label: string }>;
      } | null>
    | null
    | undefined;
  emptyLabel: string;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  return (
    <div
      style={{ height: '100%', width: '100%%', marginLeft: 15 }}
      className="no-break"
    >
      {data && data.length > 0 ? (
        <ResponsiveBar
          indexBy="label"
          data={
            filteredBarData({
              data,
            }) || [
              {
                value: 'No Data',
                label: 'No Data',
              },
            ]
          }
          keys={
            Object.keys(
              filteredBarData({
                data,
                // eslint-disable-next-line unicorn/no-array-reduce
              }).reduce(
                (acc, cur) => ({
                  ...acc,
                  ...cur,
                }),
                {}
              )
            ).filter((key) => key !== 'label') || []
          }
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: darkMode ? 'dark2' : 'set2' }}
          theme={{
            textColor: darkMode ? '#ffffff' : '#000',
          }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default MultiBarGraph;
