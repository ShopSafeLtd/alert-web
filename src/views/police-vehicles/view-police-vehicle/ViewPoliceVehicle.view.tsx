import {
  faBuilding,
  faCar,
  faChartLine,
  faLightbulb,
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
import PoliceVehicleCard from 'components/police-vehicles/PoliceVehicleCard';
import Loading from 'components/shared-components/AntD/Loading';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { GetSharedVehicleQuery } from '../graphql/queries/__generated__/get-shared-vehicle.generated';

const { Paragraph, Text, Title } = Typography;
const { Panel } = Collapse;

interface Props {
  data: GetSharedVehicleQuery | undefined;
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

const ViewPoliceVehicle = ({
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
              'Sorry, there was an error loading the vehicle details.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Error',
          })}
        />
      </div>
    );
  }

  const sharedVehicle = data?.sharedVehicle;

  if (!sharedVehicle) {
    return (
      <div className="page-container">
        <Result
          status="404"
          subTitle={intl.formatMessage({
            defaultMessage: 'The vehicle you are looking for does not exist.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Vehicle Not Found',
          })}
        />
      </div>
    );
  }

  const primaryVehicle = sharedVehicle.vehicle[0];

  return (
    <div className="page-container">
      <Row gutter={[16, 16]}>
        {/* Header */}
        <Col span={24}>
          <Card>
            <Row align="middle" gutter={16} justify="space-between">
              <Col flex="auto">
                <Title level={2} style={{ margin: 0 }}>
                  {primaryVehicle?.registration ||
                    intl.formatMessage({
                      defaultMessage: 'Unidentified Vehicle',
                    })}
                </Title>
                <Text type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Shared Intelligence Record',
                  })}
                </Text>
              </Col>
              <Col>
                {sharedVehicle.policePriorityScore !== null && (
                  <Tag
                    color="red"
                    style={{ fontSize: 16, padding: '4px 12px' }}
                  >
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Priority: {score}',
                      },
                      {
                        score: sharedVehicle.policePriorityScore,
                      }
                    )}
                  </Tag>
                )}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Vehicle Card */}
        <Col lg={12} md={24} span={24} xl={8}>
          <PoliceVehicleCard
            openLightbox={openLightbox}
            sharedVehicle={sharedVehicle}
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
            {sharedVehicle.aiGenerationStatus === 'completed' ? (
              <>
                {sharedVehicle.aiSummary && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Summary' })}
                    </Title>
                    <Paragraph>{sharedVehicle.aiSummary}</Paragraph>
                  </div>
                )}

                {sharedVehicle.aiKeyObservations.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Key Observations',
                      })}
                    </Title>
                    <List
                      dataSource={sharedVehicle.aiKeyObservations}
                      renderItem={(item) => (
                        <List.Item>
                          <Text>
                            {intl.formatMessage(
                              {
                                defaultMessage: '• {item}',
                              },
                              {
                                item,
                              }
                            )}
                          </Text>
                        </List.Item>
                      )}
                      size="small"
                    />
                  </div>
                )}

                {sharedVehicle.aiUsagePatterns && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Usage Patterns' })}
                    </Title>
                    <Paragraph>{sharedVehicle.aiUsagePatterns}</Paragraph>
                  </div>
                )}

                {sharedVehicle.aiGeographicPattern && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Geographic Pattern',
                      })}
                    </Title>
                    <Paragraph>{sharedVehicle.aiGeographicPattern}</Paragraph>
                  </div>
                )}
              </>
            ) : (
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'AI analysis is not yet available for this vehicle.',
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
                {sharedVehicle.schemes.length}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Linked Vehicle Records',
                })}
              >
                {sharedVehicle.vehicle.length}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'AI Quality Score',
                })}
              >
                {sharedVehicle.aiQualityScore ||
                  intl.formatMessage({
                    defaultMessage: 'N/A',
                  })}
              </Descriptions.Item>
            </Descriptions>

            {sharedVehicle.schemes.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Title level={5}>
                  {intl.formatMessage({ defaultMessage: 'Sharing Schemes' })}
                </Title>
                <List
                  dataSource={sharedVehicle.schemes}
                  renderItem={(scheme) => (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          scheme.hubForce ||
                          intl.formatMessage({
                            defaultMessage: 'Unknown Force',
                          })
                        }
                        title={
                          <Link to={`/app/schemes/${scheme.id}`}>
                            {scheme.name}
                          </Link>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Card>
        </Col>

        {/* Linked Vehicles */}
        {sharedVehicle.vehicle.length > 0 && (
          <Col span={24}>
            <Card
              title={
                <span>
                  <FontAwesomeIcon icon={faCar} style={{ marginRight: 8 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Linked Vehicle Records',
                  })}
                </span>
              }
            >
              <List
                dataSource={sharedVehicle.vehicle}
                renderItem={(vehicle, index) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <Text type="secondary">
                            {intl.formatMessage(
                              {
                                defaultMessage: 'Reference: {reference}',
                              },
                              {
                                reference:
                                  vehicle.reference ||
                                  intl.formatMessage({
                                    defaultMessage: 'N/A',
                                  }),
                              }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              {
                                defaultMessage: 'Incidents: {count}',
                              },
                              {
                                count: vehicle.totalIncidents || 0,
                              }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              {
                                defaultMessage: 'Offenders: {count}',
                              },
                              {
                                count: vehicle.totalOffenders || 0,
                              }
                            )}
                          </Text>
                        </>
                      }
                      title={
                        <span>
                          {index === 0 && (
                            <Tag color="blue">
                              {intl.formatMessage({
                                defaultMessage: 'Primary',
                              })}
                            </Tag>
                          )}
                          <Link to={`/app/vehicles/view/${vehicle.id}`}>
                            {vehicle.registration ||
                              intl.formatMessage({
                                defaultMessage: 'Unknown',
                              })}
                          </Link>
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}

        {/* AI Snapshots */}
        {sharedVehicle.aiGenerationStatus === 'completed' && (
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
                {sharedVehicle.aiGeographicMovementSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Geographic Movement Analysis',
                    })}
                    key="geographic-movement"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedVehicle.aiGeographicMovementSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedVehicle.aiVehicleUsageAnalysisSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Vehicle Usage Analysis',
                    })}
                    key="vehicle-usage"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedVehicle.aiVehicleUsageAnalysisSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedVehicle.aiAssociatedRiskSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Associated Risk Analysis',
                    })}
                    key="associated-risk"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedVehicle.aiAssociatedRiskSnapshot,
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

export default ViewPoliceVehicle;
