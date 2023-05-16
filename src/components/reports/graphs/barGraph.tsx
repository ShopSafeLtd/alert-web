import { ResponsiveBar } from '@nivo/bar';

import { Empty } from 'antd';
import React from 'react';
import { useStoreState } from '../../../state';

const BarGraph = ({
  data,
  emptyLabel,
  labelFormat,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  emptyLabel: string;
  labelFormat?: string;
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
          data={
            data?.map((item) => ({
              label: item?.label || '',
              value: item?.value || 0,
            })) || []
          }
          theme={{
            textColor: darkMode ? '#ffffff' : '#000',
          }}
          indexBy="label"
          margin={{ top: 10, right: 20, bottom: 40, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: darkMode ? 'dark2' : 'set2' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: labelFormat,
            legendPosition: 'middle',
            legendOffset: -40,
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
