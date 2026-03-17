import type { AgChartOptions } from 'ag-charts-enterprise';

import { useStoreState } from '#/state';
import { TableOutlined } from '@ant-design/icons';
import { AgCharts as AgChartsEnterprise } from 'ag-charts-enterprise';
import { Button, Card, Empty, Modal, Skeleton, Table } from 'antd';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

type CrimeTypeItem = NonNullable<
  RetailAdminDashboardQuery['retailAdminDashboard']['crimeTypeDistribution']
>[number];

interface CrimeTypeDistributionProps {
  data: CrimeTypeItem[];
  loading: boolean;
}

const AgEnterpriseChart: React.FC<{ options: AgChartOptions }> = ({
  options,
}) => {
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

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
};

const CrimeTypeDistribution: React.FC<CrimeTypeDistributionProps> = ({
  data,
  loading,
}) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const [modalOpen, setModalOpen] = useState(false);

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      series: [
        {
          colorRange: ['#bae0ff', '#0958d9'],
          data: [
            {
              children: [...data]
                .sort((a, b) => b.count - a.count)
                .slice(0, 15),
              tagName: intl.formatMessage({ defaultMessage: 'Crime Types' }),
            },
          ],
          labelKey: 'tagName',
          sizeKey: 'count',
          sizeName: intl.formatMessage({ defaultMessage: 'Incidents' }),
          tooltip: {
            renderer: ({
              datum,
              sizeName,
            }: {
              datum: CrimeTypeItem;
              sizeName: string;
            }) => ({
              content: `${datum.tagName}: ${datum.count} ${sizeName}`,
            }),
          },
          type: 'treemap',
        },
      ],
      theme: darkMode ? 'ag-default-dark' : 'ag-default',
    }),
    [data, darkMode, intl]
  );

  const tableData = useMemo(
    () =>
      [...data]
        .sort((a, b) => b.count - a.count)
        .map((item) => ({ ...item, key: item.tagId })),
    [data]
  );

  const columns = [
    {
      dataIndex: 'tagName',
      key: 'tagName',
      title: intl.formatMessage({ defaultMessage: 'Crime Type' }),
    },
    {
      dataIndex: 'count',
      key: 'count',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
    },
  ];

  return (
    <>
      <Card
        bodyStyle={{ padding: 0 }}
        extra={
          <Button
            icon={<TableOutlined />}
            onClick={() => setModalOpen(true)}
            size="small"
            type="text"
          />
        }
        style={{ height: '100%' }}
        title={intl.formatMessage({
          defaultMessage: 'Crime Type Distribution',
        })}
      >
        {loading && data.length === 0 ? (
          <Skeleton active paragraph={{ rows: 5 }} style={{ padding: 24 }} />
        ) : data.length === 0 ? (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No data available',
            })}
            style={{ padding: 24 }}
          />
        ) : (
          <div style={{ height: 360, width: '100%' }}>
            <AgEnterpriseChart options={chartOptions} />
          </div>
        )}
      </Card>

      <Modal
        footer={null}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        title={intl.formatMessage({
          defaultMessage: 'Crime Type Distribution',
        })}
        width={500}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          size="small"
        />
      </Modal>
    </>
  );
};

export default CrimeTypeDistribution;
