import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { WarningOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Empty,
  Modal,
  Row,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

type BusinessItem = NonNullable<
  RetailAdminDashboardQuery['retailAdminDashboard']['businessIntelligence']
>['topByValue'][number];

interface BusinessIntelligenceProps {
  data:
    | RetailAdminDashboardQuery['retailAdminDashboard']['businessIntelligence']
    | null
    | undefined;
  loading: boolean;
}

const BusinessIntelligence: React.FC<BusinessIntelligenceProps> = ({
  data,
  loading,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const onRow = (record: BusinessItem) => ({
    onClick: () => navigate(`/app/businesses/view/${record.id}`),
    style: { cursor: 'pointer' },
  });

  const valueColumns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Business' }),
    },
    {
      dataIndex: 'totalValue',
      key: 'totalValue',
      render: (v: number) =>
        intl.formatNumber(v, { currency, style: 'currency' }),
      title: intl.formatMessage({ defaultMessage: 'Total Value' }),
      width: 110,
    },
  ];

  const countColumns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Business' }),
    },
    {
      dataIndex: 'incidentCount',
      key: 'incidentCount',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
      width: 90,
    },
  ];

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Business Intelligence' })}
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : data ? (
        <>
          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Typography.Title level={5}>
                {intl.formatMessage({ defaultMessage: 'Top by Value' })}
              </Typography.Title>
              <Table
                columns={valueColumns}
                dataSource={data.topByValue}
                onRow={onRow}
                pagination={false}
                rowKey="id"
                size="small"
              />
            </Col>
            <Col md={12} xs={24}>
              <Typography.Title level={5}>
                {intl.formatMessage({
                  defaultMessage: 'Top by Incident Count',
                })}
              </Typography.Title>
              <Table
                columns={countColumns}
                dataSource={data.topByCount}
                onRow={onRow}
                pagination={false}
                rowKey="id"
                size="small"
              />
            </Col>
          </Row>
          {data.goingDarkCount > 0 && (
            <>
              <div
                onClick={() => setModalOpen(true)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    '#fff1b8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    '#fffbe6';
                }}
                style={{
                  alignItems: 'center',
                  background: '#fffbe6',
                  border: '1px solid #ffe58f',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 10,
                  marginTop: 16,
                  padding: '10px 14px',
                  transition: 'background 0.15s ease',
                }}
              >
                <WarningOutlined
                  style={{ color: '#faad14', flexShrink: 0, fontSize: 16 }}
                />
                <div style={{ flex: 1 }}>
                  <Typography.Text strong style={{ color: '#874d00' }}>
                    {intl.formatMessage({ defaultMessage: 'Going Dark Alert' })}
                  </Typography.Text>
                  <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          '{count, plural, one {# business has} other {# businesses have}} stopped reporting in the last 30 days.',
                      },
                      { count: data.goingDarkCount }
                    )}
                  </div>
                </div>
                <Typography.Text
                  style={{ color: '#faad14', flexShrink: 0, fontSize: 12 }}
                >
                  {intl.formatMessage({ defaultMessage: 'View details →' })}
                </Typography.Text>
              </div>
              <Modal
                footer={null}
                onCancel={() => setModalOpen(false)}
                open={modalOpen}
                title={intl.formatMessage({
                  defaultMessage: 'Going Dark — Businesses Not Reporting',
                })}
                width={900}
              >
                <Typography.Paragraph type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'The following {count, plural, one {# business has} other {# businesses have}} not submitted any incidents in the last 30 days.',
                    },
                    { count: data.goingDarkCount }
                  )}
                </Typography.Paragraph>
                <div
                  style={{
                    display: 'grid',
                    gap: 8,
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(160px, 1fr))',
                  }}
                >
                  {data.goingDarkNames.map((name) => (
                    <div
                      key={name}
                      style={{
                        alignItems: 'center',
                        background: '#fffbe6',
                        border: '1px solid #ffe58f',
                        borderRadius: 6,
                        display: 'flex',
                        gap: 6,
                        padding: '8px 10px',
                      }}
                    >
                      <WarningOutlined
                        style={{
                          color: '#faad14',
                          flexShrink: 0,
                          fontSize: 13,
                        }}
                      />
                      <Typography.Text
                        ellipsis={{ tooltip: name }}
                        style={{ fontSize: 13 }}
                      >
                        {name}
                      </Typography.Text>
                    </div>
                  ))}
                </div>
              </Modal>
            </>
          )}
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No data available',
          })}
        />
      )}
    </Card>
  );
};

export default BusinessIntelligence;
