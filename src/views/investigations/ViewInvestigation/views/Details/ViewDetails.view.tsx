import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Modal,
  Popover,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import type {
  InvestigationSuggestionsQuery,
  ViewInvestigationQuery,
} from 'graphql/generated';
import { InvestigationStatus, UpdateType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import SuggestedOffenders from 'components/investigations/SuggestedOffenders';
import SuggestedVehicles from 'components/investigations/SuggestedVehicles';
import SuggestedIncidents from 'components/investigations/SuggestedIncidents';
import { useIntl } from 'react-intl';
import GetInvestigationStatusValues from 'types/enums/investigation-status';
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
  toggleAddExistingOffender: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingVehicle: () => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
  viewSuggestedOffenders: boolean;
  toggleViewSuggestedOffenders: () => void;
  handleConnectOffender: (id: string) => void;
  handleConnectIncident: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  viewSuggestedIncidents: boolean;
  toggleViewSuggestedIncidents: () => void;
  viewSuggestedVehicles: boolean;
  toggleViewSuggestedVehicles: () => void;
}
const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'green';
  if (value === InvestigationStatus.Closed) return 'red';
  if (value === InvestigationStatus.Paused) return 'orange';
  return 'green';
};
const ViewInvestigation = ({
  data,
  loading,
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
  suggestedData,
  toggleViewSuggestedOffenders,
  viewSuggestedOffenders,
  handleConnectIncident,
  handleConnectOffender,
  handleConnectVehicle,
  toggleViewSuggestedIncidents,
  toggleViewSuggestedVehicles,
  viewSuggestedIncidents,
  viewSuggestedVehicles,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  return (
    <>
      <TabContent>
        <Row className={classes.content}>
          <Col flex={1} className={classes.detailsContainer}>
            <Card>
              <Title className={classes.headerTitle} level={4}>
                {data?.investigation?.name}
                <Tag
                  color={getTextStatus(
                    data?.investigation?.status || InvestigationStatus.Open
                  )}
                  style={{ marginLeft: 10, marginTop: -8 }}
                >
                  {
                    GetInvestigationStatusValues[
                      data?.investigation?.status || InvestigationStatus.Open
                    ]
                  }
                </Tag>
              </Title>
              <Paragraph style={{ margin: 0, marginBottom: 10 }}>
                {data?.investigation?.description}
              </Paragraph>
              <Row gutter={32}>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Incidents',
                      id: 'pUlxda',
                    })}
                    value={data?.investigation?.totalIncidents || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Offenders',
                      id: 'Pyo0l3',
                    })}
                    value={data?.investigation?.totalOffenders || 0}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Loss',
                      id: 'LPr3Nh',
                    })}
                    value={`£${
                      data?.investigation?.totalValue?.toLocaleString() || 0
                    }`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Total Value Recovered',
                      id: 't+iLve',
                    })}
                    value={`£${
                      data?.investigation?.totalRecoveredValue?.toLocaleString() ||
                      0
                    }`}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={intl.formatMessage({
                      defaultMessage: 'Loss Rate',
                      id: 'mQPFSj',
                    })}
                    value={`${
                      data?.investigation?.totalTheftSuccess?.toFixed(0) || 0
                    }%`}
                  />
                </Col>
              </Row>
            </Card>
            <Card loading={loading}>
              <Row gutter={8} align="middle">
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                      id: 'xb54TN',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedOffenders && (
                  <Col>
                    <Button
                      size="small"
                      danger
                      type="ghost"
                      onClick={toggleViewSuggestedOffenders}
                    >
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {suggestedData.investigation?.suggestedOffenders.length}{' '}
                      {intl.formatMessage({
                        defaultMessage: 'Suggested Offenders',
                        id: '5UuihT',
                      })}
                    </Button>
                  </Col>
                )}
                <Col>
                  <Button
                    key="3"
                    size="small"
                    onClick={toggleAddExistingOffender}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Offenders',
                      id: 'KaNxum',
                    })}
                  </Button>
                </Col>
              </Row>
              <OffenderTable
                offenders={data?.investigation?.offenders || []}
                hasNavigation
              />
            </Card>
            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents',
                      id: 'mtr3R4',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedIncidents &&
                  suggestedData.investigation.suggestedIncidents.length > 0 && (
                    <Col>
                      <Button
                        danger
                        size="small"
                        onClick={toggleViewSuggestedIncidents}
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {suggestedData.investigation.suggestedIncidents.length}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'Suggested Incidents',
                          id: 'CKS/s0',
                        })}
                      </Button>
                    </Col>
                  )}
                <Col>
                  <Button
                    key="3"
                    size="small"
                    onClick={toggleAddExistingIncident}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Incidents',
                      id: 'kKj7sq',
                    })}
                  </Button>
                </Col>
              </Row>
              <Table
                className={classes.table}
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: intl.formatMessage({
                      defaultMessage: 'Alert ID',
                      id: 'k8ZNgH',
                    }),
                  },
                  {
                    key: 'policeRef',
                    dataIndex: 'policeRef',
                    title: intl.formatMessage({
                      defaultMessage: 'Crime No.',
                      id: 'B0ihHq',
                    }),
                  },
                  {
                    key: 'subject',
                    dataIndex: 'subject',
                    title: intl.formatMessage({
                      defaultMessage: 'Subject',
                      id: 'LLtKhp',
                    }),
                  },
                  {
                    key: 'date',
                    dataIndex: 'date',
                    title: intl.formatMessage({
                      defaultMessage: 'Date',
                      id: 'P7PLVj',
                    }),
                  },
                  {
                    key: 'loss',
                    dataIndex: 'loss',
                    title: intl.formatMessage({
                      defaultMessage: 'Loss',
                      id: 'mv038n',
                    }),
                    render: (value: number) => `£${value.toLocaleString()}`,
                  },
                  {
                    key: 'location',
                    dataIndex: 'location',
                    title: intl.formatMessage({
                      defaultMessage: 'Location',
                      id: 'rvirM2',
                    }),
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
                    location: incident?.location?.full,
                    loss:
                      (incident?.totalValue || 0) -
                      (incident?.totalRecoveredValue || 0),
                  })) || []
                }
              />
            </Card>
            {data?.investigation?.incidents &&
              data?.investigation?.incidents.length > 0 && (
                <MapCard
                  width="100%"
                  height={500}
                  markers={
                    data?.investigation?.incidents.map((incident) => ({
                      geoLat: incident?.location?.geoLat,
                      geoLng: incident?.location?.geoLng,
                    })) || []
                  }
                />
              )}
            <Card loading={loading}>
              <Row align="middle" gutter={8}>
                <Col flex={1}>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                      id: 'r6wuJ3',
                    })}
                  </Title>
                </Col>
                {suggestedData?.investigation?.suggestedVehicles &&
                  suggestedData.investigation.suggestedVehicles.length > 0 && (
                    <Col>
                      <Button
                        danger
                        size="small"
                        onClick={toggleViewSuggestedVehicles}
                      >
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {suggestedData.investigation.suggestedVehicles.length}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'Suggested Vehicles',
                          id: 'fzU5Bx',
                        })}
                      </Button>
                    </Col>
                  )}
                <Col>
                  <Button
                    key="3"
                    size="small"
                    onClick={toggleAddExistingVehicle}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Vehicles',
                      id: 'iKGwyV',
                    })}
                  </Button>
                </Col>
              </Row>
              <Table
                className={classes.table}
                dataSource={data?.investigation?.vehicles.map((vehicle) => ({
                  key: vehicle.id,
                  reference: vehicle?.reference,
                  make: vehicle.make,
                  colour: vehicle.colour,
                  model: vehicle.model,
                  registration: vehicle.registration,

                  totalOffenders: vehicle.totalOffenders,
                  totalIncidents: vehicle.totalIncidents,
                }))}
                loading={loading}
                size="small"
                onRow={(record) => ({
                  // onClick: () => <Link to={`view/${record.key}`} />,
                  onClick: () =>
                    navigate(`/app/investigations/view/${record.key}`),
                })}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    key: 'reference',
                    dataIndex: 'reference',
                    title: intl.formatMessage({
                      defaultMessage: 'Alert ID',
                      id: 'k8ZNgH',
                    }),
                  },
                  {
                    key: 'registration',
                    dataIndex: 'registration',
                    title: intl.formatMessage({
                      defaultMessage: 'Registration',
                      id: 'qv7ied',
                    }),
                  },

                  {
                    key: 'make',
                    dataIndex: 'make',
                    title: intl.formatMessage({
                      defaultMessage: 'Make',
                      id: '6AAM0P',
                    }),
                  },

                  {
                    key: 'colour',
                    dataIndex: 'colour',
                    title: intl.formatMessage({
                      defaultMessage: 'Colour',
                      id: '+e8vAT',
                    }),
                  },
                  {
                    key: 'model',
                    dataIndex: 'model',
                    title: intl.formatMessage({
                      defaultMessage: 'Model',
                      id: 'rhSI1/',
                    }),
                  },
                  {
                    key: 'totalOffenders',
                    dataIndex: 'totalOffenders',
                    title: intl.formatMessage({
                      defaultMessage: 'Members',
                      id: '+a+2ug',
                    }),
                  },
                  {
                    key: 'totalIncidents',
                    dataIndex: 'totalIncidents',
                    title: intl.formatMessage({
                      defaultMessage: 'Incidents',
                      id: 'mtr3R4',
                    }),
                  },
                ]}
              />
            </Card>
          </Col>
          <Col
            span={6}
            style={{ display: 'hidden', height: 'calc(100vh - 65px)' }}
          >
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
        title={intl.formatMessage({
          defaultMessage: 'Edit Update Content',
          id: '8sZeJM',
        })}
        visible={editUpdate !== null}
        onOk={handleEditUpdate}
        onCancel={() => setEditUpdate(null)}
        okText={intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
      >
        <Input
          value={editUpdateInput}
          onChange={(e) => setEditUpdateInput(e.target.value)}
        />
      </Modal>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Offenders',
          id: '5UuihT',
        })}
        open={viewSuggestedOffenders}
        onClose={toggleViewSuggestedOffenders}
        width="900"
      >
        <SuggestedOffenders
          suggestedData={suggestedData}
          onClose={toggleViewSuggestedOffenders}
          handleAddSuggestion={handleConnectOffender}
        />
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Incidents',
          id: 'CKS/s0',
        })}
        open={viewSuggestedIncidents}
        onClose={toggleViewSuggestedIncidents}
        width="900"
      >
        <SuggestedIncidents
          suggestedData={suggestedData}
          onClose={toggleViewSuggestedIncidents}
          handleAddSuggestion={handleConnectIncident}
        />
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Suggested Vehicles',
          id: 'fzU5Bx',
        })}
        open={viewSuggestedVehicles}
        onClose={toggleViewSuggestedVehicles}
        width="900"
      >
        <SuggestedVehicles
          suggestedData={suggestedData}
          handleAddSuggestion={handleConnectVehicle}
        />
      </Drawer>
    </>
  );
};

export default ViewInvestigation;
