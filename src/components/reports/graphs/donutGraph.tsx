import colours from '#/components/reports/graphs/colours';
import { ResponsivePie } from '@nivo/pie';
import { Empty } from 'antd';
import React from 'react';

import { useStoreState } from '../../../state';

const DonutGraph = ({
  data,
  emptyLabel,
  isPrinting,
  labelFormat,
  type,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  emptyLabel: string;
  isPrinting: boolean;
  labelFormat?: string;
  type?: 'donut' | 'pie';
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const isDark = darkMode && !isPrinting;

  return (
    <div
      className="no-break"
      style={{ height: '100%', marginLeft: 15, width: '100%%' }}
    >
      {data && data.length > 0 ? (
        <ResponsivePie
          activeOuterRadiusOffset={8}
          arcLabel={(e) =>
            labelFormat ? `${labelFormat}${e.value}` : `${e.value}`
          }
          arcLabelsSkipAngle={10}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsStraightLength={0}
          arcLinkLabelsThickness={2}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          borderWidth={1}
          colors={colours}
          cornerRadius={3}
          data={data?.map((item) => ({
            id: item?.label || '',
            label: item?.label || '',
            value: item?.value || 0,
          }))}
          // arcLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          enableArcLinkLabels={false}
          fit
          innerRadius={type === 'donut' || !type ? 0.5 : 0}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              itemDirection: 'left-to-right',
              itemHeight: 20,
              itemTextColor: isDark ? '#fff' : '#3a3a3a',
              itemWidth: 100,
              itemsSpacing: 1,
              justify: false,
              symbolSize: 20,
              translateX: -40,
              translateY: -20,
            },
          ]}
          margin={{ bottom: 20, left: -120, right: 0, top: 20 }}
          // arcLinkLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          padAngle={0.7}
          theme={{
            text: {
              color: isDark ? '#fff' : '#000',
            },
          }}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default DonutGraph;
