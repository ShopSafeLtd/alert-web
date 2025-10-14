import colours from '#/components/reports/graphs/colours';
import { ResponsiveBar } from '@nivo/bar';
import { Empty } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import { useStoreState } from '../../../state';
import filteredBarData from '../../../views/reports/crime-groups/crime-group-report/utils/FilteredBarData';

const MultiBarGraph = ({
  data,
  emptyLabel,
  isPrinting,
  isStacked,
  tooltip,
  valueSymbol,
}: {
  data:
    | Array<{
        data: Array<{ label: string; value: number }>;
        label: string;
      } | null>
    | null
    | undefined;
  emptyLabel: string;
  isPrinting?: boolean; // required if printing to make it light mode
  isStacked?: boolean;
  tooltip?: boolean;
  valueSymbol?: string;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;
  const intl = useIntl();

  return (
    <div
      className="no-break"
      style={{ height: '100%', marginLeft: 15, width: '100%%' }}
    >
      {data && data.length > 0 ? (
        <ResponsiveBar
          axisBottom={{
            tickRotation: 10,
          }}
          axisRight={null}
          axisTop={null}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          colors={colours}
          data={
            filteredBarData({
              data,
            }) || [
              {
                // label: 'No Data',
                label: intl.formatMessage({
                  defaultMessage: 'No Data',
                }),
                value: 'No Data',
              },
            ]
          }
          groupMode={isStacked ? 'stacked' : 'grouped'}
          indexBy="label"
          indexScale={{ round: true, type: 'band' }}
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
          labelSkipHeight={7}
          labelSkipWidth={12}
          legends={[
            {
              anchor: 'bottom-right',
              dataFrom: 'keys',
              direction: 'column',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
              itemDirection: 'left-to-right',
              itemHeight: 20,
              itemOpacity: 0.85,
              itemTextColor: isDark ? '#fff' : '#3a3a3a',
              itemWidth: 100,
              itemsSpacing: 2,
              justify: false,
              symbolSize: 20,
              translateX: 120,
              translateY: 0,
            },
          ]}
          margin={{ bottom: 60, left: 60, right: 130, top: 50 }}
          padding={0.3}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
              fill: isDark ? '#fff' : '#000',
            },
          }}
          tooltip={tooltip}
          valueFormat={(value) =>
            `${valueSymbol ?? ''}${Number(value).toLocaleString('en-GB', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
            })}`
          }
          valueScale={{ type: 'linear' }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default MultiBarGraph;
