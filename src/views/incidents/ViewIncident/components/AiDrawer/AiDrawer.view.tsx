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
    padding: 15,
  },
  card: {
    backgroundColor: theme.componentBackground,
    borderRadius: 15,
    margin: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  fieldTitle: {
    fontSize: '15px !important',
    marginBottom: '2px !important',
  },
  sectionTitle: {
    fontSize: '17px !important',
    marginBottom: '2px !important',
  },
  statCard: {
    borderRadius: 15,
    height: 100,
    overflow: 'hidden',
    padding: 20,
    position: 'relative',
    width: 165,
  },
  statCardBackground: {
    borderRadius: 15,
    height: '100%',
    left: 0,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    width: 165,
    zIndex: 90,
  },
  statCardContent: {
    borderRadius: 15,
    height: '100%',
    left: 0,
    padding: 20,
    position: 'absolute',
    top: 0,
    width: 165,
    zIndex: 101,
  },
  statText: {
    color: 'white !important',
    fontSize: '25px !important',
    marginBottom: '0px !important',
    marginTop: '0px !important',
  },
  statTitle: {
    color: 'white',
    fontSize: '14px !important',
  },
  stats: {
    padding: 10,
  },
  text: {
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
      title={<FormattedMessage defaultMessage="Incident AI Report" />}
      visible={visible}
      width={1000}
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
          <Row>
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
                    <Row gutter={[16, 4]}>
                      {data?.incident.aiKeyObservations?.map((value) => (
                        <Col span={24}>
                          <Text>{value}</Text>
                        </Col>
                      ))}
                    </Row>
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
                  <Row gutter={[16, 4]}>
                    {data?.incident.aiImpactAssessment?.keyFactors.map(
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
                  <Row gutter={[16, 4]}>
                    {data?.incident.aiBehavioralAnalysis?.tacticsUsed.map(
                      (value) => (
                        <Col span={24}>
                          <Text>{value}</Text>
                        </Col>
                      )
                    )}
                  </Row>
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
