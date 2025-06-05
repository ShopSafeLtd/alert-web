import type { AgChartOptions, AgChartTheme } from 'ag-charts-community';
import type { GridOptions } from 'ag-grid-charts-enterprise';

import colours from '#/components/reports/graphs/colours';
import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import { AgGridReact } from 'ag-grid-react';
import { Drawer, Empty, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

const Graph = ({
  emptyLabel,
  graphOptions,
  gridOptions,
  isPrinting,
  label,
  loading,
}: {
  emptyLabel: string;
  graphOptions: AgChartOptions;
  gridOptions: {
    columnDefs: GridOptions['columnDefs'];
    rowData: GridOptions['rowData'];
  };
  isPrinting?: boolean; // required if printing to make it light mode;
  label: string;
  loading: boolean;
}) => {
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const intl = useIntl();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(440);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(containerRef.current?.clientHeight ?? 440);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const theme: AgChartTheme = (graphOptions.theme as AgChartTheme) ?? {};
  const options: AgChartOptions = {
    background: {
      fill: 'transparent',
    },
    contextMenu: {
      extraActions: [
        {
          action: () => setShowData(true),
          label: intl.formatMessage({ defaultMessage: 'Show Underlying Data' }),
        },
      ],
    },
    height,
    legend: {
      position: 'top',
    },
    ...graphOptions,
    theme: {
      baseTheme: darkMode && !isPrinting ? 'ag-default-dark' : 'ag-default',
      palette: {
        fills: colours,
      },
      ...theme,
      overrides: {
        ...theme.overrides,
        bar: {
          series: {
            cornerRadius: 6,
            stroke: 'transparent',
            strokeWidth: 2,
          },
        },
      },
    },
  };

  return (
    <div
      className="no-break"
      ref={containerRef}
      style={{ height: '100%', width: '100%' }}
    >
      <Typography.Title level={4}>{label}</Typography.Title>
      {loading ? (
        <AgCharts options={options} />
      ) : (
        <Empty description={emptyLabel} />
      )}
      <Drawer
        bodyStyle={{ padding: 0 }}
        onClose={() => setShowData(false)}
        open={showData}
        title={label}
        width="80%"
      >
        <div
          className="ag-theme-quartz-auto-dark" // applying the Data Grid theme
          style={{ height: '100%' }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            columnDefs={gridOptions.columnDefs}
            rowData={gridOptions.rowData}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Graph;
