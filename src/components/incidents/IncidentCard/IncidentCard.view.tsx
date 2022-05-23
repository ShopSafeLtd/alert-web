import React, { useRef } from "react";
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
  Skeleton
} from "antd";
import { IncidentFeedQuery } from "graphql/generated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faUser,
  faEllipsisV,
  faTrash,
  faEdit,
} from "@fortawesome/pro-light-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from "@fortawesome/pro-solid-svg-icons";
import { CarouselRef } from "antd/lib/carousel";
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from "utils/get-offender-desc";

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  incident: Exclude<IncidentFeedQuery["incidentFeed"], undefined | null>[0];
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string; }[], index: number) => void;
  onDelete: (id: string) => void;
}

const IncidentCard = ({
  incident,
  approvalRights,
  deleteRights,
  menuRights,
  openLightbox,
  onDelete
}: Props) => {
  const imagesRef = useRef<CarouselRef>(null);

  return (
    <Card className="incident-card">
      {!incident?.approved && (
        <div className="incident-card-overlay">
          <Title level={4} className="incident-card-approval-title">
            This incident is awaiting approval
          </Title>
          {approvalRights && <Button>Review Incident</Button>}
        </div>
      )}
      {menuRights && (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu
              items={[
                {
                  key: 0,
                  label: "Edit Incident",
                  onClick: () => {},
                  icon: <FontAwesomeIcon size="lg" icon={faEdit} />,
                },
                {
                  key: 1,
                  label: "Delete Incident",
                  onClick: () => confirm({
                    title: 'Are you sure?',
                    content: 'Click delete incident if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                    okText: 'Delete Incident',
                    onOk: () => onDelete(incident?.id || '')
                  }),
                  icon: <FontAwesomeIcon size="lg" icon={faTrash} />,
                },
              ].filter(item => item.key !== 1 || deleteRights)}
            />
          }
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="incident-card-menu">
            <FontAwesomeIcon size="lg" icon={faEllipsisV} />
          </Button>
        </Dropdown>
      )}
      <div className="incident-card-tags">
        <Row gutter={8}>
          {incident?.crimeTypes.map((crimeType, i) => (
            <Col key={i}>
              <Tag className="incident-card-tag" color="red">
                {crimeType.name}
              </Tag>
            </Col>
          ))}
        </Row>
      </div>
      {incident && incident.images.length > 0 ? <Carousel ref={imagesRef}>
        {incident?.images.map((image) => (
          <div>
            <div
              className="incident-card-image"
              style={{
                backgroundImage: `url(${image.optimised})`,
              }}
            />
          </div>
        ))}
      </Carousel> : <Skeleton.Image />}
      {incident && incident.images.length > 1 && (
        <Row className="incident-card-controls">
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="incident-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="incident-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      )}
     {incident && incident.images.length > 0 && <FontAwesomeIcon
        size="lg"
        className="incident-card-expand"
        icon={faArrowsMaximize}
        onClick={() =>
          openLightbox(
            incident?.images.map((image) => ({ src: image.optimised || '' })) || [],
            0
          )
        }
      />}
      <Tabs size="middle" defaultActiveKey="DETAILS">
        <Tabs.TabPane key="DETAILS" tab={<Badge>DETAILS</Badge>}>
          <div className="incident-card-content">
            <Title level={4} ellipsis>
              {incident?.subject}
            </Title>
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
                  {incident?.createdBy.fullName} -{" "}
                  {incident?.createdBy.organisation}
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
                <Text style={{ width: "100%" }} ellipsis type="secondary">
                  {incident?.location?.full}
                </Text>
              </Col>
            </Row>
            <Paragraph className="incident-card-desc" type="secondary">
              {incident?.description}
            </Paragraph>
            <Row justify="center">
              <Col>
                <Button size="small" type="text">
                  View Full Incident
                </Button>
              </Col>
            </Row>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="OFFENDERS"
          tab={
            <Badge
              count={incident?.offenders.length}
              offset={[10, 6.2]}
              size="small"
            >
              OFFENDERS
            </Badge>
          }
        >
          <div className="incident-card-content">
            {incident?.offenders.map((offender) => (
              <Row className="incident-card-offender">
                <Col span={6}>
                  {offender.images.length > 0 ? (
                    <div
                      className="incident-card-offender-image"
                      style={{
                        backgroundImage: `url(${offender.images[0].optimised})`,
                      }}
                    />
                  ) : (
                    <div className="incident-card-offender-placeholder" />
                  )}
                </Col>
                <Col span={18}>
                  <div className="incident-card-offender-content">
                    <Title level={4}>{offender.name}</Title>
                    <Row>
                      <Col span={12}>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="Gender">
                            {getOffenderGender(offender.gender)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Ethnicity">
                            {getOffenderRace(offender.race, true)}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={12}>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="Age">
                            {getOffenderAge(offender.age)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Build">
                            {getOffenderBuild(offender.build)}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default IncidentCard;
