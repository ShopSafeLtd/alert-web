import type { Theme } from '#/configs/ThemeConfig';

import { useIncidentAiDetailsQuery } from '#/views/incidents/ViewIncident/components/AiDrawer/__generated__/IncidentAiDetails.generated';
import { Col, Drawer, Row, Skeleton, Typography } from 'antd';
import {
  AiImpactAssessmentCategory,
  AiRiskAssessmentSafetyRisk,
  AiRiskAssessmentThreatLevel,
} from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Masonry from 'react-responsive-masonry';

const { Paragraph, Text, Title } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.bodyBackground,
    padding: 24,
  },
  card: {
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    },
    backgroundColor: theme.componentBackground,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    margin: 12,
    padding: 24,
    transition: 'box-shadow 0.3s ease',
  },
  fieldTitle: {
    color: theme.secondaryText,
    fontSize: '14px !important',
    fontWeight: '500 !important',
    marginBottom: '8px !important',
  },
  listItem: {
    backgroundColor: theme.bodyBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 6,
    marginBottom: 8,
    padding: '8px 12px',
  },
  sectionTitle: {
    fontSize: '18px !important',
    fontWeight: '600 !important',
    marginBottom: '16px !important',
  },
  statCard: {
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    height: 120,
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 0.3s ease',
    width: 180,
  },
  statCardBackground: {
    borderRadius: 12,
    height: '100%',
    left: 0,
    opacity: 0.9,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 90,
  },
  statCardContent: {
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 101,
  },
  statText: {
    color: 'white !important',
    fontSize: '28px !important',
    fontWeight: '600 !important',
    marginBottom: '0px !important',
    marginTop: '4px !important',
  },
  statTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '13px !important',
    fontWeight: '500 !important',
  },
  stats: {
    marginBottom: 24,
  },
  summarySection: {
    marginBottom: 24,
  },
  text: {
    lineHeight: 1.6,
    marginBottom: '0px !important',
  },
}));

interface Props {
  incidentId: string;
  onClose: () => void;
  visible: boolean;
}

