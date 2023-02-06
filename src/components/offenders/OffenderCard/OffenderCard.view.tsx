import React, { useRef } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Dropdown,
  Menu,
  Modal,
  Row,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import { ListOffendersQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEarth,
  faEdit,
  faEllipsisV,
  faLocationDot,
  faMarsAndVenus,
  faPeople,
  faTrash,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import {
  calcAge,
  getLastOffence,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
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
    <Card className="offender-card" key={offender.id || ''}>
      {!offender?.approved && (
        <div className="offender-card-overlay">
          <Title level={4} className="offender-card-approval-title">
            This offender is awaiting approval
          </Title>
          {approvalRights && (
            <Link to={`review/${offender?.id}`}>
              <Button>Review Offender</Button>
            </Link>
          )}
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
                  label: 'Compare Offender',
                  onClick: () =>
                    onNavigate(`/app/offenders/compare/${offender?.id}`),
                  icon: <FontAwesomeIcon size="lg" icon={faPeople} />,
                },
                {
                  key: 2,
                  label: 'Delete Offender',
                  onClick: () =>
                    confirm({
                      title: 'Are you sure?',
                      content:
                        'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                      okText: 'Delete',
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
      <div className="offender-card-content">
        <Link to={`view/${offender?.id}`}>
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
          </Row>
          <Row>
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
        </Link>
        <Link
          to={`/app/incidents/view/${getLastOffence(offender.incidents).id}`}
        >
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
                Last offence: {getLastOffence(offender.incidents).message}
              </Text>
            </Col>
          </Row>
        </Link>
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
    </Card>
  );
};

export default OffenderCard;
