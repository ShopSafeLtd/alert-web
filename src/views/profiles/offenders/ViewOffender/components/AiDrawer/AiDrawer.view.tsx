import type { Theme } from '#/configs/ThemeConfig';

import useEnrichmentFormatting from '#/utils/useEnrichmentFormatting';
import { useOffenderAiDrawerQuery } from '#/views/profiles/offenders/ViewOffender/components/AiDrawer/__generated__/OffenderAiDrawer.generated';
import { Col, Drawer, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  offenderId: string;
  onClose: () => void;
  visible: boolean;
}

const OffenderAiDrawer = ({ offenderId, onClose, visible }: Props) => {
  const classes = useStyles();
  const {
    formatImpactCategory,
    formatStaffRisk,
    formatThreatLevel,
    getCategoryStyle,
    getStaffRiskStyle,
    getThreatLevelStyle,
  } = useEnrichmentFormatting();

  const { data, loading } = useOffenderAiDrawerQuery({
    variables: {
      where: {
        id: offenderId,
      },
    },
  });

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
                  style={getCategoryStyle(
                    data?.offender.aiImpactAssessment?.category
                  )}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Impact" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatImpactCategory(
                      data?.offender.aiImpactAssessment?.category
                    )}
                  </Title>
                </div>
              </div>
            </Col>
            <Col>
              <div className={classes.statCard}>
                <div
                  className={classes.statCardBackground}
                  style={getThreatLevelStyle(
                    data?.offender.aiRiskAssessment?.threatLevel
                  )}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Risk Level" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatThreatLevel(
                      data?.offender.aiRiskAssessment?.threatLevel
                    )}
                  </Title>
                </div>
              </div>
            </Col>
            <Col>
              <div className={classes.statCard}>
                <div
                  className={classes.statCardBackground}
                  style={getStaffRiskStyle(
                    data?.offender.aiRiskAssessment?.staffSafetyRisk
                  )}
                />
                <div className={classes.statCardContent}>
                  <Text className={classes.statTitle}>
                    <FormattedMessage defaultMessage="Staff Safety Risk" />
                  </Text>
                  <Title className={classes.statText} level={4}>
                    {formatStaffRisk(
                      data?.offender.aiRiskAssessment?.staffSafetyRisk
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
                      {data?.offender.aiSummary}
                    </Paragraph>
                  </Col>
                  <Col span={12}>
                    <Title className={classes.fieldTitle} level={4}>
                      <FormattedMessage defaultMessage="Key Observations" />
                    </Title>
                    <Row gutter={[16, 4]}>
                      {data?.offender.aiKeyObservations?.map((value) => (
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
                    <Row gutter={[16, 4]}>
                      {data?.offender.aiMethods?.map((value) => (
                        <Col>
                          <Text>{value}</Text>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Title className={classes.fieldTitle} level={4}>
                      <FormattedMessage defaultMessage="Modus Operandi" />
                    </Title>
                    <Paragraph className={classes.text}>
                      {data?.offender.aiMO}
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
                    {data?.offender.aiImpactAssessment?.overallScore}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Financial Impact" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiImpactAssessment?.financialImpact}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Security Resource Impact" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiImpactAssessment?.securityResourceImpact}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Justification" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiImpactAssessment?.justification}
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
                    <FormattedMessage defaultMessage="Violence Potential" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRiskAssessment?.violencePotential}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Threat Level" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRiskAssessment?.threatLevel}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Reoffending Probability" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRiskAssessment?.reoffendingProbability}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Escalation Potential" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRiskAssessment?.escalationPotential}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Confrontation Response" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRiskAssessment?.confrontationResponse}
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
                    <FormattedMessage defaultMessage="Learning Behavior" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiBehavioralAnalysis?.learningBehavior}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Risk Tolerance" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiBehavioralAnalysis?.riskTolerance}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Stress Response" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiBehavioralAnalysis?.stressResponse}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Geographical Analysis" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Geographic Pattern" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiGeographicAnalysis?.geographicPattern}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Hotspot Analysis" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiGeographicAnalysis?.hotspotAnalysis}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Travel Distance" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiGeographicAnalysis?.travelDistance}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Identity Linkage" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Distinctive Markers" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.offender.aiIdentityLinkage?.distinctiveMarkers.map(
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
                    <FormattedMessage defaultMessage="Identity Confidence" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiIdentityLinkage?.identityConfidence}
                  </Paragraph>
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
                    {data?.offender.aiQualityAssessment?.qualityScore}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Suggested Improvements" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.offender.aiQualityAssessment?.dataGaps.map(
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
                    <FormattedMessage defaultMessage="Suggested Improvements" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiQualityAssessment?.improvements}
                  </Paragraph>
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
                    <FormattedMessage defaultMessage="Priority Level" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRecommendedActions?.priorityLevel}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Early Warning Signals" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.offender.aiRecommendedActions?.earlyWarningSignals.map(
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
                    <FormattedMessage defaultMessage="Prevention Tactics" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.offender.aiRecommendedActions?.preventionTactics.map(
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
                    <FormattedMessage defaultMessage="Staff Guidance" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiRecommendedActions?.staffGuidance}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Target Analysis" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Priority Level" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiTargetAnalysis?.targetPreference}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Store Vulnerabilities" />
                  </Title>
                  <Row gutter={[16, 4]}>
                    {data?.offender.aiTargetAnalysis?.storeVulnerabilities.map(
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
                    <FormattedMessage defaultMessage="Value Range" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiTargetAnalysis?.valueRange}
                  </Paragraph>
                </Col>
              </Row>
            </div>
            <div className={classes.card}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title className={classes.sectionTitle} level={4}>
                    <FormattedMessage defaultMessage="AI Temporal Analysis" />
                  </Title>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Fequency Analysis" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiTemporalAnalysis?.frequencyAnalysis}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Pattern Prediction" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiTemporalAnalysis?.patternPrediction}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title className={classes.fieldTitle} level={4}>
                    <FormattedMessage defaultMessage="Time Patterns" />
                  </Title>
                  <Paragraph className={classes.text}>
                    {data?.offender.aiTemporalAnalysis?.timePatterns}
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

export default OffenderAiDrawer;
