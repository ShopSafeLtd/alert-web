import type { AgChartOptions } from 'ag-charts-community';

import { PeakHoursBarChart } from '#/components/dashboard-widgets';
import { useStoreState } from '#/state';
import { TableOutlined } from '@ant-design/icons';
import { AgCharts as AgChartsEnterprise } from 'ag-charts-enterprise';
import { AgCharts } from 'ag-charts-react';
import {
  Button,
  Card,
  Col,
  Empty,
  Modal,
  Row,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const AgEnterpriseChart: React.FC<{
  options: AgChartOptions;
  style?: React.CSSProperties;
}> = ({ options, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef =
    useRef<Awaited<ReturnType<typeof AgChartsEnterprise.create>>>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const chart = AgChartsEnterprise.create({
      ...options,
      container: containerRef.current,
    });
    chartRef.current = chart;
    return () => {
      void chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chartRef.current && containerRef.current) {
      void chartRef.current.update({
        ...options,
        container: containerRef.current,
      });
    }
  }, [options]);

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%', ...style }}
    />
  );
};

type ModalKey = 'dayOfWeek' | 'monthlyTrend' | 'peakHours' | null;

interface ChartSectionProps {
  children: React.ReactNode;
  onViewTable: () => void;
  title: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  children,
  onViewTable,
  title,
}) => (
  <Col
    lg={8}
    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    xs={24}
  >
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 4,
      }}
    >
      <Typography.Title level={5} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      <Button
        icon={<TableOutlined />}
        onClick={onViewTable}
        size="small"
        type="text"
      />
    </div>
    <div style={{ flex: 1 }}>{children}</div>
  </Col>
);

interface CrimePatternsProps {
  data:
    | RetailAdminDashboardQuery['retailAdminDashboard']['crimePatterns']
    | null
    | undefined;
  loading: boolean;
}

const CrimePatterns: React.FC<CrimePatternsProps> = ({ data, loading }) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const [modalOpen, setModalOpen] = useState<ModalKey>(null);

  const dayOfWeekOptions: AgChartOptions = useMemo(
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
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [data, darkMode, intl]
  );

  const monthlyOptions: AgChartOptions = useMemo(() => {
    const countByMonth = new Map<string, number>();
    for (const item of data?.monthlyTrend ?? []) {
      const monthName =
        MONTHS[Number.parseInt(item.month.split('-')[1], 10) - 1] ?? item.month;
      countByMonth.set(
        monthName,
        (countByMonth.get(monthName) ?? 0) + item.count
      );
    }
    const heatmapData = MONTHS.map((m) => ({
      count: countByMonth.get(m) ?? 0,
      month: m,
      row: 'Incidents',
    })).filter((d) => d.count > 0);
    return {
      axes: [
        { position: 'bottom', type: 'category' },
        { label: { enabled: false }, position: 'left', type: 'category' },
      ],
      data: heatmapData,
      // @ts-expect-error heatmap is an enterprise series type
      series: [
        {
          colorKey: 'count',
          colorName: 'Incidents',
          colorRange: ['#e6f4ff', '#1890ff'],
          type: 'heatmap',
          xKey: 'month',
          yKey: 'row',
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    };
  }, [data, darkMode]);

  const peakHoursTableData = useMemo(() => {
    const countByHour = new Map(
      (data?.byHour ?? []).map((h) => [h.hour, h.count])
    );
    return Array.from({ length: 24 }, (_, hour) => ({
      amPm: hour < 12 ? 'AM' : 'PM',
      count: countByHour.get(hour) ?? 0,
      hour: `${String(hour).padStart(2, '0')}:00`,
      key: hour,
    }));
  }, [data]);

  const dayOfWeekTableData = useMemo(
    () =>
      (data?.byDayOfWeek ?? []).map((d) => ({
        count: d.count,
        day: DAY_NAMES[d.dayOfWeek] ?? String(d.dayOfWeek),
        key: d.dayOfWeek,
      })),
    [data]
  );

  const monthlyTableData = useMemo(
    () =>
      (data?.monthlyTrend ?? []).map((item) => ({
        count: item.count,
        key: item.month,
        month: item.month,
        totalValue: item.totalValue,
      })),
    [data]
  );

  const modalConfig: Record<
    Exclude<ModalKey, null>,
    { columns: object[]; dataSource: object[]; title: string }
  > = {
    dayOfWeek: {
      columns: [
        {
          dataIndex: 'day',
          key: 'day',
          title: intl.formatMessage({ defaultMessage: 'Day' }),
        },
        {
          dataIndex: 'count',
          key: 'count',
          title: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
      ],
      dataSource: dayOfWeekTableData,
      title: intl.formatMessage({ defaultMessage: 'Day of Week' }),
    },
    monthlyTrend: {
      columns: [
        {
          dataIndex: 'month',
          key: 'month',
          title: intl.formatMessage({ defaultMessage: 'Month' }),
        },
        {
          dataIndex: 'count',
          key: 'count',
          title: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
        {
          dataIndex: 'totalValue',
          key: 'totalValue',
          title: intl.formatMessage({ defaultMessage: 'Value' }),
        },
      ],
      dataSource: monthlyTableData,
      title: intl.formatMessage({ defaultMessage: 'Monthly Trend' }),
    },
    peakHours: {
      columns: [
        {
          dataIndex: 'hour',
          key: 'hour',
          title: intl.formatMessage({ defaultMessage: 'Hour' }),
        },
        {
          dataIndex: 'amPm',
          key: 'amPm',
          title: intl.formatMessage({ defaultMessage: 'AM/PM' }),
        },
        {
          dataIndex: 'count',
          key: 'count',
          title: intl.formatMessage({ defaultMessage: 'Incidents' }),
        },
      ],
      dataSource: peakHoursTableData,
      title: intl.formatMessage({ defaultMessage: 'Peak Hours' }),
    },
  };

  const activeModal = modalOpen ? modalConfig[modalOpen] : null;

  return (
    <>
      <Card
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 16,
        }}
      >
        {loading && !data ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : data ? (
          <Row gutter={[16, 0]} style={{ flex: 1, height: 0 }}>
            <ChartSection
              onViewTable={() => setModalOpen('peakHours')}
              title={intl.formatMessage({ defaultMessage: 'Peak Hours' })}
            >
              <PeakHoursBarChart data={data.byHour} />
            </ChartSection>
            <ChartSection
              onViewTable={() => setModalOpen('dayOfWeek')}
              title={intl.formatMessage({ defaultMessage: 'Day of Week' })}
            >
              <AgCharts options={dayOfWeekOptions} />
            </ChartSection>
            <ChartSection
              onViewTable={() => setModalOpen('monthlyTrend')}
              title={intl.formatMessage({ defaultMessage: 'Monthly Trend' })}
            >
              <AgEnterpriseChart options={monthlyOptions} />
            </ChartSection>
          </Row>
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No data available',
            })}
          />
        )}
      </Card>

      <Modal
        footer={null}
        onCancel={() => setModalOpen(null)}
        open={!!modalOpen}
        title={activeModal?.title}
        width={600}
      >
        <Table
          columns={activeModal?.columns as never}
          dataSource={activeModal?.dataSource as never}
          pagination={false}
          size="small"
        />
      </Modal>
    </>
  );
};

export default CrimePatterns;