const IncidentAiDrawer = ({ incidentId, onClose, visible }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const { data, loading } = useIncidentAiDetailsQuery({
    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const formatImpactCategory = (
    category?: AiImpactAssessmentCategory | null
  ) => {
    switch (category) {
      case AiImpactAssessmentCategory.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiImpactAssessmentCategory.Medium: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiImpactAssessmentCategory.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };
  const formatThreatLevel = (category?: AiRiskAssessmentThreatLevel | null) => {
    switch (category) {
      case AiRiskAssessmentThreatLevel.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiRiskAssessmentThreatLevel.Medium: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiRiskAssessmentThreatLevel.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };
  const formatStaffRisk = (category?: AiRiskAssessmentSafetyRisk | null) => {
    switch (category) {
      case AiRiskAssessmentSafetyRisk.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiRiskAssessmentSafetyRisk.Moderate: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiRiskAssessmentSafetyRisk.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };

  return (
    <Drawer
      bodyStyle={{ flex: 1, padding: 0 }}
      onClose={onClose}
      title={
        <span style={{ fontSize: 18, fontWeight: 600 }}>
          <FormattedMessage defaultMessage="AI Incident Analysis Report" />
        </span>
      }
      visible={visible}
      width={1200}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <div className={classes.background}>
          <Row className={classes.stats} gutter={[16, 16]}>
            <Col>
              <div className={classes.statCard}>
                <div
                  className={classes.statCardBackground}
                  style={{
                    background: 'linear-gradient(to right,#cb2d3e,#ef473a)',
                  }}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Impact" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatImpactCategory(
                      data?.incident.aiImpactAssessment?.category
                    )}
                  </Title>
                </div>
              </div>
            </Col>
            <Col>
              <div className={classes.statCard}>
                <div
                  className={classes.statCardBackground}
                  style={{
                    background: 'linear-gradient(to right,#eea849,#f46b45)',
                  }}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Risk Level" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatThreatLevel(
                      data?.incident.aiRiskAssessment?.threatLevel
                    )}
                  </Title>
                </div>
              </div>
            </Col>
            <Col>
              <div className={classes.statCard}>
                <div
                  className={classes.statCardBackground}
                  style={{
                    background: 'linear-gradient(to right,#eea849,#f46b45)',
                  }}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Staff Safety Risk" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatStaffRisk(
                      data?.incident.aiRiskAssessment?.staffSafetyRisk
                    )}
                  </Title>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={classes.summarySection}>
            <Col span={24}>
              <div className={classes.card}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Title className={classes.sectionTitle} level={4}>
                      <FormattedMessage defaultMessage="Summary" />
                    </Title>
                    <Paragraph className={classes.text}>
                      {data?.incident.aiSummary}
                    </Paragraph>
                  </Col>
                  <Col span={12}>
                    <Title className={classes.fieldTitle} level={4}>
                      <FormattedMessage defaultMessage="Key Observations" />
                    </Title>
                    <div>
                      {data?.incident.aiKeyObservations?.map((value, index) => (
                        <div className={classes.listItem} key={index}>
                          <Text>{value}</Text>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col span={12}>
                    <Title className={classes.fieldTitle} level={4}>
                      <FormattedMessage defaultMessage="Identified Methods" />
                    </Title>
                    <Paragraph className={classes.text}>
                      {data?.incident.aiMethod}
                    </Paragraph>
                  </Col>
                  <Col span={24}>
                    <Title className={classes.fieldTitle} level={4}>
                      <FormattedMessage defaultMessage="Modus Operandi" />
                    </Title>
                    <Paragraph className={classes.text}>
                      {data?.incident.aiMO}
                    </Paragraph>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Masonry columnsCount={2} gutter={[16, 16]}>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Impact Assessment" />
                  </Title>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Overall Score" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiImpactAssessment?.overallScore}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Category" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiImpactAssessment?.category}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Key Factors" />
                  </Title>
                  <div>
                    {data?.incident.aiImpactAssessment?.keyFactors?.map(
                      (value, index) => (
                        <div className={classes.listItem} key={index}>
                          <Text>{value}</Text>
                        </div>
                      )
                    )}
                  </div>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Justification" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiImpactAssessment?.justification}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Risk Assessment" />
                  </Title>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Staff Safety Risk" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiRiskAssessment?.staffSafetyRisk}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Threat Level" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiRiskAssessment?.threatLevel}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Reoffending Probability" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiRiskAssessment?.reoffendingProbability}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Escalation Potential" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiRiskAssessment?.escalationPotential}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Behavioral Analysis" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Intervention Response" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiBehavioralAnalysis?.interventionResponse}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Planning Evidence" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiBehavioralAnalysis?.planningEvidence}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Tactics Used" />
                  </Title>
                  <div>
                    {data?.incident.aiBehavioralAnalysis?.tacticsUsed?.map(
                      (value, index) => (
                        <div className={classes.listItem} key={index}>
                          <Text>{value}</Text>
                        </div>
                      )
                    )}
                  </div>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Sophistication Level" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiBehavioralAnalysis?.sophisticationLevel}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Prevention Insights" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Vulnerabilities Exploited" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.incident.aiPreventionInsights?.vulnerabilitiesExploited.map(
                      (value) => (
                        <Col>
                          <Text>{value}</Text>
                        </Col>
                      )
                    )}
                  </Row>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Staffing Implications" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiPreventionInsights?.staffingImplications}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Recommendations" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.incident.aiPreventionInsights?.recommendations.map(
                      (value) => (
                        <Col>
                          <Text>{value}</Text>
                        </Col>
                      )
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Pattern Recognition" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Group Behavior Pattern" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiPatternRecognition?.groupBehaviorPattern}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Time Pattern Classification" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {
                      data?.incident.aiPatternRecognition
                        ?.timePatternClassification
                    }
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Known MO Match" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiPatternRecognition?.knownMOMatch}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Investigation Leads" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Suggested Actions" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.incident.aiInvestigationLeads?.suggestedActions.map(
                      (value) => (
                        <Col>
                          <Text>{value}</Text>
                        </Col>
                      )
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="Quality Assessment" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Quality Score" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiQualityScore}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Suggested Improvements" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.incident.aiImprovements}
                  </Paragraph>
                </Col>
              </Row>
            </div>
          </Masonry>
        </div>
      )}
    </Drawer>
  );
};

export default IncidentAiDrawer;
