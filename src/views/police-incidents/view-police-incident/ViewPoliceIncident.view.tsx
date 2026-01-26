import {
  faBuilding,
  faChartLine,
  faLightbulb,
  faShieldCheck,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Col,
  Collapse,
  Descriptions,
  Empty,
  List,
  Result,
  Row,
  Tag,
  Typography,
} from 'antd';
import PoliceIncidentCard from 'components/police-incidents/PoliceIncidentCard';
import Loading from 'components/shared-components/AntD/Loading';
import { PoliceForce } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { GetSharedIncidentQuery } from '../graphql/queries/__generated__/get-shared-incident.generated';

const { Paragraph, Text, Title } = Typography;
const { Panel } = Collapse;

const policeAreaLabels: Record<PoliceForce, string> = {
  [PoliceForce.AvonAndSomerset]: 'Avon and Somerset Constabulary',
  [PoliceForce.Bedfordshire]: 'Bedfordshire Police',
  [PoliceForce.BritishTransportPolice]: 'British Transport Police',
  [PoliceForce.Cambridgeshire]: 'Cambridgeshire Constabulary',
  [PoliceForce.Cheshire]: 'Cheshire Constabulary',
  [PoliceForce.CityOfLondon]: 'City of London Police',
  [PoliceForce.Cleveland]: 'Cleveland Police',
  [PoliceForce.Cumbria]: 'Cumbria Constabulary',
  [PoliceForce.Derbyshire]: 'Derbyshire Constabulary',
  [PoliceForce.DevonAndCornwall]: 'Devon and Cornwall Police',
  [PoliceForce.Dorset]: 'Dorset Police',
  [PoliceForce.Durham]: 'Durham Constabulary',
  [PoliceForce.DyfedPowys]: 'Dyfed-Powys Police',
  [PoliceForce.Essex]: 'Essex Police',
  [PoliceForce.Gloucestershire]: 'Gloucestershire Constabulary',
  [PoliceForce.GreaterManchester]: 'Greater Manchester Police',
  [PoliceForce.Gwent]: 'Gwent Police',
  [PoliceForce.Hampshire]: 'Hampshire Constabulary',
  [PoliceForce.Hertfordshire]: 'Hertfordshire Constabulary',
  [PoliceForce.Humberside]: 'Humberside Police',
  [PoliceForce.Kent]: 'Kent Police',
  [PoliceForce.Lancashire]: 'Lancashire Constabulary',
  [PoliceForce.Leicestershire]: 'Leicestershire Police',
  [PoliceForce.Lincolnshire]: 'Lincolnshire Police',
  [PoliceForce.Merseyside]: 'Merseyside Police',
  [PoliceForce.Metropolitan]: 'Metropolitan Police',
  [PoliceForce.Norfolk]: 'Norfolk Constabulary',
  [PoliceForce.NorthWales]: 'North Wales Police',
  [PoliceForce.NorthYorkshire]: 'North Yorkshire Police',
  [PoliceForce.Northamptonshire]: 'Northamptonshire Police',
  [PoliceForce.Northumbria]: 'Northumbria Police',
  [PoliceForce.Nottinghamshire]: 'Nottinghamshire Police',
  [PoliceForce.PoliceScotland]: 'Police Scotland',
  [PoliceForce.Psni]: 'Police Service of Northern Ireland',
  [PoliceForce.SouthWales]: 'South Wales Police',
  [PoliceForce.SouthYorkshire]: 'South Yorkshire Police',
  [PoliceForce.Staffordshire]: 'Staffordshire Police',
  [PoliceForce.Suffolk]: 'Suffolk Constabulary',
  [PoliceForce.Surrey]: 'Surrey Police',
  [PoliceForce.Sussex]: 'Sussex Police',
  [PoliceForce.ThamesValley]: 'Thames Valley Police',
  [PoliceForce.Warwickshire]: 'Warwickshire Police',
  [PoliceForce.WestMercia]: 'West Mercia Police',
  [PoliceForce.WestMidlands]: 'West Midlands Police',
  [PoliceForce.WestYorkshire]: 'West Yorkshire Police',
  [PoliceForce.Wiltshire]: 'Wiltshire Police',
};

interface Props {
  data: GetSharedIncidentQuery | undefined;
  error: Error | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setLightBoxOpen: (value: { index: number; open: boolean }) => void;
}

