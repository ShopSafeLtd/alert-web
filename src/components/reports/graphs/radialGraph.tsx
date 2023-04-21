import { Empty, Typography } from 'antd';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';

const RadialGraph = ({
  data,
  label,
  emptyLabel,
}: {
  data:
    | Array<{ __typename?: 'Graph'; label: string; value: number } | null>
    | null
    | undefined;
  label: string;
  emptyLabel: string;
}) => (
  <div style={{ height: '100%', width: '100%%' }}>
    <Typography.Title level={4}>{label}</Typography.Title>
    {data && data.length > 0 ? (
      <ResponsivePie
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 6,
            itemDirection: 'left-to-right',
            itemWidth: 150,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'square',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={0}
        arcLinkLabelsColor={{ from: '' }}
        arcLabelsSkipAngle={3}
        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
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

export default RadialGraph;
