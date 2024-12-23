import type { BusinessLossRecoveredGraphQueryVariables } from '#/components/reports/components/BusinessLossRecoveredGraph/__generated__/BusinessLossRecoveredGraph.generated';
import type { AgChartOptions } from 'ag-charts-community';

import { useBusinessLossRecoveredGraphQuery } from '#/components/reports/components/BusinessLossRecoveredGraph/__generated__/BusinessLossRecoveredGraph.generated';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import MultiBarGraph from '../../graphs/graph';

interface Props {
  editMode: boolean;
  isPrinting: boolean;
  onNavigate: () => void;
  removeItem: () => void;
  variables: BusinessLossRecoveredGraphQueryVariables;
}

const BusinessLossRecoveredGraph = ({
  editMode,
  isPrinting,
  onNavigate,
  removeItem,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessLossRecoveredGraphQuery({
    variables,
  });

  const options: AgChartOptions = {
    annotations: {
      enabled: false,
    },
    axes: [
      {
        keys: ['business'],
        paddingInner: 0.5,
        paddingOuter: 0.2,
        position: 'bottom',
        type: 'category',
      },
      {
        keys: ['value', 'recovered'],
        position: 'left',
        title: {
          text: intl.formatMessage({ defaultMessage: 'Incident Value' }),
        },
        type: 'number',
      },
      {
        keys: ['count'],
        position: 'right',
        title: {
          text: intl.formatMessage({ defaultMessage: 'Incident Count' }),
        },
        type: 'number',
      },
    ],
    background: {
      fill: 'transparent',
    },
    data: data?.businessLossRecoveredGraph.map((item) => ({
      business: item.label,
      count: item.data[2]?.value,
      interactionDurationTM: 1.23,
      interactionDurationYM: 2.85,
      numberOfLooksTM: 60,
      numberOfLooksYM: 64,
      recovered: item.data[1]?.value,
      value: item.data[0]?.value,
    })),
    legend: {
      position: 'top',
    },
    series: [
      {
        legendItemName: 'Lost Value',
        stackGroup: 'VALUE',
        // @ts-expect-error combination graph type issue
        type: 'bar',
        xKey: 'business',
        yKey: 'value',
        yName: 'Lost Value',
      },
      {
        legendItemName: 'Recovered Value',
        stackGroup: 'VALUE',
        // @ts-expect-error combination graph type issue
        type: 'bar',
        xKey: 'business',
        yKey: 'recovered',
        yName: 'Recovered Value',
      },
      {
        legendItemName: 'Incident Count',
        line: {
          strokeWidth: 0,
        },
        stackGroup: 'COUNT',
        // @ts-expect-error combination graph type issue
        type: 'line',
        xKey: 'business',
        yKey: 'count',
        yName: 'Incident Count',
      },
    ],
    theme: {
      overrides: {
        line: {
          series: {
            marker: {
              size: 10,
            },
            strokeWidth: 0,
          },
          width: 0,
        },
      },
      palette: {
        fills: [
          '#5090dc',
          '#ffa03a',
          '#000',
          // "#459d55",
          '#34bfe1',
          '#e1cc00',
          '#9669cb',
          '#b5b5b5',
          '#bd5aa7',
          '#8a6224',
          '#ef5452',
        ],
      },
    },
  };

  return (
    <>
      {editMode ? (
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={removeItem}
          shape="circle"
          size="small"
          type="text"
        />
      ) : (
        <Button
          className="change-graph1-view-more"
          danger
          onClick={onNavigate}
          // style={{ position: 'absolute', right: 5, top: 15, zIndex: 1 }}
          size="small"
          type="text"
        >
          {intl.formatMessage({
            defaultMessage: 'View More',
          })}
        </Button>
      )}
      <MultiBarGraph
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Incident Types',
        })}
        graphOptions={options}
        gridOptions={{
          columnDefs: [
            { field: 'business' },
            { field: 'count' },
            {
              field: 'value',
              valueFormatter: ({ value }: { value: number }) =>
                `£${value.toFixed(2)}`,
            },
            {
              field: 'loss',
              valueFormatter: ({ value }: { value: number }) =>
                `£${value.toFixed(2)}`,
            },
          ],
          rowData: data?.businessLossRecoveredGraph.map((item) => ({
            business: item?.label,
            count: item?.data[2]?.value,
            loss: item?.data[1]?.value,
            value: item?.data[0]?.value,
          })),
        }}
        isPrinting={isPrinting}
        label={intl.formatMessage({
          defaultMessage: 'Business Loss Recovered Graph',
        })}
        loading={
          (data?.businessLossRecoveredGraph &&
            data?.businessLossRecoveredGraph.length > 0) ??
          false
        }
      />
    </>
  );
};

export default BusinessLossRecoveredGraph;
