import Graph from '#/components/reports/graphs/graph';
import { Card, Grid } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
const { useBreakpoint } = Grid;

import utils from '#/utils';

interface Props {
  data: { label: string; value: number }[];
  loading: boolean;
}
const DayOfWeekBar = ({ data, loading }: Props) => {
  const intl = useIntl();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('xl');

  useEffect(() => {
    if (!elementRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries as { contentRect: { height: number } }[]) {
        setHeight(entry?.contentRect?.height);
      }
    });

    resizeObserver.observe(elementRef.current);

    // Cleanup on unmount
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        padding: 10,
      }}
      loading={loading}
      ref={elementRef}
      style={{ height: '100%' }}
    >
      <Graph
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No incidents',
        })}
        graphOptions={{
          axes: [
            {
              label: {
                enabled: !isMobile,
              },
              type: 'number',
            },
            {
              type: 'category',
            },
          ],
          data: data.map((item) => ({
            day: item.label,
            incidents: item.value,
          })),
          height: height - 36,
          legend: {
            enabled: false,
          },
          series: [
            {
              type: 'bar',
              xKey: 'day',
              xName: 'Day',
              yKey: 'incidents',
              yName: 'Incidents',
            },
          ],
        }}
        gridOptions={{
          columnDefs: [
            { field: 'day', headerName: 'Day' },
            { field: 'count', headerName: 'Incident Count' },
          ],
          rowData: data.map((item) => ({
            count: item.value,
            day: item?.label,
          })),
        }}
        label={intl.formatMessage({
          defaultMessage: 'Incidents by day of week',
        })}
        loading={!loading}
      />
    </Card>
  );
};

export default DayOfWeekBar;
