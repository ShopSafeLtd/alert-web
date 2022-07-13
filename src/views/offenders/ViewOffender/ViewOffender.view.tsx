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
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faUser,
  faPlus,
  faImagePortrait,
  faImageUser,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/get-offender-desc';
import { SRLWrapper } from 'simple-react-lightbox';
import OffenderSideList from 'components/offenders/OffenderSideList';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Title, Text } = Typography;

interface Props {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
}

const ViewOffender = ({
  data,
  loading,
  openLightbox,
  addOffenderRights,
  offenderId,
  deleteRights,
  editRights,
  onDelete,
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
                        <Button type="text">Edit Offender</Button>
                      </Link>
                    </Col>
                  )}
                  {deleteRights && (
                    <Col>
                      <Button onClick={onDelete} danger type="text">
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
                            <Text>{data?.offender?.groups[0].name}</Text>
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
                          column={1}
                          className="offender-descriptions"
                        >
                          <Descriptions.Item
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
                                  icon={faImagePortrait}
                                />
                                Age
                              </span>
                            }
                          >
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              getOffenderAge(data?.offender?.age)
                            )}
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
                          <Descriptions.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  className="offender-description-icon"
                                  icon={faImageUser}
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
                                  icon={faUser}
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
                          {data?.offender?.incidents[0]?.location && (
                            <Descriptions.Item
                              label={
                                <span>
                                  <FontAwesomeIcon
                                    className="offender-description-icon"
                                    icon={faLocationDot}
                                  />
                                  Location:
                                </span>
                              }
                            >
                              {loading ? (
                                <Skeleton
                                  title={{ width: 100 }}
                                  paragraph={false}
                                />
                              ) : (
                                data?.offender?.incidents[0]?.location?.full
                              )}
                            </Descriptions.Item>
                          )}
                        </Descriptions>
                      </div>
                    </Col>
                    <Col span={11}>
                      {data?.offender &&
                      data?.offender?.incidents.length > 0 ? (
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
                                    <Text
                                      className="offender-incident-name"
                                      strong
                                    >
                                      {incident.subject}
                                    </Text>
                                    <Descriptions size="small" column={1}>
                                      <Descriptions.Item
                                        label={
                                          <span>
                                            <FontAwesomeIcon
                                              className="incident-description-icon"
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
                                              className="incident-description-icon"
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
                                              className="incident-description-icon"
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
                          <Typography.Paragraph>
                            There are no offenders on this Offender.
                          </Typography.Paragraph>
                          {addOffenderRights && (
                            <div>
                              <Button
                                icon={
                                  <FontAwesomeIcon
                                    className="button-icon"
                                    icon={faPlus}
                                  />
                                }
                              >
                                Link Offender
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

    <SRLWrapper
      elements={
        data?.offender?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      }
      options={{ buttons: { showDownloadButton: false } }}
    />
  </div>
);

export default ViewOffender;
