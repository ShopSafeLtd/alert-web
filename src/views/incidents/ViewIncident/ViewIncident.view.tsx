/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ViewIncidentQuery, Age, Gender, Race, Build } from 'graphql/generated';
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
  Drawer,
  // Drawer,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faUser,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { SRLWrapper } from 'simple-react-lightbox';
import IncidentSideList from 'components/incidents/IncidentSideList';
import { Link } from 'react-router-dom';
import AddExistingOffender from 'components/form-components/incident/offender/AddExisitingOffender';

const { Title, Text, Paragraph } = Typography;
interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}
interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: OffenderData[] | undefined) => void;
}

const ViewIncident = ({
  data,
  loading,
  openLightbox,
  addOffenderRights,
  incidentId,
  deleteRights,
  editRights,
  onDelete,
  addExistingOffender,
  toggleAddExistingOffender,
  updateOffenderList,
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={6}>
        <IncidentSideList current={incidentId} />
      </Col>
      <Col span={18}>
        <div className="view-incident">
          <Row
            gutter={8}
            justify="start"
            align="middle"
            className="incident-images"
          >
            {data?.incident?.images.map((image, i) => (
              <Col key={image.id}>
                <div
                  onClick={() => openLightbox(i)}
                  className="incident-image"
                  style={{ backgroundImage: `url(${image.optimised})` }}
                />
              </Col>
            ))}
          </Row>
          <div className="incident-content">
            <Tabs
              tabBarExtraContent={
                <Row>
                  {editRights && (
                    <Col>
                      <Link to={`/app/incidents/edit/${incidentId}`}>
                        <Button type="text">Edit Incident</Button>
                      </Link>
                    </Col>
                  )}
                  {deleteRights && (
                    <Col>
                      <Button onClick={onDelete} danger type="text">
                        Delete Incident
                      </Button>
                    </Col>
                  )}
                </Row>
              }
            >
              <Tabs.TabPane key={0} tab="Details">
                <div className="incident-tab-content">
                  <Row>
                    <Col span={13}>
                      <div className="incident-details-main">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <Title level={4}>{data?.incident?.subject}</Title>
                            <Text>{data?.incident?.description}</Text>
                            <Row className="incident-tags">
                              {data?.incident?.crimeTypes.map((crimeType) => (
                                <Col key={crimeType.id}>
                                  <Tag color="red">{crimeType.name}</Tag>
                                </Col>
                              ))}
                            </Row>
                          </>
                        )}
                        <Descriptions
                          column={1}
                          className="incident-descriptions"
                        >
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
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              data?.incident?.dayTime
                            )}
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
                              `${data?.incident?.createdBy.fullName} -
                              ${data?.incident?.createdBy.organisation}`
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
                            {loading ? (
                              <Skeleton
                                title={{ width: 100 }}
                                paragraph={false}
                              />
                            ) : (
                              data?.incident?.location?.full
                            )}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </Col>
                    <Col span={11}>
                      {data?.incident &&
                      data?.incident?.offenders.length > 0 ? (
                        <div className="incident-offenders">
                          {data?.incident?.offenders.map((offender) => (
                            <Link to={`/app/offenders/view/${offender.id}`}>
                              <div className="incident-offender">
                                <Row wrap={false}>
                                  <Col>
                                    {offender.images.length > 0 ? (
                                      <div
                                        className="offender-image"
                                        style={{
                                          backgroundImage: `url(${offender.images[0].optimised})`,
                                        }}
                                      />
                                    ) : (
                                      <Skeleton.Image className="offender-image-skeleton" />
                                    )}
                                  </Col>
                                  <Col
                                    flex={1}
                                    className="incident-offender-content"
                                  >
                                    <Text
                                      className="incident-offender-name"
                                      strong
                                    >
                                      {offender.name}
                                    </Text>
                                    <Descriptions size="small" column={1}>
                                      <Descriptions.Item label="Gender">
                                        {getOffenderGender(offender.gender)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Ethnicity">
                                        {getOffenderRace(offender.race)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Age">
                                        {getOffenderAge(offender.age)}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Build">
                                        {getOffenderBuild(offender.build)}
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
                        <div className="incident-offenders-empty">
                          <Paragraph>
                            There are no offenders on this incident.
                          </Paragraph>
                          {addOffenderRights && (
                            <div>
                              <Button
                                onClick={toggleAddExistingOffender}
                                style={{ color: 'red' }}
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
        data?.incident?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      }
      options={{ buttons: { showDownloadButton: false } }}
    />
    <Drawer
      title="Link Offenders"
      visible={addExistingOffender}
      width="600"
      onClose={toggleAddExistingOffender}
    >
      {addExistingOffender ? (
        <AddExistingOffender
          update={updateOffenderList}
          onClose={toggleAddExistingOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);

export default ViewIncident;
