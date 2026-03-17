import { BanCountdown } from '#/components/dashboard-widgets';
import {
  Button,
  Card,
  Col,
  Empty,
  List,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { StoreColleagueDashboardQuery } from '../../graphql/queries/__generated__/store-colleague-dashboard.generated';

interface ActionItemsProps {
  actionItems:
    | StoreColleagueDashboardQuery['storeColleagueDashboard']['actionItems']
    | null
    | undefined;
  loading: boolean;
}

const ActionItems: React.FC<ActionItemsProps> = ({ actionItems, loading }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Card title={intl.formatMessage({ defaultMessage: 'Action Items' })}>
      {loading && !actionItems ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : actionItems ? (
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <Typography.Title level={5}>
              {intl.formatMessage({
                defaultMessage: 'Incidents Pending Approval',
              })}
            </Typography.Title>
            {actionItems.incidentsPendingApproval.length === 0 ? (
              <Typography.Text type="secondary">
                {intl.formatMessage({ defaultMessage: 'All clear' })}
              </Typography.Text>
            ) : (
              <List
                dataSource={actionItems.incidentsPendingApproval}
                renderItem={(incident) => (
                  <List.Item
                    actions={[
                      <Button
                        key="review"
                        onClick={() =>
                          navigate(`/app/incidents/view/${incident.id}`)
                        }
                        size="small"
                        type="link"
                      >
                        {intl.formatMessage({ defaultMessage: 'Review' })}
                      </Button>,
                    ]}
                  >
                    <Typography.Text>
                      {intl.formatMessage(
                        { defaultMessage: '#{ref} — {date}' },
                        {
                          date: new Date(incident.date).toLocaleDateString(),
                          ref: incident.reference ?? incident.id,
                        }
                      )}
                    </Typography.Text>
                  </List.Item>
                )}
                size="small"
              />
            )}
          </Col>
          <Col md={12} xs={24}>
            <Typography.Title level={5}>
              {intl.formatMessage({ defaultMessage: 'Bans Expiring Soon' })}
            </Typography.Title>
            {actionItems.bansExpiringSoon.length === 0 ? (
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  defaultMessage: 'No bans expiring soon',
                })}
              </Typography.Text>
            ) : (
              <List
                dataSource={actionItems.bansExpiringSoon}
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
                          intl.formatMessage({ defaultMessage: 'Unknown' })}
                      </Typography.Text>
                    </List.Item>
                  );
                }}
                size="small"
              />
            )}
          </Col>
        </Row>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No action items',
          })}
        />
      )}
    </Card>
  );
};

export default ActionItems;
