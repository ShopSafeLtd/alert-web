import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import type { VehicleQuery } from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faChevronDown,
  faEdit,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import EditVehicle from 'components/form-components/Vehicle/EditVehicle';
import moment from 'moment';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import UpdateBar from 'components/MessageInput/UpdateBar';
import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import OffenderTable from 'components/tables/OffenderTable';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import IncidentTable from 'components/tables/IncidentTable';
import type { VehicleData } from 'types/DataType';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './ViewVehicle.styles';

const { Title } = Typography;
const { confirm } = Modal;

interface Props {
  data: VehicleQuery | undefined;
  loading: boolean;
  editVehicle: boolean;
  toggleEditVehicle: () => void;
  saving: boolean;
  onDeleteVehicle: () => void;
  loadMore: boolean;
  scrolledToTop: () => void;
  userId: string;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;

  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  // optionMenuItems: ItemType[];
  editRights: boolean;
  vehicleId: string;
  toggleSubscribe: () => void;
  submitEditVehicle: (value: VehicleData) => void;
}

const ViewVehicle = ({
  data,
  loading,
  saving,
  editVehicle,
  toggleEditVehicle,
  onDeleteVehicle,
  editRights,
  optionRowShow,
  setOptionRowShow,
  userId,
  openLightbox,
  lightBoxOpen,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  lightboxElements,
  replyTo,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setReplyTo,
  loadMore,
  confirmDeleteUpdate,
  vehicleId,
  toggleSubscribe,
  submitEditVehicle,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const optionMenuItems = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Edit',
        id: 'wEQDC6',
      }),
      key: '1',
      icon: <FontAwesomeIcon size="3x" icon={faEdit} />,
      onClick: toggleEditVehicle,
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Delete',
        id: 'K3r6DQ',
      }),
      key: '2',
      icon: <FontAwesomeIcon icon={faTrash} />,
      onClick: () => {
        confirm({
          title: intl.formatMessage({
            defaultMessage: 'Do you want to delete the vehicle?',
            id: 'dZ4nD4',
          }),
          content: intl.formatMessage({
            defaultMessage: 'This action cannot be undone.',
            id: 'JDJoIZ',
          }),
          onOk() {
            onDeleteVehicle();
          },
        });
      },
    },
  ];

  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
    id: '5jeq8P',
  });
  return (
    <div className="page-container">
      <Row className={classes.headerBar}>
        <Col className={classes.detailsHeader} span={12}>
          <Row>
            <Col className={classes.centerCell} flex={1}>
              <Title className={classes.headerTitle} level={4}>
                {data?.vehicle?.registration || (
                  <FormattedMessage
                    defaultMessage="Alert ID: {reference}"
                    id="377fsC"
                    values={{ reference: data?.vehicle?.reference }}
                  />
                )}
              </Title>
            </Col>

            {editRights && (
              <Dropdown overlay={<Menu items={optionMenuItems} />}>
                <Button type="text">
                  <Space>
                    <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Space>
                </Button>
              </Dropdown>
            )}
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col className={classes.centerCell} flex={1}>
              <Title className={classes.headerTitle} level={4}>
                <FormattedMessage defaultMessage="Updates" id="recCg9" />
              </Title>
            </Col>
            <Col>
              <Tooltip
                title={
                  data?.vehicle?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Stop getting notified about updates.',
                        id: 'WpTY6U',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Get notified about updates.',
                        id: 'icr+Hj',
                      })
                }
              >
                <Button
                  onClick={toggleSubscribe}
                  disabled={saving}
                  loading={saving}
                  type="text"
                  color={data?.vehicle?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.vehicle?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.vehicle?.subscribed ? (
                    <FormattedMessage
                      defaultMessage="Un-follow Updates"
                      id="45gIlS"
                    />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Follow Updates"
                      id="gBN+ok"
                    />
                  )}
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row wrap={false} className={classes.content}>
        <Col span={12} className={classes.detailsContent}>
          <div className={classes.details}>
            {loading ? (
              <Skeleton />
            ) : (
              <Row
                gutter={8}
                justify="start"
                align="middle"
                wrap={false}
                className={classes.images}
                style={{
                  height:
                    data?.vehicle?.images && data?.vehicle?.images.length > 0
                      ? undefined
                      : 0,
                  marginBottom: 20,
                }}
              >
                {data?.vehicle?.images.map((image, i) => (
                  <Col key={image.id}>
                    <Button
                      onClick={() => openLightbox(i)}
                      className={classes.image}
                      style={{ padding: 0 }}
                    >
                      <WatermarkImage
                        url={image.optimised}
                        position={image.position}
                      />
                    </Button>
                  </Col>
                ))}
              </Row>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <Row>
                <Col flex={1}>
                  <Card loading={loading}>
                    <Descriptions
                      contentStyle={{ fontSize: 16 }}
                      column={2}
                      // layout="vertical"
                    >
                      <Descriptions.Item
                        label={
                          <FormattedMessage
                            defaultMessage="Registration"
                            id="qv7ied"
                          />
                        }
                      >
                        {data?.vehicle?.registration || unknown}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={
                          <FormattedMessage defaultMessage="Make" id="6AAM0P" />
                        }
                      >
                        {data?.vehicle?.make || unknown}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={
                          <FormattedMessage
                            defaultMessage="Model"
                            id="rhSI1/"
                          />
                        }
                      >
                        {data?.vehicle?.model || unknown}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={
                          <FormattedMessage
                            defaultMessage="Colour"
                            id="+e8vAT"
                          />
                        }
                      >
                        {data?.vehicle?.colour || unknown}
                      </Descriptions.Item>

                      {data?.vehicle?.model && (
                        <Descriptions.Item
                          label={
                            <FormattedMessage
                              defaultMessage="Model"
                              id="rhSI1/"
                            />
                          }
                        >
                          {data?.vehicle?.model || unknown}
                        </Descriptions.Item>
                      )}

                      {data?.vehicle?.updatedAt && (
                        <Descriptions.Item
                          label={
                            <FormattedMessage
                              defaultMessage="Updated At"
                              id="ECx6bx"
                            />
                          }
                          span={2}
                        >
                          {moment(data.vehicle.updatedAt || moment()).format(
                            `ddd MMM DD YYYY - HH:mm`
                          )}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <Row>
                <Col flex={1}>
                  <Card loading={loading}>
                    <Row gutter={64}>
                      <Col>
                        <Statistic
                          title={
                            <FormattedMessage
                              defaultMessage="Total Incidents"
                              id="pUlxda"
                            />
                          }
                          value={data?.vehicle?.totalIncidents || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title={
                            <FormattedMessage
                              defaultMessage="Total Offenders"
                              id="Pyo0l3"
                            />
                          }
                          value={data?.vehicle?.totalOffenders || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title={
                            <FormattedMessage
                              defaultMessage="Total Crime Groups"
                              id="PwRU00"
                            />
                          }
                          value={data?.vehicle?.totalCrimeGroups || 0}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}
            <Card loading={loading}>
              <Title level={4}>
                <FormattedMessage defaultMessage="Offenders" id="xb54TN" />
              </Title>
              {data?.vehicle?.offenders.length && !loading ? (
                <OffenderTable
                  offenders={data?.vehicle?.offenders}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No offenders for this vehicle"
                      id="R72ORA"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            <Card loading={loading}>
              <Title level={4}>
                <FormattedMessage defaultMessage="Incidents" id="mtr3R4" />
              </Title>
              {data?.vehicle?.incidents.length && !loading ? (
                <IncidentTable
                  incidents={data?.vehicle?.incidents}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No incidents for this vehicle"
                      id="eMIzkc"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
            <Card loading={loading}>
              <Title level={4}>
                <FormattedMessage defaultMessage="Crime Groups" id="a0aLil" />
              </Title>
              {data?.vehicle?.crimeGroup.length && !loading ? (
                <CrimeGroupTable
                  crimeGroups={data?.vehicle?.crimeGroup}
                  hasNavigation
                />
              ) : (
                <Empty
                  description={
                    <FormattedMessage
                      defaultMessage="No crime groups for this vehicle"
                      id="yhLYu7"
                    />
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
          </div>
        </Col>
        <Col span={12}>
          <div className={classes.updatesContainer}>
            <InfiniteScroll
              height={
                optionRowShow ? 'calc(100vh - 279px)' : 'calc(100vh - 169px)'
              }
              className="update-scroll"
              initialScrollY={0}
              // dataLength={data?.vehicle?.updates?.length || 0}
              dataLength={0}
              next={scrolledToTop}
              hasMore={loadMore}
              inverse
              style={{
                justifyContent: 'end',
                // display: 'flex',
                flexDirection: 'column',
              }}
              loader={
                <div className="message-date">
                  <div className="date-line" />
                  <div className="date">
                    {intl.formatMessage({
                      defaultMessage: 'Loading...',
                      id: 'gjBiyj',
                    })}
                  </div>
                  <div className="date-line" />
                </div>
              }
            >
              {data?.vehicle?.updates.map((update) => (
                <div key={update.id} className="update-wrapper">
                  {editRights && update.type !== UpdateType.System ? (
                    <Popover
                      trigger="click"
                      placement={
                        update.createdBy.id === userId ? 'left' : 'right'
                      }
                      overlayClassName="message-popover"
                      content={
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Button
                            type="text"
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 5 }}
                                icon={faEdit}
                                size="lg"
                              />
                            }
                            onClick={() => {
                              setEditUpdate({
                                id: update.id,
                                text: update.text || '',
                              });
                            }}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Edit Update',
                              id: 'pCzvx3',
                            })}
                          </Button>
                          <Button
                            type="text"
                            disabled={saving}
                            icon={
                              <FontAwesomeIcon
                                style={{ marginRight: 5 }}
                                icon={faTrash}
                                size="lg"
                              />
                            }
                            onClick={() => {
                              confirmDeleteUpdate(update.id);
                            }}
                            size="small"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Delete Update',
                              id: 'ef1dfd',
                            })}
                          </Button>
                        </div>
                      }
                    >
                      <div>
                        <UpdateContent
                          userId={userId}
                          content={update.text}
                          createdAt={moment(update.createdAt)}
                          from={update.createdBy}
                          id={update.id}
                          images={update.images}
                          incidents={update.linkedIncidents}
                          offenders={update.linkedOffenders}
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
                          showDate
                          showUser
                        />
                      </div>
                    </Popover>
                  ) : (
                    <UpdateContent
                      userId={userId}
                      content={update.text}
                      createdAt={moment(update.createdAt)}
                      from={update.createdBy}
                      id={update.id}
                      images={update.images}
                      incidents={update.linkedIncidents}
                      offenders={update.linkedOffenders}
                      vehicles={update.linkedVehicles}
                      crimeGroups={update.linkedCrimeGroups}
                      showDate
                      showUser
                    />
                  )}
                  {update.replies.map((reply) => (
                    <div className="update-reply">
                      {editRights ? (
                        <Popover
                          trigger="click"
                          placement={
                            reply.createdBy.id === userId ? 'left' : 'right'
                          }
                          overlayClassName="message-popover"
                          content={
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <Button
                                type="text"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faEdit}
                                    size="lg"
                                  />
                                }
                                onClick={() => {
                                  setEditUpdate({
                                    id: reply.id,
                                    text: reply.text || '',
                                  });
                                }}
                                size="small"
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Edit Update',
                                  id: 'pCzvx3',
                                })}
                              </Button>
                              <Button
                                type="text"
                                disabled={saving}
                                icon={
                                  <FontAwesomeIcon
                                    style={{ marginRight: 5 }}
                                    icon={faTrash}
                                    size="lg"
                                  />
                                }
                                onClick={() => {
                                  confirmDeleteUpdate(reply.id);
                                }}
                                size="small"
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Delete Update',
                                  id: 'ef1dfd',
                                })}
                              </Button>
                            </div>
                          }
                        >
                          <div>
                            <UpdateContent
                              userId={userId}
                              content={reply.text}
                              createdAt={moment(reply.createdAt)}
                              from={reply.createdBy}
                              id={reply.id}
                              images={reply.images}
                              incidents={reply.linkedIncidents}
                              offenders={reply.linkedOffenders}
                              vehicles={update.linkedVehicles}
                              crimeGroups={update.linkedCrimeGroups}
                              showDate
                              showUser
                            />
                          </div>
                        </Popover>
                      ) : (
                        <UpdateContent
                          userId={userId}
                          content={reply.text}
                          createdAt={moment(reply.createdAt)}
                          from={reply.createdBy}
                          id={reply.id}
                          images={reply.images}
                          incidents={reply.linkedIncidents}
                          offenders={reply.linkedOffenders}
                          vehicles={update.linkedVehicles}
                          crimeGroups={update.linkedCrimeGroups}
                          showDate
                          showUser
                        />
                      )}
                    </div>
                  ))}
                  <Row>
                    {update.type !== UpdateType.System && (
                      <Col>
                        <Button
                          style={{
                            marginLeft: update.replies.length > 0 ? 48 : 0,
                          }}
                          type="text"
                          danger
                          size="small"
                          onClick={() =>
                            setReplyTo({
                              createdAt: update.createdAt.toString(),
                              createdBy:
                                userId === update.createdBy.id
                                  ? intl.formatMessage({
                                      defaultMessage: 'You',
                                      id: 'kJ5W29',
                                    })
                                  : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                              id: update.id,
                              text: update.text || '',
                            })
                          }
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Reply',
                            id: '9HU8vw',
                          })}
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              ))}
            </InfiniteScroll>
            <UpdateBar
              replyTo={replyTo}
              vehicleId={vehicleId}
              setReplyTo={setReplyTo}
              subscribed={data?.vehicle?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>

        <Drawer
          title={
            <FormattedMessage
              defaultMessage="Edit Vehicle Details"
              id="AWN+hV"
            />
          }
          visible={editVehicle}
          width={700}
          zIndex={999}
          onClose={toggleEditVehicle}
        >
          {editVehicle ? (
            <EditVehicle
              onClose={toggleEditVehicle}
              update={submitEditVehicle}
              editData={{
                ...data?.vehicle,
                id: data?.vehicle?.id || '',
                crimeGroup: data?.vehicle?.crimeGroup.map(({ id }) => id || ''),
                incidents: data?.vehicle?.incidents,
                offenders: data?.vehicle?.offenders,
                customGalleries: data?.vehicle?.customGalleries.map(
                  ({ id }) => id || ''
                ),
                groups: data?.vehicle?.groups.map(({ id }) => id || ''),
                images: data?.vehicle?.images.map((el) => ({
                  ...el,
                  policeImage: el.policeImage || false,
                  primary: el.primary || false,
                })),
              }}
              showGroups
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Modal
          title={
            <FormattedMessage
              defaultMessage="Edit Update Content"
              id="8sZeJM"
            />
          }
          visible={editUpdate !== null}
          onOk={handleEditUpdate}
          onCancel={() => setEditUpdate(null)}
          okText={<FormattedMessage defaultMessage="Save" id="jvo0vs" />}
        >
          <Input
            value={editUpdateInput}
            onChange={(e) => setEditUpdateInput(e.target.value)}
          />
        </Modal>

        <Lightbox
          open={lightBoxOpen.open}
          close={() => openLightbox(0)}
          plugins={[Zoom]}
          index={lightBoxOpen.index}
          slides={lightboxElements}
          controller={{
            closeOnBackdropClick: true,
          }}
          render={{
            slide: (slide: WatermarkSlideType) => (
              <WatermarkSlide slide={slide} />
            ),
          }}
        />
      </Row>
    </div>
  );
};

export default ViewVehicle;
