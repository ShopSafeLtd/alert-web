import { ResponsiveBar } from '@nivo/bar';

import { Empty } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import colours from '#/components/reports/graphs/colours';
import { useStoreState } from '../../../state';
import filteredBarData from '../../../views/reports/crime-groups/crime-group-report/utils/FilteredBarData';

const MultiBarGraph = ({
  data,
  emptyLabel,
  isStacked,
  tooltip,
  isPrinting,
  valueSymbol,
}: {
  data:
    | Array<{
        label: string;
        data: Array<{ value: number; label: string }>;
      } | null>
    | null
    | undefined;
  emptyLabel: string;
  isStacked?: boolean;
  isPrinting?: boolean; // required if printing to make it light mode
  tooltip?: boolean;
  valueSymbol?: string;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;
  const intl = useIntl();

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
                // label: 'No Data',
                label: intl.formatMessage({
                  defaultMessage: 'No Data',
                  id: 'D3rOMr',
                }),
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
          valueFormat={(value) =>
            `${valueSymbol ?? ''}${Number(value).toLocaleString('en-GB', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}`
          }
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode={isStacked ? 'stacked' : 'grouped'}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={colours}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legendOffset: 32,
          }}
          labelSkipWidth={12}
          labelSkipHeight={7}
          tooltip={tooltip}
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
              itemTextColor: isDark ? '#fff' : '#3a3a3a',
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
