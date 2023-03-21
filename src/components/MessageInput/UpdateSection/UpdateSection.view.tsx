import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { UpdateType, VehicleQuery } from 'graphql/generated';
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
import WatermarkSlide, {
  WatermarkSlideType,
} from 'components/images/WatermartkSlide.view';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import UpdateBar from 'components/MessageInput/update-bar';
import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './UpdateSection.styles';

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
}: Props) => {
  const classes = useStyles();
  const optionMenuItems = [
    {
      label: 'Edit',
      key: '1',
      icon: <FontAwesomeIcon size="3x" icon={faEdit} />,
      onClick: toggleEditVehicle,
    },
    {
      label: 'Delete',
      key: '2',
      icon: <FontAwesomeIcon icon={faTrash} />,
      onClick: () => {
        confirm({
          title: 'Do you want to delete the vehicle?',
          content: 'This action cannot be undone.',
          onOk() {
            onDeleteVehicle();
          },
        });
      },
    },
  ];

  return (
    <div className="page-container">
      <Row className={classes.headerBar}>
        <Col className={classes.detailsHeader} span={12}>
          <Row>
            <Col className={classes.centerCell} flex={1}>
              <Title className={classes.headerTitle} level={4}>
                {data?.vehicle?.registration ||
                  `Alert ID: ${data?.vehicle?.reference}`}
              </Title>
            </Col>

            {editRights && (
              <Dropdown overlay={<Menu items={optionMenuItems} />}>
                <Button type="text">
                  <Space>
                    Options
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
                Updates
              </Title>
            </Col>
            <Col>
              <Tooltip
                title={
                  data?.vehicle?.subscribed
                    ? 'Stop getting notified about updates.'
                    : 'Get notified about updates.'
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
                  {data?.vehicle?.subscribed
                    ? 'Un-follow Updates'
                    : 'Follow Updates'}
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
                }}
              >
                {data?.vehicle?.images.map((image, i) => (
                  <Col key={image.id}>
                    <Button
                      onClick={() => openLightbox(i)}
                      className={classes.image}
                      style={{ padding: 0 }}
                    >
                      <WatermarkImage url={image.optimised} />
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
                      <Descriptions.Item label="Registration">
                        {data?.vehicle?.registration || 'Unknown'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Make">
                        {data?.vehicle?.make || 'Unknown'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Model">
                        {data?.vehicle?.model || 'Unknown'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Colour">
                        {data?.vehicle?.colour || 'Unknown'}
                      </Descriptions.Item>

                      {data?.vehicle?.model && (
                        <Descriptions.Item label="Model">
                          {data?.vehicle?.model || 'Unknown'}
                        </Descriptions.Item>
                      )}

                      {data?.vehicle?.updatedAt && (
                        <Descriptions.Item label="UpdatedAt" span={2}>
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
                          title="Total Incidents"
                          value={data?.vehicle?.totalIncidents || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title="Total Offenders"
                          value={data?.vehicle?.totalOffenders || 0}
                        />
                      </Col>
                      <Col>
                        <Statistic
                          title="Total Crime Groups"
                          value={data?.vehicle?.totalCrimeGroups || 0}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}
            <Card loading={loading}>
              <Title level={4}>Offenders</Title>
              <Table
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: 'Alert ID',
                  },
                  {
                    key: 'name',
                    dataIndex: 'name',
                    title: 'Name',
                  },
                  {
                    key: 'totalIncidents',
                    dataIndex: 'totalIncidents',
                    title: 'Total Incidents',
                  },
                ]}
                size="small"
                dataSource={
                  data?.vehicle?.offenders.map((offender) => ({
                    key: offender.id,
                    reference: offender.reference,
                    name: offender.name,
                    totalIncidents: offender.totalIncidents,
                  })) || []
                }
              />
            </Card>
            <Card loading={loading}>
              <Title level={4}>Incidents</Title>
              <Table
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: 'Alert ID',
                  },
                  {
                    key: 'policeRef',
                    dataIndex: 'policeRef',
                    title: 'Crime No.',
                  },
                  {
                    key: 'subject',
                    dataIndex: 'subject',
                    title: 'Subject',
                  },
                  {
                    key: 'date',
                    dataIndex: 'date',
                    title: 'Date',
                  },

                  {
                    key: 'value',
                    dataIndex: 'value',
                    title: 'Value',
                  },
                ]}
                size="small"
                dataSource={
                  data?.vehicle?.incidents?.map((incident) => ({
                    key: incident?.id,
                    reference: incident?.reference,
                    policeRef: incident?.policeRef,
                    subject: incident?.subject,
                    date: incident?.dayTime,
                    // location: incident?.createdBy.businesses[0]?.name,
                    value: incident?.value,
                    // recoveredValue: incident?.recoveredValue,
                  })) || []
                }
              />
            </Card>
            <Card loading={loading}>
              <Title level={4}>Crime Groups</Title>
              <Table
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: 'Alert ID',
                  },
                  {
                    key: 'alias',
                    dataIndex: 'alias',
                    title: 'Alias',
                  },

                  {
                    key: 'totalOffenders',
                    dataIndex: 'totalOffenders',
                    title: 'Members',
                  },
                  {
                    key: 'totalIncidents',
                    dataIndex: 'totalIncidents',
                    title: 'Incidents',
                  },
                ]}
                size="small"
                dataSource={
                  data?.vehicle?.crimeGroup?.map((crimeGroup) => ({
                    key: crimeGroup.id,
                    reference: crimeGroup.reference,
                    totalOffenders: crimeGroup.totalOffenders,
                    totalIncidents: crimeGroup.totalIncidents,
                    totalValue: crimeGroup.totalValue,
                    totalRecoveredValue: crimeGroup.totalRecoveredValue,
                    totalTheftSuccess: crimeGroup.totalTheftSuccess,
                    alias: crimeGroup.alias,
                  })) || []
                }
              />
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
                  <div className="date">Loading...</div>
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
                            Edit Update
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
                            Delete Update
                          </Button>
                        </div>
                      }
                    >
                      <div>
                        <UpdateContent
                          userId={userId}
                          content={update.text}
                          createdAt={update.createdAt}
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
                      createdAt={update.createdAt}
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
                                Edit Update
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
                                Delete Update
                              </Button>
                            </div>
                          }
                        >
                          <div>
                            <UpdateContent
                              userId={userId}
                              content={reply.text}
                              createdAt={reply.createdAt}
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
                          createdAt={reply.createdAt}
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
                              createdAt: update.createdAt,
                              createdBy:
                                userId === update.createdBy.id
                                  ? 'You'
                                  : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                              id: update.id,
                              text: update.text || '',
                            })
                          }
                        >
                          Reply
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
          title="Edit Vehicle Details"
          visible={editVehicle}
          width="600"
          onClose={toggleEditVehicle}
        >
          {editVehicle ? <EditVehicle onClose={toggleEditVehicle} /> : <div />}
        </Drawer>
        <Modal
          title="Edit Update Content"
          visible={editUpdate !== null}
          onOk={handleEditUpdate}
          onCancel={() => setEditUpdate(null)}
          okText="Save"
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
