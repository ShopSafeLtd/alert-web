import type { CarouselRef } from 'antd/lib/carousel';
import type { IncidentCardFragment } from 'graphql/fragments/__generated__/incident-card.generated';
import type { EditFeedImage } from 'types/DataType';

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
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  addInvestigation: boolean;
  approvalRights: boolean;
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
  approvalRights,
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
        method: PermissionMethod.Write,
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
    <Card
      bodyStyle={{
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
      className="incident-card"
      key={incident.id || ''}
    >
      {!incident?.approved && (
        <div className="incident-card-overlay">
          <Title className="incident-card-approval-title" level={4}>
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
          <Title ellipsis level={4}>
            {incident?.subject}
          </Title>
          <div>
            <Text type="secondary">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Alert ID: {incidentReference} {policeRef, plural, =1 {{policeRefS}} other {}}',
                },
                {
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
              // style={{ height: incident.offenders.length > 0 ? 24 : 66 }}
              ellipsis={{ rows: 2 }}
              // className="incident-card-desc"
              style={{
                height: incident.offenders.length > 0 ? 60 : 95,
                marginBottom: 10,
              }}
              type="secondary"
            >
              {incident?.description}
            </Paragraph>
            <Row
              align="middle"
              style={{
                overflowX: 'auto',
                // marginBottom: incident.offenders.length > 2 ? 3 : 15,
              }}
              wrap={false}
            >
              <Col style={{ minWidth: 60 }}>
                <Text strong type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Groups:',
                  })}
                </Text>
              </Col>
            </Row>
          </Link>
        </Space>
        <Row
          justify="center"
          style={{ alignContent: 'flex-end', flexGrow: 1, marginTop: 10 }}
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
    </Card>
  );
};

export default IncidentCard;
