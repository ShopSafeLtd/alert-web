import Graph from '#/components/reports/graphs/graph';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: {
    count: number;
    data: string;
  }[];
  isPrinting?: boolean;
  loading: boolean;
}

const IncidentsByDayOfWeekGraph = ({ data, isPrinting, loading }: Props) => {
  const intl = useIntl();
  return (
    <Graph
      emptyLabel={intl.formatMessage({
        defaultMessage: 'No incidents',
      })}
      graphOptions={{
        axes: [
          {
            keys: ['day'],
            paddingInner: 0.5,
            paddingOuter: 0.2,
            position: 'bottom',
            title: {
              text: intl.formatMessage({
                defaultMessage: 'Day',
              }),
            },
            // @ts-expect-error graph type error
            type: 'category',
          },
          {
            keys: ['count'],
            position: 'left',
            title: {
              text: intl.formatMessage({
                defaultMessage: 'Incident Count',
              }),
            },
            // @ts-expect-error graph type error
            type: 'number',
          },
        ],
        data,
        legend: {
          enabled: false,
        },
        series: [
          {
            legendItemName: intl.formatMessage({
              defaultMessage: 'Incident Count',
            }),
            stackGroup: 'VALUE',
            // @ts-expect-error graph type error
            type: 'area',
            xKey: 'day',
            yKey: 'count',
            yName: 'Incident Count',
          },
        ],
      }}
      gridOptions={{
        columnDefs: [{ field: 'day' }, { field: 'count' }],
        rowData: data,
      }}
      isPrinting={isPrinting}
      label={intl.formatMessage({
        defaultMessage: 'Incidents By Day Of Week',
      })}
      loading={loading}
    />
  );
};

export default IncidentsByDayOfWeekGraph;
