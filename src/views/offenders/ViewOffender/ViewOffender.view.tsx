/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ViewOffenderQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Tabs,
  Descriptions,
  Tag,
  Divider,
  Skeleton,
  Button,
  Table,
  Drawer,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faPlus,
  faUserTag,
  faUserClock,
  faEarth,
  faMarsAndVenus,
  faUserHair,
  faCircleInfo,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  getLastOffence,
  calcAge,
} from 'utils/offender/get-offender-desc';

import { calcExpired } from 'utils/offender/get-offender-exclusion';
import OffenderSideList from 'components/offenders/OffenderSideList';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LinkIncident from 'components/form-components/offender/LinkIncident';

const { Title, Text, Paragraph } = Typography;

interface Props {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  addIncidentRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  updateIncidentList: (value: string[] | undefined) => void;
}

const ViewOffender = ({
  data,
  loading,
  saving,
  openLightbox,
  addIncidentRights,
  offenderId,
  deleteRights,
  editRights,
  onDelete,
  addExistingIncident,
  toggleAddExistingIncident,
  updateIncidentList,
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={6}>
        <OffenderSideList current={offenderId} />
      </Col>
      <Col span={18}>
        <div className="view-offender">
          <Row
            gutter={8}
            justify="start"
            align="middle"
            wrap={false}
            className="offender-images"
          >
            {data?.offender?.images.map((image, i) => (
              <Col key={image.id}>
                <div
                  onClick={() => openLightbox(i)}
                  className="offender-image"
                  style={{ backgroundImage: `url(${image.optimised})` }}
                />
              </Col>
            ))}
          </Row>
          <div className="offender-content">
            <Tabs
              tabBarExtraContent={
                <Row>
                  {editRights && (
                    <Col>
                      <Link to={`/app/offenders/edit/${offenderId}`}>
                        <Button disabled={saving} loading={saving} type="text">
                          Edit Offender
                        </Button>
                      </Link>
                    </Col>
                  )}
                  {deleteRights && (
                    <Col>
                      <Button
                        onClick={() => {
                          onDelete(offenderId);
                        }}
                        disabled={saving}
                        loading={saving}
                        danger
                        type="text"
                      >
                        Delete Offender
                      </Button>
                    </Col>
                  )}
                </Row>
              }
            >
              <Tabs.TabPane key={0} tab="Details">
                <div className="offender-tab-content">
                  <Row>
                    <Col span={13}>
                      <div className="offender-details-main">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <Title level={4}>{data?.offender?.name}</Title>
                            {data?.offender?.groups?.map((group) => (
                              <Text key={group.id} type="danger" ellipsis>
                                {group.name}
                              </Text>
                            ))}
                            <Row className="offender-tags">
                              {data?.offender?.tags.map((tag) => (
                                <Col key={tag.id}>
                                  <Tag color="red">{tag.name}</Tag>
                                </Col>
                              ))}
                            </Row>
                          </>
                        )}
                        <Descriptions
                          column={2}
                          className="offender-descriptions"
                        >
                          <Descriptions.Item
                            span={2}
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faClock}
                                />
                                Last updated
                              </span>
                            }
                          >
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              moment(
                                data?.offender?.updatedAt || moment()
                              ).format(`ddd MMM DD YYYY - HH:mm`)
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faUserClock}
                                />
                                Age
                              </span>
                            }
                          >
                            {data?.offender?.dateOfBirth
                              ? calcAge(data?.offender?.dateOfBirth)
                              : getOffenderAge(data?.offender?.age)}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faUserTag}
                                />
                                Build
                              </span>
                            }
                          >
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              getOffenderBuild(data?.offender?.build)
                            )}
                          </Descriptions.Item>
                          {data?.offender?.hair && (
                            <Descriptions.Item
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className="offender-description-icon"
                                    icon={faUserHair}
                                  />
                                  Hair
                                </span>
                              }
                            >
                              {loading ? (
                                <Skeleton
                                  title={{ width: 100 }}
                                  paragraph={false}
                                />
                              ) : (
                                data?.offender?.hair
                              )}
                            </Descriptions.Item>
                          )}
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faMarsAndVenus}
                                />
                                Sex
                              </span>
                            }
                          >
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              getOffenderGender(data?.offender?.gender)
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faEarth}
                                />
                                Ethnicity
                              </span>
                            }
                          >
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              getOffenderRace(data?.offender?.race, false)
                            )}
                          </Descriptions.Item>

                          {data?.offender?.peculiarities && (
                            <Descriptions.Item
                              span={2}
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className="offender-description-icon"
                                    icon={faCircleInfo}
                                  />
                                  Additional Info
                                </span>
                              }
                            >
                              {loading ? (
                                <Skeleton
                                  title={{ width: 100 }}
                                  paragraph={false}
                                />
                              ) : (
                                data?.offender?.peculiarities
                              )}
                            </Descriptions.Item>
                          )}

                          {data?.offender?.incidents[0]?.location && (
                            <Descriptions.Item
                              span={2}
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className="offender-description-icon"
                                    icon={faLocationDot}
                                  />
                                  Last offence
                                </span>
                              }
                            >
                              {loading ? (
                                <Skeleton
                                  title={{ width: 100 }}
                                  paragraph={false}
                                />
                              ) : (
                                getLastOffence(data?.offender?.incidents)
                                  ?.location
                              )}
                            </Descriptions.Item>
                          )}
                        </Descriptions>
                        <Title level={4}>Exclusions</Title>
                        {data?.offender?.bans &&
                        data.offender.bans.length > 0 ? (
                          <Table
                            size="small"
                            loading={loading}
                            pagination={{
                              defaultPageSize: 20,
                              pageSize: 20,
                            }}
                            columns={[
                              {
                                key: 'duration',
                                title: 'Duration',
                                dataIndex: 'duration',
                                render: (value, record) => (
                                  <>
                                    <Text>{value}</Text>
                                    {calcExpired(new Date(record.endDate)) && (
                                      <Tag
                                        color="red"
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      >
                                        EXPIRED
                                      </Tag>
                                    )}
                                  </>
                                ),
                              },

                              {
                                key: 'location',
                                title: 'Location',
                                dataIndex: 'location',
                                ellipsis: true,
                                render: (value) => (
                                  <span>
                                    {value && (
                                      <FontAwesomeIcon
                                        className="offender-description-icon"
                                        icon={faLocationDot}
                                      />
                                    )}
                                    {value}
                                  </span>
                                ),
                              },
                            ]}
                            dataSource={data?.offender?.bans.map((ban) => ({
                              endDate: ban.endDate,
                              duration: `${new Date(
                                ban?.startDate
                              ).toDateString()}  >  ${new Date(
                                ban?.endDate
                              ).toDateString()}`,
                              location: ban.description,
                            }))}
                          />
                        ) : (
                          <Paragraph>
                            No one has added an exclusion to this offender yet.
                          </Paragraph>
                        )}
                      </div>
                    </Col>
                    <Col span={11}>
                      {data?.offender?.incidents &&
                      data.offender.incidents.length > 0 ? (
                        <div className="offender-incidents">
                          {data?.offender?.incidents.map((incident) => (
                            <Link to={`/app/incidents/view/${incident.id}`}>
                              <div className="offender-incident">
                                <Row wrap={false}>
                                  <Col>
                                    {incident.images.length > 0 ? (
                                      <div
                                        className="incident-image"
                                        style={{
                                          backgroundImage: `url(${incident.images[0].optimised})`,
                                        }}
                                      />
                                    ) : (
                                      <Skeleton.Image className="incident-image-skeleton" />
                                    )}
                                  </Col>
                                  <Col
                                    flex={1}
                                    className="offender-incident-content"
                                  >
                                    <Title
                                      level={4}
                                      className="offender-incident-name"
                                    >
                                      {incident.subject}
                                    </Title>
                                    <Descriptions size="small" column={1}>
                                      <Descriptions.Item
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className="offender-description-icon"
                                              icon={faClock}
                                            />
                                            Created At
                                          </span>
                                        }
                                      >
                                        {incident.dayTime}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className="offender-description-icon"
                                              icon={faUser}
                                            />
                                            Created By
                                          </span>
                                        }
                                      >
                                        {loading ? (
                                          <Skeleton
                                            title={{ width: 100 }}
                                            paragraph={false}
                                          />
                                        ) : (
                                          `${incident?.createdBy.fullName} -
                              ${incident?.createdBy.organisation}`
                                        )}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className="offender-description-icon"
                                              icon={faLocationDot}
                                            />
                                            Location
                                          </span>
                                        }
                                      >
                                        {incident?.location?.full}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </Col>
                                </Row>
                                <Divider />
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="offender-incidents-empty">
                          <Paragraph>
                            This offender does not appear in any incidents.
                          </Paragraph>
                          {addIncidentRights && (
                            <div>
                              <Button
                                onClick={toggleAddExistingIncident}
                                disabled={saving}
                                loading={saving}
                                style={{ color: 'red' }}
                                icon={
                                  <FontAwesomeIcon
                                    className="button-icon"
                                    icon={faPlus}
                                  />
                                }
                              >
                                Link Incident
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </Col>
    </Row>

    <Drawer
      title="Link Incidents"
      visible={addExistingIncident}
      width="600"
      onClose={toggleAddExistingIncident}
    >
      {addExistingIncident ? (
        <LinkIncident
          update={updateIncidentList}
          onClose={toggleAddExistingIncident}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);

export default ViewOffender;
