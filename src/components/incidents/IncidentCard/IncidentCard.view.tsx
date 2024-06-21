import React, { useRef } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEdit,
  faEllipsisV,
  faImage,
  faLocationDot,
  faPlus,
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
import { useIntl } from 'react-intl';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import type { EditFeedImage } from 'types/DataType';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';

import useStyles from './IncidentCard.styles';
import type { IncidentCardFragment } from 'graphql/fragments/incident-card.generated';
import { IncidentPriority } from 'graphql/types';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  incident: IncidentCardFragment;
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  onDelete: (id: string) => void;
  editIncidentFeed: boolean;
  toggleEditIncidentFeed: () => void;
  editImage: boolean;
  toggleEditImage: () => void;
  editImageId: string;
  setEditImageId: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  compactView: boolean;
}

const IncidentCard = ({
  incident,
  approvalRights,
  deleteRights,
  menuRights,
  openLightbox,
  onDelete,
  editIncidentFeed,
  toggleEditIncidentFeed,
  editImage,
  toggleEditImage,
  editImageId,
  setEditImageId,
  onEditImage,
  addInvestigation,
  toggleAddInvestigation,
  compactView,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const classes = useStyles();

  const getPriorityBorder = () => {
    if (incident.priority === IncidentPriority.High)
      return '6px solid rgb(222, 68, 54)';
    if (incident.priority === IncidentPriority.Medium)
      return '6px solid #ffc542';
    return undefined;
  };

  return (
    <div>
      {compactView ? (
        <Card
          key={incident.id || ''}
          style={{
            marginBottom: 0,
          }}
          bodyStyle={{
            borderRadius: 5,
            padding: 0,
            overflow: 'hidden',
            height: 150,
            borderLeft: getPriorityBorder(),
          }}
        >
          {!incident?.approved && (
            <div className={classes.cardOverlay}>
              <Row justify="center">
                <Col>
                  <Title level={4} style={{ color: '#fff' }}>
                    {intl.formatMessage({
                      defaultMessage: 'This incident is awaiting approval',
                    })}
                  </Title>
                </Col>
              </Row>
              {approvalRights && (
                <Row justify="center">
                  <Col>
                    <Link to={`view/${incident?.id}`}>
                      <Button>
                        {intl.formatMessage({
                          defaultMessage: 'Review Incident',
                        })}
                      </Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </div>
          )}

          <Row wrap={false}>
            {incident.totalImages && incident.totalImages > 0 ? (
              <Col>
                <div className={classes.imageContainer}>
                  <Carousel
                    ref={imagesRef}
                    afterChange={(currentSlide: number) => {
                      setEditImageId(incident.images[currentSlide].id);
                    }}
                  >
                    {incident?.images.map((image) => (
                      <div className={classes.image} key={image.id}>
                        <WatermarkImage
                          url={image.low}
                          rotation={image.rotation}
                          position={image.position}
                        />
                      </div>
                    ))}
                  </Carousel>
                  {incident.totalImages && incident.totalImages > 1 ? (
                    <Row className={classes.cardControls}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardControl}
                          icon={faAngleLeft}
                          onClick={() => imagesRef.current?.prev()}
                        />
                      </Col>
                      <Col flex={1} />
                      <Col>
                        <FontAwesomeIcon
                          className={classes.cardControl}
                          icon={faAngleRight}
                          onClick={() => imagesRef.current?.next()}
                        />
                      </Col>
                    </Row>
                  ) : null}
                  {incident.totalImages && incident.totalImages > 0 ? (
                    <FontAwesomeIcon
                      className={classes.imageExpand}
                      icon={faArrowsMaximize}
                      onClick={() =>
                        openLightbox(
                          incident?.images.map((image) => ({
                            src: image.low || '',
                          })) || [],
                          0
                        )
                      }
                    />
                  ) : null}
                </div>
              </Col>
            ) : (
              <Col />
            )}
            <Col flex={1} className={classes.cardContent}>
              <Link to={`/app/incidents/view/${incident?.id}`}>
                <Row wrap={false}>
                  <Col flex={1}>
                    <Title level={4} ellipsis>
                      {incident?.subject}
                    </Title>
                  </Col>
                  {menuRights && (
                    <Col style={{ marginTop: -2 }}>
                      <Dropdown
                        trigger={['click']}
                        overlay={
                          <Menu
                            items={[
                              {
                                key: 0,
                                label: intl.formatMessage({
                                  defaultMessage: 'Edit Incident',
                                }),
                                onClick: () => toggleEditIncidentFeed(),
                                icon: <FontAwesomeIcon icon={faEdit} />,
                              },
                              incident.totalImages && incident.totalImages > 0
                                ? {
                                    key: 1,
                                    label: intl.formatMessage({
                                      defaultMessage: 'Edit Image',
                                    }),
                                    onClick: () => toggleEditImage(),
                                    icon: <FontAwesomeIcon icon={faImage} />,
                                  }
                                : null,

                              {
                                key: 2,
                                label: intl.formatMessage({
                                  defaultMessage: 'Delete Incident',
                                }),
                                onClick: () =>
                                  confirm({
                                    title: intl.formatMessage({
                                      defaultMessage: 'Are you sure?',
                                    }),
                                    content: intl.formatMessage({
                                      defaultMessage:
                                        'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                                    }),
                                    okText: intl.formatMessage({
                                      defaultMessage: 'Delete',
                                    }),
                                    onOk: () => onDelete(incident?.id || ''),
                                  }),
                                icon: <FontAwesomeIcon icon={faTrash} />,
                              },
                              {
                                key: 3,
                                label: intl.formatMessage({
                                  defaultMessage: 'Add Investigation',
                                }),
                                onClick: () => toggleAddInvestigation(),
                                icon: <FontAwesomeIcon icon={faPlus} />,
                              },
                            ].filter((item) => item?.key !== 2 || deleteRights)}
                          />
                        }
                        placement="bottomRight"
                        arrow={{ pointAtCenter: true }}
                      >
                        <Button className={classes.menuButton}>
                          <FontAwesomeIcon size="lg" icon={faEllipsisV} />
                        </Button>
                      </Dropdown>
                    </Col>
                  )}
                </Row>
                <div className={classes.alertId}>
                  <Text type="secondary" ellipsis>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Ref: {policeRefS}} other {}}',
                      },
                      {
                        incidentReference: incident?.reference,
                        policeRefS: incident.policeRef,
                        policeRef: incident.policeRef ? 1 : 0,
                        customerRefS: incident.customerRef,
                        customerRef: incident.customerRef ? 1 : 0,
                      }
                    )}
                  </Text>
                </div>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                  {incident?.description}
                </Paragraph>
              </Link>
              <div className={classes.bottomRow}>
                <Row wrap={false}>
                  <Col>
                    <FontAwesomeIcon
                      size="sm"
                      className={classes.icon}
                      icon={faClock}
                    />
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {incident.dayTime}
                    </Text>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card
          className="incident-card"
          key={incident.id || ''}
          style={{
            marginBottom: 0,
          }}
          bodyStyle={{
            overflow: 'hidden',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: 555,
            borderTop: getPriorityBorder(),
          }}
        >
          {!incident?.approved && (
            <div className="incident-card-overlay">
              <Title level={4} className="incident-card-approval-title">
                {intl.formatMessage({
                  defaultMessage: 'This incident is awaiting approval',
                })}
              </Title>
              {approvalRights && (
                <Link to={`view/${incident?.id}`}>
                  <Button>
                    {intl.formatMessage({
                      defaultMessage: 'Review Incident',
                    })}
                  </Button>
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
                      label: intl.formatMessage({
                        defaultMessage: 'Edit Incident',
                      }),
                      onClick: () => toggleEditIncidentFeed(),
                      icon: <FontAwesomeIcon icon={faEdit} />,
                    },
                    incident.totalImages && incident.totalImages > 0
                      ? {
                          key: 1,
                          label: intl.formatMessage({
                            defaultMessage: 'Edit Image',
                          }),
                          onClick: () => toggleEditImage(),
                          icon: <FontAwesomeIcon icon={faImage} />,
                        }
                      : null,

                    {
                      key: 2,
                      label: intl.formatMessage({
                        defaultMessage: 'Delete Incident',
                      }),
                      onClick: () =>
                        confirm({
                          title: intl.formatMessage({
                            defaultMessage: 'Are you sure?',
                          }),
                          content: intl.formatMessage({
                            defaultMessage:
                              'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
                          }),
                          okText: intl.formatMessage({
                            defaultMessage: 'Delete',
                          }),
                          onOk: () => onDelete(incident?.id || ''),
                        }),
                      icon: <FontAwesomeIcon icon={faTrash} />,
                    },
                    {
                      key: 3,
                      label: intl.formatMessage({
                        defaultMessage: 'Add Investigation',
                      }),
                      onClick: () => toggleAddInvestigation(),
                      icon: <FontAwesomeIcon icon={faPlus} />,
                    },
                  ].filter((item) => item?.key !== 2 || deleteRights)}
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

          {/* <div className="incident-card-tags">
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
                {intl.formatMessage(
                  {
                    defaultMessage: '+ {num} more',
                    id: 'fi2Xie',
                  },
                  {
                    num: incident.crimeTypes.length - 1,
                  }
                )}
              </Tag>
            </Tooltip>
          )}
        </Row>
      </div> */}

          <div>
            {incident.totalImages && incident.totalImages > 0 ? (
              <Carousel
                ref={imagesRef}
                afterChange={(currentSlide: number) => {
                  setEditImageId(incident.images[currentSlide].id);
                }}
              >
                {incident?.images.map((image) => (
                  <div key={image.id}>
                    <div className="incident-card-image">
                      <WatermarkImage
                        url={image.low}
                        rotation={image.rotation}
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
          {incident.totalImages && incident.totalImages > 1 ? (
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
          ) : null}
          {incident.totalImages && incident.totalImages > 0 ? (
            <FontAwesomeIcon
              className="incident-card-expand"
              icon={faArrowsMaximize}
              onClick={() =>
                openLightbox(
                  incident?.images.map((image) => ({
                    src: image.low || '',
                  })) || [],
                  0
                )
              }
            />
          ) : null}
          <div className="incident-card-content">
            <Space direction="vertical">
              <Title level={4} ellipsis>
                {incident?.subject}
              </Title>
              <div>
                <Text type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Crime Ref: {policeRefS}} other {}}',
                    },
                    {
                      incidentReference: incident?.reference,
                      policeRefS: incident.policeRef,
                      policeRef: incident.policeRef ? 1 : 0,
                      customerRefS: incident.customerRef,
                      customerRef: incident.customerRef ? 1 : 0,
                    }
                  )}
                </Text>
              </div>
              {incident.offenders.length > 0 ? (
                <Row wrap={false}>
                  {incident.offenders.slice(0, 1).map((offender) => (
                    <Link to={`/app/offenders/view/${offender?.id}`}>
                      <Tag key={offender.id}>
                        {offender.name ||
                          intl.formatMessage({
                            defaultMessage: 'Unknown Offender',
                          })}
                      </Tag>
                    </Link>
                  ))}
                  {incident.offenders.length > 1 && (
                    <Tooltip
                      title={incident.offenders.slice(1).map((item, index) => (
                        <Link to={`/app/offenders/view/${item?.id}`}>
                          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions,formatjs/no-literal-string-in-jsx */}
                          {index > 0 && ', '}
                          {item.name}
                        </Link>
                      ))}
                    >
                      <Tag>
                        {intl.formatMessage(
                          {
                            defaultMessage: '+ {num} more',
                          },
                          {
                            num: incident.offenders.length - 1,
                          }
                        )}
                      </Tag>
                    </Tooltip>
                  )}
                </Row>
              ) : (
                <div />
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
                  style={{ marginBottom: 5 }}
                  type="secondary"
                  ellipsis={{ rows: 4 }}
                >
                  {incident?.description}
                </Paragraph>
              </Link>
            </Space>
            <Row
              justify="center"
              style={{ marginTop: 0, flexGrow: 1, alignContent: 'flex-end' }}
            >
              <Col>
                <Link to={`/app/incidents/view/${incident?.id}`}>
                  <Button size="small" type="text">
                    {intl.formatMessage({
                      defaultMessage: 'View Incident',
                    })}
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Card>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident',
        })}
        open={editIncidentFeed}
        width="600"
        onClose={toggleEditIncidentFeed}
      >
        {editIncidentFeed ? (
          <EditIncidentFeed
            onClose={toggleEditIncidentFeed}
            incidentId={incident.id}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* investigation */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        open={addInvestigation}
        width="500"
        onClose={toggleAddInvestigation}
      >
        {addInvestigation ? (
          <AddInvestigation
            incidentId={incident.id}
            onClose={toggleAddInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <FeedImageEditor
        submitImage={onEditImage}
        onClose={toggleEditImage}
        open={editImage}
        image={incident.images.find((image) => editImageId === image.id)}
      />
    </div>
  );
};

export default IncidentCard;
