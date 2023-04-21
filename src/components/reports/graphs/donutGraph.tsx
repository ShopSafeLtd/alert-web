import { Empty } from 'antd';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import { useStoreState } from '../../../state';

const DonutGraph = ({
  data,

  emptyLabel,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  emptyLabel: string;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark';
  return (
    <div
      style={{ height: '100%', width: '100%%', marginLeft: 15 }}
      className="no-break"
    >
      {data && data.length > 0 ? (
        <ResponsivePie
          fit
          theme={{
            textColor: darkMode ? '#ffffff' : '#000',
          }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          margin={{ top: 20, right: 0, bottom: 20, left: -120 }}
          colors={{ scheme: darkMode ? 'dark2' : 'set2' }}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: -40,
              translateY: -20,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 0,
              symbolSize: 20,
              itemDirection: 'left-to-right',
              itemTextColor: darkMode ? '#fff' : '#3a3a3a',
            },
          ]}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsStraightLength={0}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          // arcLinkLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          // arcLabelsTextColor={darkMode ? '#fff' : '#3a3a3a'}
          enableArcLinkLabels={false}
          data={data?.map((item) => ({
            id: item?.label || '',
            label: item?.label || '',
            value: item?.value || 0,
          }))}
        />
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default DonutGraph;
