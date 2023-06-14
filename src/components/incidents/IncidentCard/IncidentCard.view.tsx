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
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ListIncidentsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEdit,
  faEllipsisV,
  faLocationDot,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import type { CarouselRef } from 'antd/lib/carousel';
import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import SkeletonImage from 'components/images/SkeletonImage.view';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    undefined | null
  >['incidents'][0];
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

const IncidentCard = ({
  incident,
  approvalRights,
  deleteRights,
  menuRights,
  openLightbox,
  onNavigate,
  onDelete,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);

  return (
    <Card
      className="incident-card"
      key={incident.id || ''}
      bodyStyle={{ overflow: 'hidden', borderRadius: 10 }}
    >
      {!incident?.approved && (
        <div className="incident-card-overlay">
          <Title level={4} className="incident-card-approval-title">
            This incident is awaiting approval
          </Title>
          {approvalRights && (
            <Link to={`review/${incident?.id}`}>
              <Button>Review Incident</Button>
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
                  label: 'Edit Incident',
                  onClick: () => onNavigate(incident?.id || ''),
                  icon: <FontAwesomeIcon icon={faEdit} />,
                },
                {
                  key: 1,
                  label: 'Delete Incident',
                  onClick: () =>
                    confirm({
                      title: 'Are you sure?',
                      content:
                        'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                      okText: 'Delete',
                      onOk: () => onDelete(incident?.id || ''),
                    }),
                  icon: <FontAwesomeIcon icon={faTrash} />,
                },
              ].filter((item) => item.key !== 1 || deleteRights)}
            />
          }
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="incident-card-menu">
            <FontAwesomeIcon
              // size="5x"
              style={{ height: '100%' }}
              icon={faEllipsisV}
            />
          </Button>
        </Dropdown>
      )}

      <div className="incident-card-tags">
        <Row gutter={8}>
          {incident?.crimeTypes.slice(0, 2).map((crimeType) => (
            <Col key={crimeType.id}>
              <Tag className="incident-card-tag" color="red">
                {crimeType.name}
              </Tag>
            </Col>
          ))}
          {incident.crimeTypes.length > 2 && (
            <Tooltip
              title={incident.crimeTypes
                .map((item) => ` ${item.name}`)
                .toString()}
            >
              <Tag className="incident-card-tag" color="red">
                + {incident.crimeTypes.length - 1} more
              </Tag>
            </Tooltip>
          )}
        </Row>
      </div>
      <div>
        {incident && incident.images.length > 0 ? (
          <Carousel ref={imagesRef}>
            {incident?.images.map((image) => (
              <div key={image.id}>
                <div className="incident-card-image">
                  <WatermarkImage
                    url={image.optimised}
                    position={image.position}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <SkeletonImage height={280} />
        )}
      </div>
      {incident && incident.images.length > 1 && (
        <Row className="incident-card-controls">
          <Col>
            <FontAwesomeIcon
              className="incident-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              className="incident-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      )}
      {incident && incident.images.length > 0 && (
        <FontAwesomeIcon
          className="incident-card-expand"
          icon={faArrowsMaximize}
          onClick={() =>
            openLightbox(
              incident?.images.map((image) => ({
                src: image.optimised || '',
              })) || [],
              0
            )
          }
        />
      )}
      <div style={{ padding: '10px 10px 5px', height: 283, overflow: 'auto' }}>
        <Title level={4} ellipsis style={{ marginBottom: 2 }}>
          {incident?.subject}
        </Title>
        <div style={{ marginBottom: 10 }}>
          <Text type="secondary">
            Alert ID: {incident?.reference}
            {incident?.policeRef ? `/ Crime Ref: ${incident.policeRef}` : ''}
          </Text>
        </div>
        {incident.offenders.length > 0 ? (
          <Row wrap={false} style={{ overflowX: 'auto', marginBottom: 10 }}>
            {incident.offenders.slice(0, 2).map((offender) => (
              <Link to={`/app/offenders/view/${offender?.id}`}>
                <Tag key={offender.id}>
                  {offender.name || 'Unknown Offender'}
                </Tag>
              </Link>
            ))}
            {incident.offenders.length > 2 && (
              <Tooltip
                title={incident.offenders
                  .map((item) => ` ${item.name}`)
                  .toString()}
              >
                <Tag>+ {incident.offenders.length - 1} more</Tag>
              </Tooltip>
            )}
          </Row>
        ) : (
          <div style={{ marginBottom: 10 }} />
        )}
        <Link to={`/app/incidents/view/${incident?.id}`}>
          <Row
            wrap={false}
            gutter={8}
            style={{ marginBottom: 5, maxWidth: '100%' }}
          >
            <Col span={12}>
              <Row wrap={false}>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="incident-card-icon"
                    icon={faClock}
                  />
                </Col>
                <Col>
                  <Text type="secondary">{incident?.dayTime}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row wrap={false}>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="incident-card-icon"
                    icon={faLocationDot}
                  />
                </Col>
                <Col>
                  <Text style={{ flex: 1 }} ellipsis type="secondary">
                    {incident?.business?.name || incident?.location?.full}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Paragraph
            // style={{ height: incident.offenders.length > 0 ? 24 : 66 }}
            // className="incident-card-desc"
            style={{
              height: incident.offenders.length > 0 ? 60 : 95,
              marginBottom: 10,
            }}
            type="secondary"
            ellipsis={{ rows: 2 }}
          >
            {incident?.description}
          </Paragraph>
          <Row
            wrap={false}
            align="middle"
            style={{
              overflowX: 'auto',
              // marginBottom: incident.offenders.length > 2 ? 3 : 15,
            }}
          >
            <Col style={{ minWidth: 60 }}>
              <Text strong type="secondary">
                Groups:
              </Text>
            </Col>
            {incident.groups.slice(0, 1).map((group) => (
              <Col key={group.id}>
                <Tag>{group.name}</Tag>
              </Col>
            ))}
            {incident.groups.length > 1 && (
              <Col>
                <Tooltip
                  title={incident.groups
                    .map((item) => ` ${item.name}`)
                    .toString()}
                >
                  <Tag>+{incident.groups.length - 1} more</Tag>
                </Tooltip>
              </Col>
            )}
          </Row>
          <Row justify="center" style={{ marginTop: 10 }}>
            <Col>
              <Link to={`/app/incidents/view/${incident?.id}`}>
                <Button size="small" type="text">
                  View Full Incident
                </Button>
              </Link>
            </Col>
          </Row>
        </Link>
      </div>
    </Card>
  );
};

export default IncidentCard;
