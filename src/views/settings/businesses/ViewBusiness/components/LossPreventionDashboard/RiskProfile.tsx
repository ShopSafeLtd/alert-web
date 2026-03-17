import { KpiStatCard } from '#/components/dashboard-widgets';
import {
  faBolt,
  faCircle,
  faTriangleExclamation,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Empty, Row, Skeleton, Tag, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

interface RiskProfileProps {
  loading: boolean;
  riskProfile:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['riskProfile']
    | null
    | undefined;
}

const getRiskLevelColor = (level: null | string | undefined): string => {
  switch (level?.toUpperCase()) {
    case 'LOW': {
      return 'green';
    }
    case 'MEDIUM': {
      return 'orange';
    }
    case 'HIGH':
    case 'CRITICAL': {
      return 'red';
    }
    default: {
      return 'default';
    }
  }
};

const RiskProfile: React.FC<RiskProfileProps> = ({ loading, riskProfile }) => {
  const intl = useIntl();

  return (
    <Card loading={loading} style={{ marginBottom: 0 }}>
      <Row gutter={16}>
        <Col>
          <FontAwesomeIcon icon={faBolt} style={{ height: 24, width: 24 }} />
        </Col>
        <Col flex={1}>
          <Row align="middle" gutter={8}>
            <Col>
              <Typography.Title level={4} style={{ margin: 0 }}>
                <FormattedMessage defaultMessage="AI Analysis" />
              </Typography.Title>
            </Col>
            {riskProfile?.aiRiskLevel && (
              <Col>
                <Tag color={getRiskLevelColor(riskProfile.aiRiskLevel)}>
                  {riskProfile.aiRiskLevel}
                </Tag>
              </Col>
            )}
            {riskProfile !== null &&
              riskProfile !== undefined &&
              riskProfile.aiRiskScore !== null && (
                <Col>
                  <Typography.Text type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Risk Score: {score}' },
                      { score: riskProfile.aiRiskScore }
                    )}
                  </Typography.Text>
                </Col>
              )}
          </Row>
        </Col>
      </Row>

      {loading && !riskProfile ? (
        <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 16 }} />
      ) : riskProfile ? (
        <>
          {(riskProfile.aiEngagementScore !== null ||
            riskProfile.aiDataQualityScore !== null) && (
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              {riskProfile.aiEngagementScore !== null && (
                <Col md={6} sm={12} xs={24}>
                  <KpiStatCard
                    loading={false}
                    title={intl.formatMessage({
                      defaultMessage: 'Engagement Score',
                    })}
                    value={riskProfile.aiEngagementScore}
                  />
                </Col>
              )}
              {riskProfile.aiDataQualityScore !== null && (
                <Col md={6} sm={12} xs={24}>
                  <KpiStatCard
                    loading={false}
                    title={intl.formatMessage({
                      defaultMessage: 'Data Quality',
                    })}
                    value={riskProfile.aiDataQualityScore}
                  />
                </Col>
              )}
            </Row>
          )}

          {riskProfile.aiKeyInsights &&
            riskProfile.aiKeyInsights.length > 0 && (
              <div style={{ marginTop: 16 }}>
                {riskProfile.aiKeyInsights.map((item) => (
                  <Row
                    align="middle"
                    gutter={8}
                    key={item}
                    style={{ marginBottom: 12, paddingLeft: 10 }}
                    wrap={false}
                  >
                    <Col>
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </Col>
                    <Col flex={1}>
                      <Typography.Paragraph style={{ marginBottom: 0 }}>
                        {item}
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                ))}
              </div>
            )}

          {riskProfile.aiUrgentActions &&
            riskProfile.aiUrgentActions.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Typography.Title level={5}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    style={{ color: '#fa8c16', marginRight: 8 }}
                  />
                  <FormattedMessage defaultMessage="Urgent Actions" />
                </Typography.Title>
                {riskProfile.aiUrgentActions.map((action) => (
                  <Row
                    align="middle"
                    gutter={8}
                    key={action}
                    style={{ marginBottom: 8, paddingLeft: 10 }}
                    wrap={false}
                  >
                    <Col>
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </Col>
                    <Col flex={1}>
                      <Typography.Paragraph style={{ marginBottom: 0 }}>
                        {action}
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                ))}
              </div>
            )}
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No AI analysis available',
          })}
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default RiskProfile;