const ViewPoliceIncident = ({
  data,
  error,
  lightBoxOpen,
  lightboxElements,
  loading,
  openLightbox,
  setLightBoxOpen,
}: Props): JSX.Element => {
  const intl = useIntl();

  if (loading) {
    return (
      <div className="page-container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Result
          status="error"
          subTitle={intl.formatMessage({
            defaultMessage:
              'Sorry, there was an error loading the incident details.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Error',
          })}
        />
      </div>
    );
  }

  const sharedIncident = data?.sharedIncident;

  if (!sharedIncident) {
    return (
      <div className="page-container">
        <Result
          status="404"
          subTitle={intl.formatMessage({
            defaultMessage: 'The incident you are looking for does not exist.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Incident Not Found',
          })}
        />
      </div>
    );
  }

  const incident = sharedIncident.incident;

  return (
    <div className="page-container">
      <Row gutter={[16, 16]}>
        {/* Header */}
        <Col span={24}>
          <Card>
            <Row align="middle" gutter={16} justify="space-between">
              <Col flex="auto">
                <Title level={2} style={{ margin: 0 }}>
                  {incident.subject ||
                    intl.formatMessage({ defaultMessage: 'Untitled Incident' })}
                </Title>
                <Text type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Shared Intelligence Record',
                  })}
                  {intl.formatMessage({ defaultMessage: ' • ' })}
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                    },
                    { reference: incident.reference }
                  )}
                </Text>
              </Col>
              <Col>
                <Row gutter={8}>
                  {sharedIncident.policePriorityScore !== null && (
                    <Col>
                      <Tag
                        color="red"
                        style={{ fontSize: 16, padding: '4px 12px' }}
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Priority: {score}',
                          },
                          { score: sharedIncident.policePriorityScore }
                        )}
                      </Tag>
                    </Col>
                  )}
                  {sharedIncident.policeArea && (
                    <Col>
                      <Tag
                        color="geekblue"
                        style={{ fontSize: 16, padding: '4px 12px' }}
                      >
                        {policeAreaLabels[sharedIncident.policeArea] ||
                          sharedIncident.policeArea}
                      </Tag>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Incident Card */}
        <Col lg={12} md={24} span={24} xl={8}>
          <PoliceIncidentCard
            compactView={false}
            openLightbox={openLightbox}
            sharedIncident={sharedIncident}
          />
        </Col>

        {/* AI Analysis Panel */}
        <Col lg={12} md={24} span={24} xl={16}>
          <Card
            title={
              <span>
                <FontAwesomeIcon
                  icon={faLightbulb}
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'AI Analysis',
                })}
              </span>
            }
          >
            {sharedIncident.aiSummary ? (
              <>
                {sharedIncident.aiSummary && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Summary' })}
                    </Title>
                    <Paragraph>{sharedIncident.aiSummary}</Paragraph>
                  </div>
                )}

                {sharedIncident.aiKeyObservations &&
                  sharedIncident.aiKeyObservations.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5}>
                        {intl.formatMessage({
                          defaultMessage: 'Key Observations',
                        })}
                      </Title>
                      <List
                        dataSource={sharedIncident.aiKeyObservations}
                        renderItem={(item) => (
                          <List.Item>
                            <Text>
                              {intl.formatMessage(
                                { defaultMessage: '• {item}' },
                                { item }
                              )}
                            </Text>
                          </List.Item>
                        )}
                        size="small"
                      />
                    </div>
                  )}

                {sharedIncident.aiMethod && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Method' })}
                    </Title>
                    <Paragraph>{sharedIncident.aiMethod}</Paragraph>
                  </div>
                )}

                {sharedIncident.aiMO && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Modus Operandi' })}
                    </Title>
                    <Paragraph>{sharedIncident.aiMO}</Paragraph>
                  </div>
                )}

                {sharedIncident.aiQualityScore !== null && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'AI Quality Score',
                      })}
                    </Title>
                    <Tag color="blue" style={{ fontSize: 14 }}>
                      {sharedIncident.aiQualityScore}
                    </Tag>
                  </div>
                )}
              </>
            ) : (
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'AI analysis is not yet available for this incident.',
                })}
              />
            )}
          </Card>
        </Col>

        {/* Cross-Scheme Intelligence */}
        <Col span={24}>
          <Card
            title={
              <span>
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8 }} />
                {intl.formatMessage({
                  defaultMessage: 'Cross-Scheme Intelligence',
                })}
              </span>
            }
          >
            <Descriptions
              bordered
              column={{ lg: 2, md: 2, sm: 1, xl: 3, xs: 1 }}
            >
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Schemes Sharing',
                })}
              >
                {sharedIncident.schemes.length}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'AI Quality Score',
                })}
              >
                {sharedIncident.aiQualityScore ||
                  intl.formatMessage({ defaultMessage: 'N/A' })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Police Priority Score',
                })}
              >
                {sharedIncident.policePriorityScore ||
                  intl.formatMessage({ defaultMessage: 'N/A' })}
              </Descriptions.Item>
            </Descriptions>

            {sharedIncident.schemes.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Title level={5}>
                  {intl.formatMessage({ defaultMessage: 'Sharing Schemes' })}
                </Title>
                <List
                  dataSource={sharedIncident.schemes}
                  renderItem={(scheme) => (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          scheme.hubForce
                            ? policeAreaLabels[scheme.hubForce] ||
                              scheme.hubForce
                            : intl.formatMessage({
                                defaultMessage: 'Unknown Force',
                              })
                        }
                        title={scheme.name}
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Card>
        </Col>

        {/* Incident Details */}
        <Col span={24}>
          <Card
            title={
              <span>
                <FontAwesomeIcon
                  icon={faShieldCheck}
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'Incident Details',
                })}
              </span>
            }
          >
            <Descriptions
              bordered
              column={{ lg: 2, md: 2, sm: 1, xl: 2, xs: 1 }}
            >
              {incident.subject && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Subject',
                  })}
                  span={2}
                >
                  {incident.subject}
                </Descriptions.Item>
              )}
              {incident.description && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Description',
                  })}
                  span={2}
                >
                  {incident.description}
                </Descriptions.Item>
              )}
              {incident.reference && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Reference',
                  })}
                >
                  {incident.reference}
                </Descriptions.Item>
              )}
              {incident.policeRef && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Police Reference',
                  })}
                >
                  {incident.policeRef}
                </Descriptions.Item>
              )}
              {incident.customerRef && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Customer Reference',
                  })}
                >
                  {incident.customerRef}
                </Descriptions.Item>
              )}
              {incident.priority && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Priority',
                  })}
                >
                  {incident.priority}
                </Descriptions.Item>
              )}
              {incident.dayTime && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date & Time',
                  })}
                >
                  {incident.dayTime}
                </Descriptions.Item>
              )}
              {incident.business && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                >
                  {incident.business.name}
                </Descriptions.Item>
              )}
              {incident.location && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Location',
                  })}
                  span={2}
                >
                  {incident.location.full}
                </Descriptions.Item>
              )}
              {incident.crimeTypes && incident.crimeTypes.length > 0 && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Crime Types',
                  })}
                  span={2}
                >
                  <Row gutter={[8, 8]}>
                    {incident.crimeTypes.map((crimeType) => (
                      <Col key={crimeType.id}>
                        <Tag color="red">{crimeType.name}</Tag>
                      </Col>
                    ))}
                  </Row>
                </Descriptions.Item>
              )}
              {incident.offenders && incident.offenders.length > 0 && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Offenders',
                  })}
                  span={2}
                >
                  <Row gutter={[8, 8]}>
                    {incident.offenders.map((offender) => (
                      <Col key={offender.id}>
                        <Link to={`/app/offenders/view/${offender.id}`}>
                          <Tag>
                            {offender.name ||
                              intl.formatMessage({
                                defaultMessage: 'Unknown Offender',
                              })}
                          </Tag>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* AI Snapshots */}
        {(sharedIncident.aiBehavioralAnalysisSnapshot ||
          sharedIncident.aiImpactAssessmentSnapshot ||
          sharedIncident.aiInvestigationLeadsSnapshot ||
          sharedIncident.aiNetworkAnalysisSnapshot ||
          sharedIncident.aiPatternRecognitionSnapshot ||
          sharedIncident.aiPreventionInsightsSnapshot ||
          sharedIncident.aiRiskAssessmentSnapshot) && (
          <Col span={24}>
            <Card
              title={
                <span>
                  <FontAwesomeIcon
                    icon={faChartLine}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'AI Analysis Snapshots',
                  })}
                </span>
              }
            >
              <Collapse>
                {sharedIncident.aiBehavioralAnalysisSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Behavioral Analysis',
                    })}
                    key="behavioral"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiBehavioralAnalysisSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiImpactAssessmentSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Impact Assessment',
                    })}
                    key="impact"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiImpactAssessmentSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiInvestigationLeadsSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Investigation Leads',
                    })}
                    key="investigation"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiInvestigationLeadsSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiNetworkAnalysisSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Network Analysis',
                    })}
                    key="network"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiNetworkAnalysisSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiPatternRecognitionSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Pattern Recognition',
                    })}
                    key="pattern"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiPatternRecognitionSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiPreventionInsightsSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Prevention Insights',
                    })}
                    key="prevention"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiPreventionInsightsSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedIncident.aiRiskAssessmentSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Risk Assessment',
                    })}
                    key="risk"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedIncident.aiRiskAssessmentSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}
              </Collapse>
            </Card>
          </Col>
        )}
      </Row>

      {/* Lightbox */}
      <Lightbox
        close={() => setLightBoxOpen({ index: 0, open: false })}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        slides={lightboxElements}
      />
    </div>
  );
};

export default ViewPoliceIncident;
