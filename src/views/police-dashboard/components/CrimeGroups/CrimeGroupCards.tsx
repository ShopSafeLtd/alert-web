import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faStore,
  faUsers as faUsersIcon,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Empty, Row, Skeleton, Tag, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface CrimeGroupCardsProps {
  groups:
    | PoliceHubDashboardQuery['policeHubDashboard']['activeCrimeGroups']
    | undefined;
  loading: boolean;
}

const CrimeGroupCards: React.FC<CrimeGroupCardsProps> = ({
  groups,
  loading,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const getSophisticationBadge = (
    level: 'HIGH' | 'LOW' | 'MEDIUM' | null | undefined
  ) => {
    if (!level) {
      return <Tag>{intl.formatMessage({ defaultMessage: 'Unknown' })}</Tag>;
    }

    const configs = {
      HIGH: {
        color: '#f5222d',
        icon: '⚠️',
        label: intl.formatMessage({ defaultMessage: 'Highly Organized' }),
      },
      LOW: {
        color: '#faad14',
        icon: '👤',
        label: intl.formatMessage({ defaultMessage: 'Loosely Organized' }),
      },
      MEDIUM: {
        color: '#fa8c16',
        icon: '👥',
        label: intl.formatMessage({ defaultMessage: 'Organized' }),
      },
    };

    const config = configs[level];

    return (
      <Tag color={config.color} style={{ color: '#fff', fontWeight: 600 }}>
        {config.icon} {config.label}
      </Tag>
    );
  };

  if (loading) {
    return (
      <Card
        style={{ marginTop: 24 }}
        title={intl.formatMessage({ defaultMessage: '👥 Active Crime Groups' })}
      >
        <Row gutter={[16, 16]}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} lg={8} md={12} xs={24}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <Card
        style={{ marginTop: 24 }}
        title={intl.formatMessage({ defaultMessage: '👥 Active Crime Groups' })}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No active crime groups in this period',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      style={{ marginTop: 24 }}
      title={intl.formatMessage({ defaultMessage: '👥 Active Crime Groups' })}
    >
      <Row gutter={[16, 16]}>
        {groups.slice(0, 6).map((group) => (
          <Col key={group.sharedCrimeGroupId} lg={8} md={12} xs={24}>
            <Card
              bodyStyle={{ padding: 16 }}
              hoverable
              onClick={() =>
                navigate(
                  `/app/police/crime-groups/view/${group.sharedCrimeGroupId}`
                )
              }
              style={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Sophistication Badge */}
              <div style={{ marginBottom: 12 }}>
                {getSophisticationBadge(
                  group.aiSophisticationLevel as
                    | 'HIGH'
                    | 'LOW'
                    | 'MEDIUM'
                    | null
                    | undefined
                )}
              </div>

              {/* Priority Score */}
              {group.policePriorityScore !== null && (
                <Typography.Title level={5} style={{ marginBottom: 16 }}>
                  {intl.formatMessage(
                    { defaultMessage: 'Priority: {score}/100' },
                    { score: group.policePriorityScore }
                  )}
                </Typography.Title>
              )}

              {/* Statistics */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  <FontAwesomeIcon
                    icon={faUsersIcon}
                    style={{ marginRight: 8 }}
                  />
                  <Typography.Text>
                    {intl.formatMessage(
                      { defaultMessage: '{count} Known Members' },
                      { count: group.memberCount }
                    )}
                  </Typography.Text>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <Typography.Text>
                    {intl.formatMessage(
                      { defaultMessage: '📊 {count} Recent Incidents' },
                      { count: group.recentActivityCount }
                    )}
                  </Typography.Text>
                </div>
                {group.totalValue !== null &&
                  group.totalValue !== undefined && (
                    <div style={{ marginBottom: 8 }}>
                      <Typography.Text>
                        {intl.formatMessage(
                          {
                            defaultMessage: '💷 {currency}{value} Total Value',
                          },
                          {
                            currency,
                            value: group.totalValue.toLocaleString(),
                          }
                        )}
                      </Typography.Text>
                    </div>
                  )}
                <div>
                  <FontAwesomeIcon icon={faStore} style={{ marginRight: 8 }} />
                  <Typography.Text>
                    {intl.formatMessage(
                      {
                        defaultMessage: '{count} Retail Partners Affected',
                      },
                      { count: group.affectedSchemes.length }
                    )}
                  </Typography.Text>
                </div>
              </div>

              {/* AI Summary */}
              {group.aiSummary && (
                <Typography.Paragraph
                  ellipsis={{ rows: 3 }}
                  style={{ marginBottom: 16 }}
                  type="secondary"
                >
                  {group.aiSummary}
                </Typography.Paragraph>
              )}

              {/* View Button */}
              <Button
                block
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/app/police/crime-groups/view/${group.sharedCrimeGroupId}`
                  );
                }}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'View Full Intelligence',
                })}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CrimeGroupCards;
