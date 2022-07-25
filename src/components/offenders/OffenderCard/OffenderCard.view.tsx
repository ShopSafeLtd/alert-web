import React, { useRef } from 'react';
import {
  Card,
  Carousel,
  Tag,
  Row,
  Col,
  Typography,
  Tabs,
  Badge,
  Button,
  Menu,
  Dropdown,
  Descriptions,
  Modal,
  Skeleton,
  Empty,
} from 'antd';
import { ListOffendersQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faEllipsisV,
  faTrash,
  faEdit,
  faUserTag,
  faClock,
  faUserClock,
  faMarsAndVenus,
  faEarth,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  getLastOffence,
  calcAge,
} from 'utils/offender/get-offender-desc';

import { CarouselRef } from 'antd/lib/carousel';

import { Link } from 'react-router-dom';
import moment from 'moment';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Props {
  offender: Exclude<
    ListOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

const OffenderCard = ({
  offender,
  approvalRights,
  deleteRights,
  menuRights,
  openLightbox,
  onNavigate,
  onDelete,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);

  return (
    <Card className="offender-card">
      {!offender?.approved && (
        <div className="offender-card-overlay">
          <Title level={4} className="offender-card-approval-title">
            This offender is awaiting approval
          </Title>
          {approvalRights && <Button>Review Offender</Button>}
        </div>
      )}
      {menuRights && (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              items={[
                {
                  key: 0,
                  label: 'Edit Offender',
                  onClick: () => onNavigate(offender?.id || ''),
                  icon: <FontAwesomeIcon size="lg" icon={faEdit} />,
                },
                {
                  key: 1,
                  label: 'Delete Offender',
                  onClick: () =>
                    confirm({
                      title: 'Are you sure?',
                      content:
                        'Click delete offender if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                      okText: 'Delete Offender',
                      onOk: () => onDelete(offender?.id || ''),
                    }),
                  icon: <FontAwesomeIcon size="lg" icon={faTrash} />,
                },
              ].filter((item) => item.key !== 1 || deleteRights)}
            />
          }
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="offender-card-menu">
            <FontAwesomeIcon size="lg" icon={faEllipsisV} />
          </Button>
        </Dropdown>
      )}
      <div className="offender-card-tags">
        <Row gutter={8}>
          {offender?.tags.map((tag, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={i}>
              <Tag className="offender-card-tag" color="red">
                {tag.name}
              </Tag>
            </Col>
          ))}
        </Row>
      </div>
      {offender && offender.images.length > 0 ? (
        <Carousel ref={imagesRef}>
          {offender?.images.map((image) => (
            <div key={image.id}>
              <div
                className="offender-card-image"
                style={{
                  backgroundImage: `url(${image.optimised})`,
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Skeleton.Image />
      )}
      {offender && offender.images.length > 1 && (
        <Row className="offender-card-controls">
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      )}
      {offender && offender.images.length > 0 && (
        <FontAwesomeIcon
          size="lg"
          className="offender-card-expand"
          icon={faArrowsMaximize}
          onClick={() =>
            openLightbox(
              offender?.images.map((image) => ({
                src: image.optimised || '',
              })) || [],
              0
            )
          }
        />
      )}
      <Tabs size="middle" defaultActiveKey="DETAILS">
        <Tabs.TabPane key="DETAILS" tab={<Badge>DETAILS</Badge>}>
          <div className="offender-card-content">
            <div className="offender-card-desc">
              <Title level={4} ellipsis>
                {offender?.name}
              </Title>
              <Row style={{ marginTop: -5, marginBottom: 10 }}>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="offender-card-icon"
                    icon={faClock}
                  />
                  <Text type="secondary">
                    Last updated:{' '}
                    {moment(offender?.updatedAt || moment()).format(
                      `ddd MMM DD YYYY - HH:mm`
                    )}
                  </Text>
                </Col>
              </Row>
              <Row gutter={8}>
                {offender?.groups?.map((group) => (
                  <Col key={group.id}>
                    <Text type="danger" ellipsis>
                      {group.name}
                    </Text>
                  </Col>
                ))}
              </Row>
            </div>

            <Row>
              <Col flex={1}>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faUserClock}
                />
                <Text type="secondary">
                  Age:{' '}
                  {offender.dateOfBirth
                    ? calcAge(offender.dateOfBirth)
                    : getOffenderAge(offender.age)}
                </Text>
              </Col>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faUserTag}
                />
                <Text type="secondary">
                  Build:{getOffenderBuild(offender.build)}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faMarsAndVenus}
                />
                <Text type="secondary">
                  Sex: {getOffenderGender(offender.gender)}
                </Text>
              </Col>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faEarth}
                />
                <Text type="secondary">
                  Ethnicity: {getOffenderRace(offender.race, false)}
                </Text>
              </Col>
            </Row>

            <Row gutter={8} className="offender-card-location-row">
              <Col span={1}>
                <FontAwesomeIcon
                  size="sm"
                  className="offender-card-icon"
                  icon={faLocationDot}
                />
              </Col>

              <Col span={23}>
                <Text style={{ width: '100%' }} ellipsis type="secondary">
                  Last offence: {getLastOffence(offender.incidents)?.location}
                </Text>
              </Col>
            </Row>

            <Row justify="center">
              <Col>
                <Link to={`view/${offender?.id}`}>
                  <Button size="small" type="text">
                    View Full Offender
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="INCIDENTS"
          tab={
            <Badge
              count={offender?.incidents.length}
              offset={[10, 6.2]}
              size="small"
            >
              INCIDENTS
            </Badge>
          }
        >
          {offender?.incidents && offender?.incidents.length > 0 ? (
            <div className="offender-card-content">
              {offender?.incidents.map((incident) => (
                <Row key={incident.id} className="offender-card-incident">
                  <Col span={6}>
                    {incident.images.length > 0 ? (
                      <div
                        className="offender-card-incident-image"
                        style={{
                          backgroundImage: `url(${incident.images[0].optimised})`,
                        }}
                      />
                    ) : (
                      <div className="offender-card-incident-placeholder" />
                    )}
                  </Col>
                  <Col span={18}>
                    <div className="offender-card-incident-content">
                      <Title level={4}>{incident.subject}</Title>
                      <Row>
                        <Col>
                          <Descriptions column={1} size="small">
                            <Descriptions.Item>
                              <FontAwesomeIcon
                                size="sm"
                                className="offender-card-icon"
                                icon={faClock}
                              />
                              {incident.dayTime}
                            </Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                      {/* <Row>
                      <Col>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item>
                            <FontAwesomeIcon
                              size="sm"
                              className="offender-card-icon"
                              icon={faUser}
                            />
                            {incident?.createdBy.fullName} -{' '}
                            {incident?.createdBy.organisation}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row> */}
                      <Row>
                        <Col>
                          <Descriptions column={1} size="small">
                            <Descriptions.Item>
                              <FontAwesomeIcon
                                size="sm"
                                className="offender-card-icon"
                                icon={faLocationDot}
                              />
                              {incident?.location?.full}
                            </Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          ) : (
            <div className="offender-card-content">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="There are no incidents on this offender."
                style={{ marginTop: 60 }}
              />
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default OffenderCard;
