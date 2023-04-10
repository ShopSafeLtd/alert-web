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
import type { ListIncidentsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEdit,
  faEllipsisV,
  faLocationDot,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import type { CarouselRef } from 'antd/lib/carousel';
import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';

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
    <Card className="incident-card" key={incident.id || ''}>
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
          {incident?.crimeTypes.map((crimeType, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={i}>
              <Tag className="incident-card-tag" color="red">
                {crimeType.name}
              </Tag>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        {incident && incident.images.length > 0 ? (
          <Carousel ref={imagesRef}>
            {incident?.images.map((image) => (
              <div key={image.id}>
                <div className="incident-card-image">
                  <WatermarkImage url={image.optimised} />
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <Skeleton.Image style={{ height: 280 }} />
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
      <div className="incident-card-content">
        <Title level={4} ellipsis style={{ marginBottom: 2 }}>
          {incident?.subject}
        </Title>
        <Text type="secondary">
          Alert ID: {incident?.reference}
          {incident?.policeRef ? `/ Crime Ref: ${incident.policeRef}` : ''}
        </Text>
        <Link to={`/app/incidents/view/${incident?.id}`}>
          <Paragraph
            style={{ height: incident.offenders.length > 0 ? 24 : 66 }}
            className="incident-card-desc"
            type="secondary"
          >
            {incident?.description}
          </Paragraph>
        </Link>

        {incident.offenders.length > 0 && (
          <Row wrap={false} style={{ overflowX: 'auto', marginBottom: 15 }}>
            {incident.offenders.map((offender) => (
              <Link
                to={offender.id ? `/app/offenders/view/${offender.id}` : ``}
              >
                <Tag key={offender.id}>
                  {offender.name || 'Unknown Offender'}
                </Tag>
              </Link>
            ))}
          </Row>
        )}
        <Link to={`/app/incidents/view/${incident?.id}`}>
          <Row>
            <Col flex={1}>
              <FontAwesomeIcon
                size="sm"
                className="incident-card-icon"
                icon={faClock}
              />
              <Text type="secondary">{incident?.dayTime}</Text>
            </Col>
            <Col>
              <FontAwesomeIcon
                size="sm"
                className="incident-card-icon"
                icon={faUser}
              />
              <Text type="secondary">
                {incident?.createdBy.fullName} -{' '}
                {incident?.createdBy.businesses[0]?.name}
              </Text>
            </Col>
          </Row>
          <Row gutter={8} className="incident-card-location-row">
            <Col span={1}>
              <FontAwesomeIcon
                size="sm"
                className="incident-card-icon"
                icon={faLocationDot}
              />
            </Col>
            <Col span={23}>
              <Text style={{ width: '100%' }} ellipsis type="secondary">
                {incident?.business?.name}
              </Text>
            </Col>
          </Row>
        </Link>

        <Row justify="center">
          <Col>
            <Link to={`view/${incident?.id}`}>
              <Button size="small" type="text">
                View Full Incident
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default IncidentCard;
