import type { AgChartOptions } from 'ag-charts-community';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import { Card, Col, Empty, Row, Skeleton } from 'antd';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

type IncidentAnalysisData =
  LpStockLossReportQuery['lpStockLossReport']['incidentAnalysis'];

interface IncidentAnalysisProps {
  data: IncidentAnalysisData;
  loading: boolean;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const IncidentAnalysis: React.FC<IncidentAnalysisProps> = ({
  data,
  loading,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const theme = darkMode ? 'ag-default-dark' : 'ag-default';

  const byBusinessOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'bottom', type: 'number' },
        { position: 'left', type: 'category' },
      ],
      data: [...(data?.byBusiness ?? [])]
        .sort((a, b) => b.totalValueLost - a.totalValueLost)
        .slice(0, 10),
      series: [
        {
          direction: 'horizontal',
          fill: '#fa8c16',
          stroke: '#fa8c16',
          type: 'bar',
          xKey: 'name',
          yKey: 'totalValueLost',
          yName: intl.formatMessage({ defaultMessage: 'Value Lost' }),
        },
      ],
      theme,
    }),
    [data, currency, intl, theme]
  );

  const byHourOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'bottom', type: 'category' },
        { position: 'left', type: 'number' },
      ],
      data: (data?.byHour ?? []).map((h) => ({
        count: h.count,
        hour: `${String(h.hour).padStart(2, '0')}:00`,
      })),
      series: [
        {
          fill: '#52c41a',
          stroke: '#52c41a',
          type: 'bar',
          xKey: 'hour',
          yKey: 'count',
          yName: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
      ],
      theme,
    }),
    [data, intl, theme]
  );

  const byDayOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'bottom', type: 'category' },
        { position: 'left', type: 'number' },
      ],
      data: (data?.byDayOfWeek ?? []).map((d) => ({
        count: d.count,
        day: DAY_NAMES[d.dayOfWeek] ?? String(d.dayOfWeek),
      })),
      series: [
        {
          fill: '#722ed1',
          stroke: '#722ed1',
          type: 'bar',
          xKey: 'day',
          yKey: 'count',
          yName: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
      ],
      theme,
    }),
    [data, intl, theme]
  );

  if (loading && !data) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (!data) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No data available',
        })}
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card
          title={intl.formatMessage({
            defaultMessage: 'By Business (Top 10 by Value)',
          })}
        >
          {data.byBusiness.length === 0 ? (
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No data available',
              })}
            />
          ) : (
            <div style={{ height: 360 }}>
              <AgCharts options={byBusinessOptions} />
            </div>
          )}
        </Card>
      </Col>
      <Col lg={12} xs={24}>
        <Card title={intl.formatMessage({ defaultMessage: 'By Hour' })}>
          {data.byHour.length === 0 ? (
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No data available',
              })}
            />
          ) : (
            <div style={{ height: 360 }}>
              <AgCharts options={byHourOptions} />
            </div>
          )}
        </Card>
      </Col>
      <Col lg={12} xs={24}>
        <Card title={intl.formatMessage({ defaultMessage: 'By Day of Week' })}>
          {data.byDayOfWeek.length === 0 ? (
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No data available',
              })}
            />
          ) : (
            <div style={{ height: 360 }}>
              <AgCharts options={byDayOptions} />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default IncidentAnalysis;
