import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Space,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { CrimeGroupQuery, UpdateType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faChevronDown,
  faEdit,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import AddExistingOffender from 'components/form-components/crimeGroup/offender/AddExistingOffender';
import AddNewOffender from 'components/form-components/crimeGroup/offender/AddNewOffender';
import AddVehicle from 'components/form-components/crimeGroup/vehicle/AddVehicle';
import AddExistingVehicle from 'components/form-components/crimeGroup/vehicle/AddExistingVehicle';
import AddAlias from 'components/form-components/crimeGroup/Alias';

import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/MessageInput/update-bar';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './ViewCrimeGroup.styles';

const { Title } = Typography;
const { confirm } = Modal;
interface Props {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  onDeleteCrimeGroup: () => void;
  addAlias: boolean;
  toggleAddAlias: () => void;
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
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  editRights: boolean;
  toggleSubscribe: () => void;
  crimeGroupId: string;
}

const ViewCrimeGroup = ({
  data,
  loading,
  saving,
  offenderIds,
  vehicleIds,
  addOffender,
  toggleAddOffender,
  addExistingOffender,
  toggleAddExistingOffender,
  addNewVehicle,
  addExistingVehicle,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  onDeleteCrimeGroup,
  addAlias,
  toggleAddAlias,
  editRights,
  optionRowShow,
  setOptionRowShow,
  userId,
  editUpdate,
  editUpdateInput,
  handleEditUpdate,
  replyTo,
  scrolledToTop,
  setEditUpdate,
  setEditUpdateInput,
  setReplyTo,
  loadMore,
  confirmDeleteUpdate,
  toggleSubscribe,
  crimeGroupId,
}: Props) => {
  const classes = useStyles();
  const optionMenuItems = [
    {
      label: 'Add Alias',
      key: '1',
      icon: <FontAwesomeIcon size="3x" icon={faPlus} />,
      onClick: toggleAddAlias,
    },
    {
      label: 'Delete',
      key: '2',
      icon: <FontAwesomeIcon icon={faTrash} />,
      onClick: () => {
        confirm({
          title: 'Do you want to delete the crime group?',
          content: 'This action cannot be undone.',
          onOk() {
            onDeleteCrimeGroup();
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
                {`Alert ID: ${data?.crimeGroup?.reference}`}
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
            {/* {editRights && (
              <Button
                key="1"
                type="primary"
                disabled={saving}
                // style={{ color: 'red' }}
                onClick={() => {
                  confirm({
                    title: 'Do you want to delete the crime group?',
                    content: 'This action cannot be undone.',
                    onOk() {
                      onDeleteCrimeGroup();
                    },
                  });
                }}
                icon={
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
                }
              >
                Delete Crime Group
              </Button>
            )} */}
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
                  data?.crimeGroup?.subscribed
                    ? 'Stop getting notified about updates.'
                    : 'Get notified about updates.'
                }
              >
                <Button
                  onClick={toggleSubscribe}
                  disabled={saving}
                  loading={saving}
                  type="text"
                  color={data?.crimeGroup?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.crimeGroup?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.crimeGroup?.subscribed
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
            <Card loading={loading}>
              <Row gutter={30}>
                <Col>
                  <Statistic
                    title="Total Incidents"
                    value={data?.crimeGroup?.totalIncidents || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Total Offenders"
                    value={data?.crimeGroup?.totalOffenders || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Total Lost value"
                    value={`£${data?.crimeGroup?.totalValue || 0}`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Total Recovered value"
                    value={`£${data?.crimeGroup?.totalRecoveredValue || 0}`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Theft Success Rate"
                    value={`${
                      data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0
                    }%`}
                  />
                </Col>
              </Row>
            </Card>
            <Card loading={loading}>
              <Row align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>Offenders</Title>
                </Col>
                <Col>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: 'Add Existing Offenders',
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddExistingOffender(),
                          },
                          {
                            label: 'Create New Offender',
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddOffender(),
                          },
                        ]}
                      />
                    }
                  >
                    <Button
                      size="small"
                      danger
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Offenders
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

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
                  data?.crimeGroup?.offenders.map((offender) => ({
                    key: offender.id,
                    reference: offender.reference,
                    name: offender.name,
                    totalIncidents: offender.totalIncidents,
                  })) || []
                }
              />
            </Card>
            <Card loading={loading}>
              <Row align="middle" style={{ marginBottom: 10 }}>
                <Col flex={1}>
                  <Title level={4}>Vehicles</Title>
                </Col>
                <Col>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: 'Add Existing Vehicles',
                            key: '1',
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddExistingVehicle(),
                          },
                          {
                            label: 'Create New Vehicle',
                            key: '2',
                            icon: (
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            onClick: () => toggleAddNewVehicle(),
                          },
                        ]}
                      />
                    }
                  >
                    <Button
                      size="small"
                      danger
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Vehicles
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

              <Table
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: 'Alert ID',
                  },
                  {
                    key: 'registration',
                    dataIndex: 'registration',
                    title: 'Registration',
                  },
                  {
                    key: 'make',
                    dataIndex: 'make',
                    title: 'Make',
                  },
                  {
                    key: 'model',
                    dataIndex: 'model',
                    title: 'Model',
                  },
                  {
                    key: 'colour',
                    dataIndex: 'colour',
                    title: 'Colour',
                  },

                  {
                    key: 'totalOffenders',
                    dataIndex: 'totalOffenders',
                    title: 'Members',
                  },
                ]}
                size="small"
                dataSource={
                  data?.crimeGroup?.vehicles.map((vehicle) => ({
                    key: vehicle.id,
                    make: vehicle.make,
                    colour: vehicle.colour,
                    model: vehicle.model,
                    registration: vehicle.registration,
                    reference: vehicle.reference,
                    totalOffenders: vehicle.totalOffenders,
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
                    key: 'location',
                    dataIndex: 'location',
                    title: 'Location',
                  },
                  {
                    key: 'value',
                    dataIndex: 'value',
                    title: 'Value',
                  },
                  {
                    key: 'recoveredValue',
                    dataIndex: 'recoveredValue',
                    title: 'Recovered Value',
                  },
                ]}
                size="small"
                dataSource={
                  data?.crimeGroup?.incidents?.map((incident) => ({
                    key: incident?.id,
                    reference: incident?.reference,
                    policeRef: incident?.policeRef,
                    subject: incident?.subject,
                    date: incident?.dayTime,
                    location: incident?.createdBy.businesses[0]?.name,
                    value: incident?.value,
                    recoveredValue: incident?.recoveredValue,
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
              // dataLength={data?.crimeGroup?.updates?.length || 0}
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
              {data?.crimeGroup?.updates.map((update) => (
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
              crimeGroupId={crimeGroupId}
              setReplyTo={setReplyTo}
              subscribed={data?.crimeGroup?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>

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
      </Row>

      {/* offeder */}
      <Drawer
        title="Add New Offender"
        visible={addOffender}
        width="600"
        onClose={toggleAddOffender}
        zIndex={1001}
      >
        {addOffender ? <AddNewOffender onClose={toggleAddOffender} /> : <div />}
      </Drawer>
      <Drawer
        title="Add Existing Offenders"
        visible={addExistingOffender}
        width="800"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* vehicle */}
      <Drawer
        title="Add New Vehicle"
        visible={addNewVehicle}
        width="600"
        onClose={toggleAddNewVehicle}
      >
        {addNewVehicle ? <AddVehicle onClose={toggleAddNewVehicle} /> : <div />}
      </Drawer>
      <Drawer
        title="Add Existing Vehicles"
        visible={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <AddExistingVehicle
            vehicleIds={vehicleIds}
            onClose={toggleAddExistingVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Add New Alias"
        visible={addAlias}
        width="600"
        onClose={toggleAddAlias}
      >
        {addAlias ? <AddAlias onClose={toggleAddAlias} /> : <div />}
      </Drawer>
    </div>
  );
};

export default ViewCrimeGroup;
