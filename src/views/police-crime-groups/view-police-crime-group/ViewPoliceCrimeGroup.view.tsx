import { currencySymbolAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faBuilding,
  faCar,
  faChartLine,
  faLightbulb,
  faShirt,
  faUserShield,
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
import PoliceCrimeGroupCard from 'components/police-crime-groups/PoliceCrimeGroupCard';
import Loading from 'components/shared-components/AntD/Loading';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { GetSharedCrimeGroupQuery } from '../graphql/queries/__generated__/get-shared-crime-group.generated';

const { Paragraph, Text, Title } = Typography;
const { Panel } = Collapse;

interface Props {
  data: GetSharedCrimeGroupQuery | undefined;
  error: Error | undefined;
  loading: boolean;
}

const ViewPoliceCrimeGroup = ({ data, error, loading }: Props): JSX.Element => {
  const intl = useIntl();
  const { prefix: currency } = useAtomValue(currencySymbolAtom);

  const getSophisticationBadge = (level?: 'HIGH' | 'LOW' | 'MEDIUM' | null) => {
    if (!level) return null;

    const configs = {
      HIGH: { color: 'red', emoji: '⚠️', label: 'Highly Organized' },
      LOW: { color: 'gold', emoji: '👤', label: 'Loosely Organized' },
      MEDIUM: { color: 'orange', emoji: '👥', label: 'Organized' },
    };

    const config = configs[level];

    return (
      <Tag color={config.color}>
        {config.emoji} {config.label}
      </Tag>
    );
  };

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
              'Sorry, there was an error loading the crime group details.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Error',
          })}
        />
      </div>
    );
  }

  const sharedCrimeGroup = data?.sharedCrimeGroup;

  if (!sharedCrimeGroup) {
    return (
      <div className="page-container">
        <Result
          status="404"
          subTitle={intl.formatMessage({
            defaultMessage:
              'The crime group you are looking for does not exist.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Crime Group Not Found',
          })}
        />
      </div>
    );
  }

  // CRITICAL: Direct access - crimeGroup is single object, not array
  const crimeGroup = sharedCrimeGroup.crimeGroup;
  const displayName = crimeGroup?.alias || crimeGroup?.ref || 'Unknown Group';

  const recoveryRate =
    crimeGroup?.totalValue && crimeGroup?.totalRecoveredValue
      ? (
          (crimeGroup.totalRecoveredValue / crimeGroup.totalValue) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="page-container">
      <Row gutter={[16, 16]}>
        {/* Header */}
        <Col span={24}>
          <Card>
            <Row align="middle" gutter={16} justify="space-between">
              <Col flex="auto">
                <Title level={2} style={{ margin: 0 }}>
                  {displayName}
                </Title>
                <Text type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Shared Crime Group Intelligence',
                  })}
                </Text>
              </Col>
              <Col>
                {sharedCrimeGroup.policePriorityScore !== null && (
                  <Tag
                    color="red"
                    style={{ fontSize: 16, padding: '4px 12px' }}
                  >
                    {intl.formatMessage(
                      { defaultMessage: 'Priority: {score}' },
                      { score: sharedCrimeGroup.policePriorityScore }
                    )}
                  </Tag>
                )}
                {sharedCrimeGroup.aiSophisticationLevel &&
                  getSophisticationBadge(
                    sharedCrimeGroup.aiSophisticationLevel as
                      | 'HIGH'
                      | 'LOW'
                      | 'MEDIUM'
                  )}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Crime Group Card */}
        <Col lg={12} md={24} span={24} xl={8}>
          <PoliceCrimeGroupCard sharedCrimeGroup={sharedCrimeGroup} />
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
            {sharedCrimeGroup.aiSummary ||
            sharedCrimeGroup.aiActivityPatterns ||
            sharedCrimeGroup.aiOrganizationStructure ? (
              <>
                {sharedCrimeGroup.aiSummary && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({ defaultMessage: 'Summary' })}
                    </Title>
                    <Paragraph>{sharedCrimeGroup.aiSummary}</Paragraph>
                  </div>
                )}

                {sharedCrimeGroup.aiKeyObservations.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Key Observations',
                      })}
                    </Title>
                    <List
                      dataSource={sharedCrimeGroup.aiKeyObservations}
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

                {sharedCrimeGroup.aiActivityPatterns && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Activity Patterns',
                      })}
                    </Title>
                    <Paragraph>{sharedCrimeGroup.aiActivityPatterns}</Paragraph>
                  </div>
                )}

                {sharedCrimeGroup.aiOrganizationStructure && (
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Organization Structure',
                      })}
                    </Title>
                    <Paragraph>
                      {sharedCrimeGroup.aiOrganizationStructure}
                    </Paragraph>
                  </div>
                )}
              </>
            ) : (
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'AI analysis is not yet available for this crime group.',
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
                {sharedCrimeGroup.schemes.length}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Total Offenders',
                })}
              >
                {crimeGroup?.totalOffenders || 0}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Total Incidents',
                })}
              >
                {crimeGroup?.totalIncidents || 0}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Total Value',
                })}
              >
                {currency}
                {crimeGroup?.totalValue || 0}
              </Descriptions.Item>
              {recoveryRate && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Recovery Rate',
                  })}
                >
                  {intl.formatMessage(
                    { defaultMessage: '{rate}%' },
                    { rate: recoveryRate }
                  )}
                </Descriptions.Item>
              )}
              {crimeGroup?.totalTheftSuccess !== null && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Success Rate',
                  })}
                >
                  {intl.formatMessage(
                    { defaultMessage: '{rate}%' },
                    { rate: crimeGroup.totalTheftSuccess }
                  )}
                </Descriptions.Item>
              )}
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'AI Quality Score',
                })}
              >
                {sharedCrimeGroup.aiQualityScore ||
                  intl.formatMessage({ defaultMessage: 'N/A' })}
              </Descriptions.Item>
            </Descriptions>

            {sharedCrimeGroup.schemes.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Title level={5}>
                  {intl.formatMessage({ defaultMessage: 'Sharing Schemes' })}
                </Title>
                <List
                  dataSource={sharedCrimeGroup.schemes}
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

        {/* Linked Offenders */}
        {crimeGroup?.offenders && crimeGroup.offenders.length > 0 && (
          <Col span={24}>
            <Card
              title={
                <span>
                  <FontAwesomeIcon
                    icon={faUserShield}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Linked Offenders',
                  })}
                </span>
              }
            >
              <List
                dataSource={crimeGroup.offenders}
                renderItem={(offender) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: 'Reference: {ref}' },
                              {
                                ref:
                                  offender.reference ||
                                  intl.formatMessage({ defaultMessage: 'N/A' }),
                              }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: 'Incidents: {count}' },
                              { count: offender.totalIncidents || 0 }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              {
                                defaultMessage:
                                  'Total Value: {currency}{value}',
                              },
                              { currency, value: offender.totalValue || 0 }
                            )}
                          </Text>
                        </>
                      }
                      title={
                        <Link to={`/app/offenders/view/${offender.id}`}>
                          {offender.name ||
                            intl.formatMessage({ defaultMessage: 'Unknown' })}
                        </Link>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}

        {/* Linked Vehicles */}
        {crimeGroup?.vehicles && crimeGroup.vehicles.length > 0 && (
          <Col span={24}>
            <Card
              title={
                <span>
                  <FontAwesomeIcon icon={faCar} style={{ marginRight: 8 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Linked Vehicles',
                  })}
                </span>
              }
            >
              <List
                dataSource={crimeGroup.vehicles}
                renderItem={(vehicle) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          {vehicle.make} {vehicle.model}{' '}
                          {vehicle.colour &&
                            intl.formatMessage(
                              { defaultMessage: '- {colour}' },
                              { colour: vehicle.colour }
                            )}
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: 'Reference: {ref}' },
                              {
                                ref:
                                  vehicle.reference ||
                                  intl.formatMessage({ defaultMessage: 'N/A' }),
                              }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: 'Incidents: {count}' },
                              { count: vehicle.totalIncidents || 0 }
                            )}
                          </Text>
                        </>
                      }
                      title={
                        <Link to={`/app/vehicles/view/${vehicle.id}`}>
                          {vehicle.registration ||
                            intl.formatMessage({ defaultMessage: 'Unknown' })}
                        </Link>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}

        {/* Related Incidents */}
        {crimeGroup?.incidents && crimeGroup.incidents.length > 0 && (
          <Col span={24}>
            <Card
              title={
                <span>
                  <FontAwesomeIcon icon={faShirt} style={{ marginRight: 8 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Related Incidents',
                  })}
                </span>
              }
            >
              <List
                dataSource={crimeGroup.incidents.slice(0, 10)}
                renderItem={(incident) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: '{days} days ago' },
                              { days: incident.dateAgo }
                            )}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {incident.reportedBusinessName ||
                              intl.formatMessage({
                                defaultMessage: 'Unknown Location',
                              })}
                          </Text>
                          <br />
                          <Text type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: 'Value: {currency}{value}' },
                              { currency, value: incident.totalValue || 0 }
                            )}
                          </Text>
                        </>
                      }
                      title={
                        <Link to={`/app/incidents/view/${incident.id}`}>
                          {intl.formatMessage(
                            { defaultMessage: 'Incident #{ref}' },
                            { ref: incident.reference || incident.id }
                          )}
                        </Link>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}

        {/* AI Snapshots */}
        {(sharedCrimeGroup.aiActivityTrendsSnapshot ||
          sharedCrimeGroup.aiGroupSophisticationSnapshot ||
          sharedCrimeGroup.aiMemberRiskAggregationSnapshot) && (
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
                {sharedCrimeGroup.aiActivityTrendsSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Activity Trends Analysis',
                    })}
                    key="activity-trends"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedCrimeGroup.aiActivityTrendsSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedCrimeGroup.aiGroupSophisticationSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Group Sophistication Analysis',
                    })}
                    key="group-sophistication"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedCrimeGroup.aiGroupSophisticationSnapshot,
                        null,
                        2
                      )}
                    </pre>
                  </Panel>
                )}

                {sharedCrimeGroup.aiMemberRiskAggregationSnapshot && (
                  <Panel
                    header={intl.formatMessage({
                      defaultMessage: 'Member Risk Aggregation',
                    })}
                    key="member-risk"
                  >
                    <pre style={{ overflow: 'auto' }}>
                      {JSON.stringify(
                        sharedCrimeGroup.aiMemberRiskAggregationSnapshot,
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
    </div>
  );
};

export default ViewPoliceCrimeGroup;
