import { BanCountdown } from '#/components/dashboard-widgets';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Collapse,
  Empty,
  List,
  Row,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

interface OperationalQueueProps {
  data:
    | RetailAdminDashboardQuery['retailAdminDashboard']['operationalQueue']
    | null
    | undefined;
  loading: boolean;
}

const OperationalQueue: React.FC<OperationalQueueProps> = ({
  data,
  loading,
}) => {
  const intl = useIntl();

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Operational Queue' })}
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : data ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col sm={6} xs={12}>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Pending Approval',
                })}
                value={data.pendingApproval}
              />
            </Col>
            <Col sm={6} xs={12}>
              <Statistic
                title={intl.formatMessage({ defaultMessage: 'Expiring Bans' })}
                value={data.expiringBansCount}
              />
            </Col>
            <Col sm={6} xs={12}>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Open Investigations',
                })}
                value={data.openInvestigations}
              />
            </Col>
          </Row>
          {data.pendingApproval === 0 &&
            data.expiringBansCount === 0 &&
            data.openInvestigations === 0 && (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  padding: '24px 0 8px',
                }}
              >
                <CheckCircleOutlined
                  style={{ color: '#52c41a', fontSize: 32 }}
                />
                <Typography.Text strong style={{ color: '#52c41a' }}>
                  {intl.formatMessage({ defaultMessage: 'All clear' })}
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: '#8c8c8c',
                    fontSize: 13,
                    textAlign: 'center',
                  }}
                >
                  {intl.formatMessage({
                    defaultMessage:
                      'No pending approvals, expiring bans, or open investigations.',
                  })}
                </Typography.Text>
              </div>
            )}
          {data.expiringBans && data.expiringBans.length > 0 && (
            <Collapse>
              <Collapse.Panel
                header={intl.formatMessage(
                  { defaultMessage: 'Expiring Bans ({count})' },
                  { count: data.expiringBans.length }
                )}
                key="bans"
              >
                <List
                  dataSource={data.expiringBans}
                  renderItem={(ban) => {
                    const daysRemaining = Math.max(
                      0,
                      Math.ceil(
                        (new Date(ban.endDate).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )
                    );
                    return (
                      <List.Item
                        extra={<BanCountdown daysRemaining={daysRemaining} />}
                      >
                        <Typography.Text>
                          {ban.offenderName ??
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                            })}
                        </Typography.Text>
                      </List.Item>
                    );
                  }}
                  size="small"
                />
              </Collapse.Panel>
            </Collapse>
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

export default OperationalQueue;
