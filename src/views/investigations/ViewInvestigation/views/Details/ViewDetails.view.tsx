import React from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Popover,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ViewInvestigationQuery } from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './ViewDetails.styles';
import UpdateContent from '../../../../incidents/ViewIncident/Update.view';
import UpdateBar from '../../../../../components/MessageInput/UpdateBar';
import TabContent from '../../../../../components/TabContent';

const { Title, Paragraph } = Typography;

interface Props {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;

  loadMore: boolean;
  scrolledToTop: () => void;
  editRights: boolean;
  userId: string;
  saving: boolean;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  investigationId: string;
  handleEditUpdate: () => void;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  toggleSubscribe: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingVehicle: () => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
}

const ViewInvestigation = ({
  data,
  loading,
  toggleSubscribe,
  scrolledToTop,
  loadMore,
  userId,
  editRights,
  saving,
  replyTo,
  setEditUpdate,
  confirmDeleteUpdate,
  setReplyTo,
  investigationId,
  handleEditUpdate,
  setEditUpdateInput,
  editUpdateInput,
  editUpdate,
  toggleAddExistingOffender,
  toggleAddExistingIncident,
  toggleAddExistingVehicle,
  optionRowShow,
  setOptionRowShow,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <TabContent>
        <Row className={classes.headerBar}>
          <Col className={classes.detailsHeader} span={12}>
            <Row>
              <Col flex={1}>
                <Title className={classes.headerTitle} level={4}>
                  {data?.investigation?.name}
                </Title>
                <Paragraph style={{ margin: 0 }}>
                  {data?.investigation?.description}
                </Paragraph>
              </Col>
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
                    data?.investigation?.subscribed
                      ? 'Stop getting notified about updates.'
                      : 'Get notified about updates.'
                  }
                >
                  <Button
                    onClick={toggleSubscribe}
                    disabled={saving}
                    loading={saving}
                    type="text"
                    color={
                      data?.investigation?.subscribed ? undefined : 'danger'
                    }
                  >
                    <FontAwesomeIcon
                      size="1x"
                      style={{ marginRight: 8 }}
                      icon={
                        data?.investigation?.subscribed ? faBellSlash : faBell
                      }
                    />
                    {data?.investigation?.subscribed
                      ? 'Un-follow Updates'
                      : 'Follow Updates'}
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className={classes.content}>
          <Col span={12} className={classes.detailsContainer}>
            <Card loading={loading}>
              <Row align="middle">
                <Col flex={1}>
                  <Title level={4}>Offenders</Title>
                </Col>
                <Col>
                  <Button
                    key="3"
                    danger
                    size="small"
                    onClick={toggleAddExistingOffender}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add Offenders
                  </Button>
                </Col>
              </Row>
              <Table
                className={classes.table}
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
                pagination={{
                  hideOnSinglePage: true,
                }}
                size="small"
                dataSource={
                  data?.investigation?.offenders.map((offender) => ({
                    key: offender.id,
                    reference: offender.reference,
                    name: offender.name,
                    totalIncidents: offender.totalIncidents,
                  })) || []
                }
              />
            </Card>

            <Card loading={loading}>
              <Row align="middle">
                <Col flex={1}>
                  <Title level={4}>Incidents</Title>
                </Col>
                <Col>
                  <Button
                    key="3"
                    danger
                    size="small"
                    onClick={toggleAddExistingIncident}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add Incidents
                  </Button>
                </Col>
              </Row>
              <Table
                className={classes.table}
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
                  data?.investigation?.incidents?.map((incident) => ({
                    key: incident?.id,
                    reference: incident?.reference,
                    policeRef: incident?.policeRef,
                    subject: incident?.subject,
                    date: incident?.dayTime,
                    location: incident?.createdBy.organisation,
                    value: incident?.value,
                    recoveredValue: incident?.recoveredValue,
                  })) || []
                }
              />
            </Card>
            <Card loading={loading}>
              <Row align="middle">
                <Col flex={1}>
                  <Title level={4}>Vehicles</Title>
                </Col>
                <Col>
                  <Button
                    key="3"
                    danger
                    size="small"
                    onClick={toggleAddExistingVehicle}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add Vehicles
                  </Button>
                </Col>
              </Row>
              <Table
                className={classes.table}
                dataSource={data?.investigation?.vehicles.map((vehicle) => ({
                  key: vehicle.id,
                  make: vehicle.make,
                  colour: vehicle.colour,
                  model: vehicle.model,
                  registration: vehicle.registration,
                  updatedAt: vehicle.updatedAt,
                  totalCrimeGroup: vehicle.totalCrimeGroups,
                  totalOffenders: vehicle.totalOffenders,
                  totalIncidents: vehicle.totalIncidents,
                }))}
                loading={loading}
                size="small"
                onRow={(record) => ({
                  onClick: () => <Link to={`view/${record.key}`} />,
                })}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    key: 'make',
                    dataIndex: 'make',
                    title: 'Make',
                  },
                  {
                    key: 'updatedAt',
                    dataIndex: 'updatedAt',
                    title: 'UpdatedAt',
                    render: (value) =>
                      moment(value || moment()).format(
                        `ddd MMM DD YYYY - HH:mm`
                      ),
                  },
                  {
                    key: 'colour',
                    dataIndex: 'colour',
                    title: 'Colour',
                    // render: (value) => `£${value || 0}`,
                  },
                  {
                    key: 'model',
                    dataIndex: 'model',
                    title: 'Model',
                    // render: (value) => `£${value || 0}`,
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
                  {
                    key: 'totalCrimeGroups',
                    dataIndex: 'totalCrimeGroups',
                    title: 'Crime Groups',
                  },
                  {
                    key: 'registration',
                    dataIndex: 'registration',
                    title: 'Registration',
                    // render: (value) => `${value?.toFixed(0) || 0}%`,
                  },
                  // {
                  //   key: 'crimeGroup',
                  //   dataIndex: 'crimeGroup',
                  //   title: 'crimeGroup',
                  //   render: (value,item) => `${item.crimeGroup.}%`,
                  // },
                ]}
              />
            </Card>
          </Col>
          <Col span={12}>
            <div className={classes.updatesContainer}>
              <InfiniteScroll
                height={
                  optionRowShow ? 'calc(100vh - 279px)' : 'calc(100vh - 169px)'
                }
                className="update-scroll"
                initialScrollY={0}
                dataLength={data?.investigation?.updates?.length || 0}
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
                {data?.investigation?.updates.map((update) => (
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
                investigationId={investigationId}
                setReplyTo={setReplyTo}
                subscribed={data?.investigation?.subscribed || false}
                setOptionRowShow={setOptionRowShow}
              />
            </div>
          </Col>
        </Row>
      </TabContent>
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
    </>
  );
};

export default ViewInvestigation;
