import type { CarouselRef } from 'antd/lib/carousel';
import type { IncidentCardFragment } from 'graphql/fragments/__generated__/incident-card.generated';
import type { EditFeedImage } from 'types/DataType';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
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
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import EditIncidentFeed from 'components/form-components/incident/EditIncidentFeed';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentStatusBadge from 'components/incidents/IncidentStatus';
import {
  IncidentPriority,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './IncidentCard.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(' ');
  if (names.length === 1) {
    return names[0].slice(0, 2).toUpperCase();
  }
  const lastName = names.at(-1);
  return `${names[0][0]}${lastName?.[0] || ''}`.toUpperCase();
};

interface Props {
  addInvestigation: boolean;
  compactView: boolean;
  editImage: boolean;
  editImageId: string;
  editIncidentFeed: boolean;
  incident: IncidentCardFragment;
  onDelete: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setEditImageId: (id: string) => void;
  toggleAddInvestigation: () => void;
  toggleEditImage: () => void;
  toggleEditIncidentFeed: () => void;
}

const IncidentCard = ({
  addInvestigation,
  compactView,
  editImage,
  editImageId,
  editIncidentFeed,
  incident,
  onDelete,
  onEditImage,
  openLightbox,
  setEditImageId,
  toggleAddInvestigation,
  toggleEditImage,
  toggleEditIncidentFeed,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const classes = useStyles();
  const currentScheme = useAtomValue(currentSchemeAtom);

  // Get fallback image from offender if incident has no images
  const getFallbackOffenderImage = () => {
    if (incident.totalImages && incident.totalImages > 0) return null;

    const offenderWithImage = incident.offenders.find(
      (offender) => offender.images && offender.images.length > 0
    );

    return offenderWithImage?.images?.[0] || null;
  };

  const fallbackImage = getFallbackOffenderImage();
  const hasImages =
    (incident.totalImages && incident.totalImages > 0) || fallbackImage;

  const getPriorityBorder = () => {
    if (incident.priority === IncidentPriority.High)
      return '6px solid rgb(222, 68, 54)';
    if (incident.priority === IncidentPriority.Medium)
      return '6px solid #fa8c16';
    if (
      incident.priority === IncidentPriority.Normal &&
      currentScheme.incidentStatusEnabled
    )
      return '6px solid #52c41a';
    return undefined;
  };

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faEdit} />,
      key: 0,
      label: intl.formatMessage({
        defaultMessage: 'Edit Incident',
      }),
      onClick: () => toggleEditIncidentFeed(),
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Incidents,
      },
    },
    incident.totalImages && incident.totalImages > 0
      ? {
          icon: <FontAwesomeIcon icon={faImage} />,
          key: 1,
          label: intl.formatMessage({
            defaultMessage: 'Edit Image',
          }),
          onClick: () => toggleEditImage(),
          permission: {
            method: PermissionMethod.Edit,
            model: PermissionModel.Incidents,
          },
        }
      : null,
    {
      icon: <FontAwesomeIcon icon={faTrash} />,
      key: 2,
      label: intl.formatMessage({
        defaultMessage: 'Delete Incident',
      }),
      onClick: () =>
        confirm({
          content: intl.formatMessage({
            defaultMessage:
              'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
          }),
          okText: intl.formatMessage({
            defaultMessage: 'Delete',
          }),
          onOk: () => onDelete(incident?.id || ''),
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
          }),
        }),
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Incidents,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faPlus} />,
      key: 3,
      label: intl.formatMessage({
        defaultMessage: 'Add Investigation',
      }),
      onClick: () => toggleAddInvestigation(),
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Investigations,
      },
    },
  ].filter(
    (item) =>
      item &&
      hasRolePermission({
        permission: item.permission,
      })
  );

  return (
    <div>
      {compactView ? (
        <Card
          bodyStyle={{
            borderLeft: getPriorityBorder(),
            borderRadius: 5,
            height: 150,
            overflow: 'hidden',
            padding: 0,
          }}
          key={incident.id || ''}
          style={{
            marginBottom: 0,
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
              {hasRolePermission({
                permission: {
                  method: PermissionMethod.Approve,
                  model: PermissionModel.Incidents,
                },
              }) && (
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
            {hasImages ? (
              <Col>
                <div className={classes.imageContainer}>
                  {incident.totalImages && incident.totalImages > 0 ? (
                    <>
                      <Carousel
                        afterChange={(currentSlide: number) => {
                          setEditImageId(incident.images[currentSlide].id);
                        }}
                        ref={imagesRef}
                      >
                        {incident?.images.map((image) => (
                          <div className={classes.image} key={image.id}>
                            <WatermarkImage
                              position={image.position}
                              positionX={image.positionX}
                              positionY={image.positionY}
                              rotation={image.rotation}
                              url={image.low}
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
                    </>
                  ) : fallbackImage ? (
                    <div className={classes.image}>
                      <WatermarkImage
                        position={fallbackImage.position}
                        positionX={fallbackImage.positionX}
                        positionY={fallbackImage.positionY}
                        rotation={fallbackImage.rotation}
                        url={fallbackImage.low}
                      />
                    </div>
                  ) : null}
                </div>
              </Col>
            ) : (
              <Col />
            )}
            <Col className={classes.cardContent} flex={1}>
              <Link to={`/app/incidents/view/${incident?.id}`}>
                <Row wrap={false}>
                  <Col flex={1}>
                    <Title ellipsis level={4}>
                      {incident?.subject}
                    </Title>
                  </Col>
                  {incident?.draft && (
                    <Col style={{ marginTop: 2 }}>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage:
                            'This incident is a live draft awaiting completion',
                        })}
                      >
                        <Tag
                          color="orange"
                          style={{ fontSize: 10, padding: '0 4px' }}
                        >
                          <FormattedMessage defaultMessage="LIVE" />
                        </Tag>
                      </Tooltip>
                    </Col>
                  )}
                  {currentScheme.incidentStatusEnabled &&
                    incident?.newIncident && (
                      <Col style={{ marginTop: 2 }}>
                        <Tag
                          color="blue"
                          style={{ fontSize: 10, padding: '0 4px' }}
                        >
                          <FormattedMessage defaultMessage="NEW" />
                        </Tag>
                      </Col>
                    )}
                  {currentScheme.incidentStatusEnabled && incident?.status && (
                    <Col style={{ marginTop: 2 }}>
                      <IncidentStatusBadge status={incident.status} />
                    </Col>
                  )}
                  {menuItems.length > 0 && (
                    <Col style={{ marginTop: -2 }}>
                      <Dropdown
                        arrow={{ pointAtCenter: true }}
                        overlay={<Menu items={menuItems} />}
                        placement="bottomRight"
                        trigger={['click']}
                      >
                        <Button className={classes.menuButton}>
                          <FontAwesomeIcon icon={faEllipsisV} size="lg" />
                        </Button>
                      </Dropdown>
                    </Col>
                  )}
                </Row>
                <div className={classes.alertId}>
                  <Text ellipsis type="secondary">
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Ref: {policeRefS}} other {}}',
                      },
                      {
                        customerRef: incident.customerRef ? 1 : 0,
                        customerRefS: incident.customerRef,
                        incidentReference: incident?.reference,
                        policeRef: incident.policeRef ? 1 : 0,
                        policeRefS: incident.policeRef,
                      }
                    )}
                  </Text>
                </div>
                <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                  {incident?.description}
                </Paragraph>
              </Link>
              <div className={classes.bottomRow}>
                <Row align="middle" justify="space-between" wrap={false}>
                  <Col>
                    <Row wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faClock}
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Text style={{ fontSize: 14 }} type="secondary">
                          {incident.dayTime}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  {currentScheme.incidentAssignmentEnabled &&
                    incident.assignedUsers &&
                    incident.assignedUsers.length > 0 && (
                      <Col>
                        <Avatar.Group maxCount={3} size="small">
                          {incident.assignedUsers.map((user) => (
                            <Tooltip key={user.id} title={user.fullName}>
                              <Avatar style={{ backgroundColor: '#1890ff' }}>
                                {getInitials(user.fullName)}
                              </Avatar>
                            </Tooltip>
                          ))}
                        </Avatar.Group>
                      </Col>
                    )}
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card
          bodyStyle={{
            borderRadius: 10,
            borderTop: getPriorityBorder(),
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: 555,
            overflow: 'hidden',
          }}
          className="incident-card"
          key={incident.id || ''}
          style={{
            marginBottom: 0,
          }}
        >
          {!incident?.approved && (
            <div className="incident-card-overlay">
              <Title className="incident-card-approval-title" level={4}>
                {intl.formatMessage({
                  defaultMessage: 'This incident is awaiting approval',
                })}
              </Title>
              {hasRolePermission({
                permission: {
                  method: PermissionMethod.Approve,
                  model: PermissionModel.Incidents,
                },
              }) && (
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
          {menuItems.length > 0 && (
            <Dropdown
              arrow={{ pointAtCenter: true }}
              overlay={<Menu items={menuItems} />}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button className="incident-card-menu">
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  // size="5x"
                  style={{ height: '100%' }}
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
              <>
                <Carousel
                  afterChange={(currentSlide: number) => {
                    setEditImageId(incident.images[currentSlide].id);
                  }}
                  ref={imagesRef}
                >
                  {incident?.images.map((image) => (
                    <div key={image.id}>
                      <div className="incident-card-image">
                        <WatermarkImage
                          position={image.position}
                          positionX={image.positionX}
                          positionY={image.positionY}
                          rotation={image.rotation}
                          url={image.low}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
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
              </>
            ) : fallbackImage ? (
              <div className="incident-card-image">
                <WatermarkImage
                  position={fallbackImage.position}
                  positionX={fallbackImage.positionX}
                  positionY={fallbackImage.positionY}
                  rotation={fallbackImage.rotation}
                  url={fallbackImage.low}
                />
              </div>
            ) : (
              <SkeletonImage height={280} />
            )}
          </div>
          <div className="incident-card-content">
            <Space direction="vertical">
              <Row align="middle" gutter={8}>
                <Col>
                  <Title ellipsis level={4} style={{ marginBottom: 0 }}>
                    {incident?.subject}
                  </Title>
                </Col>
                {incident?.draft && (
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage:
                          'This incident is a live draft awaiting completion',
                      })}
                    >
                      <Tag color="orange">
                        <FormattedMessage defaultMessage="LIVE" />
                      </Tag>
                    </Tooltip>
                  </Col>
                )}
                {currentScheme.incidentStatusEnabled &&
                  incident?.newIncident && (
                    <Col>
                      <Tag color="blue">
                        <FormattedMessage defaultMessage="NEW" />
                      </Tag>
                    </Col>
                  )}
                {currentScheme.incidentStatusEnabled && incident?.status && (
                  <Col>
                    <IncidentStatusBadge status={incident.status} />
                  </Col>
                )}
              </Row>
              <div>
                <Text type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Crime Ref: {policeRefS}} other {}}',
                    },
                    {
                      customerRef: incident.customerRef ? 1 : 0,
                      customerRefS: incident.customerRef,
                      incidentReference: incident?.reference,
                      policeRef: incident.policeRef ? 1 : 0,
                      policeRefS: incident.policeRef,
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
              {currentScheme.incidentAssignmentEnabled &&
                incident.assignedUsers &&
                incident.assignedUsers.length > 0 && (
                  <Row>
                    <Avatar.Group maxCount={3} size="small">
                      {incident.assignedUsers.map((user) => (
                        <Tooltip key={user.id} title={user.fullName}>
                          <Avatar style={{ backgroundColor: '#1890ff' }}>
                            {getInitials(user.fullName)}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </Row>
                )}
              <Link to={`/app/incidents/view/${incident?.id}`}>
                <Row
                  gutter={8}
                  style={{ marginBottom: 5, maxWidth: '100%' }}
                  wrap={false}
                >
                  <Col span={12}>
                    <Row wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className="incident-card-icon"
                          icon={faClock}
                          size="sm"
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
                          className="incident-card-icon"
                          icon={faLocationDot}
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Text ellipsis style={{ flex: 1 }} type="secondary">
                          {incident?.business?.name || incident?.location?.full}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Paragraph
                  ellipsis={{ rows: 4 }}
                  style={{ marginBottom: 5 }}
                  type="secondary"
                >
                  {incident?.description}
                </Paragraph>
              </Link>
            </Space>
            <Row
              justify="center"
              style={{ alignContent: 'flex-end', flexGrow: 1, marginTop: 0 }}
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
        onClose={toggleEditIncidentFeed}
        open={editIncidentFeed}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident',
        })}
        width="600"
      >
        {editIncidentFeed ? (
          <EditIncidentFeed
            incidentId={incident.id}
            onClose={toggleEditIncidentFeed}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* investigation */}
      <Drawer
        onClose={toggleAddInvestigation}
        open={addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
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
      <ImageEditor
        image={incident.images.find((image) => editImageId === image.id)}
        onClose={toggleEditImage}
        open={editImage}
        submitImage={onEditImage}
      />
    </div>
  );
};

export default IncidentCard;
