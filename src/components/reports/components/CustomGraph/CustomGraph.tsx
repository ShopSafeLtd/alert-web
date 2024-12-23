import type { GraphToolsFormData } from '#/components/reports/graphs/graph-tools';
import type { MetaData } from '#/views/reports/types';
import type { AgChartOptions } from 'ag-charts-community';
import type { PerformanceReportQuery } from 'graphql/reports/queries/__generated__/performance-report.generated';

import Graph from '#/components/reports/graphs/graph';
import GraphTools from '#/components/reports/graphs/graph-tools';
import { faChartBar, faCog, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data?: PerformanceReportQuery;
  editMode: boolean;
  isPrinting: boolean;
  metadata: MetaData[];
  onNavigate: () => void;
  removeItem: (value: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const CustomGraph = ({
  data,
  editMode,
  isPrinting,
  metadata,
  removeItem,
  setMetadata,
}: Props) => {
  const intl = useIntl();
  const graphMetadata = useMemo(
    () => metadata.find((item) => item.key === 'crimeTypesDonut'),
    [metadata]
  );
  const formattedData = useMemo(
    () =>
      data?.performanceReport.crimeTypeDonut.map((item) => ({
        count: item.value,
        type: item.label,
      })),
    [data]
  );

  const [configOpen, setConfigDrawer] = useState(false);
  const [graphOptions, setGraphOptions] = useState<AgChartOptions>({
    legend: {
      position: 'right',
    },
    series: [
      {
        angleKey: 'count',
        calloutLabel: {
          enabled: false,
        },
        calloutLabelKey: 'type',
        calloutLabelName: 'type',
        innerRadiusRatio: 0.7,
        labelKey: 'count',
        sectorLabelKey: 'count',
        // @ts-expect-error ag graphs type issue
        type: graphMetadata?.type === 'pie' ? 'pie' : 'donut',
      },
    ],
  });

  useEffect(() => {
    switch (graphMetadata?.type) {
      case 'pie': {
        setGraphOptions({
          legend: {
            position: 'right',
          },
          series: [
            {
              angleKey: 'count',
              calloutLabel: {
                enabled: false,
              },
              calloutLabelKey: 'type',
              calloutLabelName: 'type',
              innerRadiusRatio: 0.7,
              labelKey: 'count',
              sectorLabelKey: 'count',
              // @ts-expect-error ag graphs type issue
              type: 'pie',
            },
          ],
        });
        return;
      }
      case 'donut': {
        setGraphOptions({
          legend: {
            position: 'right',
          },
          series: [
            {
              angleKey: 'count',
              calloutLabel: {
                enabled: false,
              },
              calloutLabelKey: 'type',
              calloutLabelName: 'type',
              innerRadiusRatio: 0.7,
              labelKey: 'count',
              sectorLabelKey: 'count',
              // @ts-expect-error ag graphs type issue
              type: 'donut',
            },
          ],
        });
        return;
      }
      case 'radial': {
        setGraphOptions({
          legend: {
            enabled: false,
          },
          series: [
            {
              // @ts-expect-error ag graphs type issue
              type: 'radial-bar',
              xKey: 'type',
              yKey: 'count',
            },
          ],
        });
        return;
      }
      default: {
        setGraphOptions({
          legend: {
            enabled: false,
          },
          series: [
            {
              type: 'bar',
              xKey: 'type',
              yKey: 'count',
            },
          ],
        });
        return;
      }
    }
  }, [graphMetadata]);

  const toggleConfigDrawer = () => {
    setConfigDrawer(!configOpen);
  };

  const setGraphConfig = (values: GraphToolsFormData) => {
    const updatedMetadata = metadata.map((item) => {
      if (item.key === 'crimeTypesDonut') {
        return { ...item, values };
      }
      return item;
    }) satisfies MetaData[];
    setMetadata(updatedMetadata);
  };

  return (
    <>
      <Button
        className="change-graph1 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
        onClick={toggleConfigDrawer}
        shape="circle"
        size="small"
        type="text"
      />
      <GraphTools
        onClose={toggleConfigDrawer}
        onSubmit={setGraphConfig}
        visible={configOpen}
      />

      <Button
        className="change-graph2 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faCog} size="lg" />}
        onClick={() => {
          const updatedMetadata = metadata.map((item) => {
            if (item.key === 'crimeTypesDonut') {
              if (item.type === 'donut') return { ...item, type: 'pie' };
              return { ...item, type: 'donut' };
            }
            return item;
          }) satisfies MetaData[];
          setMetadata(updatedMetadata);
        }}
        shape="circle"
        size="small"
        type="text"
      />
      <Button
        className="card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
        onClick={() => removeItem('crimeTypesDonut')}
        shape="circle"
        size="small"
        type="text"
      />
      {metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
        'donut' ||
      metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
        'pie' ? (
        <Graph
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types',
          })}
          graphOptions={{ ...graphOptions, data: formattedData }}
          gridOptions={{
            columnDefs: [
              {
                field: 'type',
              },
              {
                field: 'count',
              },
            ],
            rowData: formattedData,
          }}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incident Types',
          })}
          loading={!!data?.performanceReport?.crimeTypeDonut}
        />
      ) : (
        <Graph
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types',
          })}
          graphOptions={{
            data: data?.performanceReport?.crimeTypeDonut.map((item) => ({
              count: item.value,
              type: item.label,
            })),
          }}
          gridOptions={{
            columnDefs: [
              {
                field: 'type',
              },
              {
                field: 'count',
              },
            ],
            rowData: data?.performanceReport.crimeTypeDonut.map((item) => ({
              count: item.value,
              type: item.label,
            })),
          }}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incident Types',
          })}
          loading={!!data?.performanceReport?.crimeTypeDonut}
        />
      )}
    </>
  );
};

export default CustomGraph;
