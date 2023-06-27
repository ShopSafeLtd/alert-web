import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Space,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import type {
  CrimeGroupQuery,
  SuggestedCrimeGroupMembersQuery,
} from 'graphql/generated';
import { UpdateType } from 'graphql/generated';
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
import AddOffender from 'components/form-components/offender/offender/AddNewOffender';
import AddAlias from 'components/form-components/crimeGroup/Alias';
import UpdateContent from 'views/incidents/ViewIncident/Update.view';
import UpdateBar from 'components/MessageInput/UpdateBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { OffenderData, VehicleData } from 'types/DataType';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';

import VehicleTable from 'components/tables/VehicleTable';
import OffenderTable from 'components/tables/OffenderTable';
import IncidentTable from 'components/tables/IncidentTable';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import CrimeGroupSideList from 'components/crimeGroups/sidelist';
import SuggestedMembers from 'components/crimeGroups/SuggestedMembers/SuggestedMembers.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import { useIntl } from 'react-intl';
import moment from 'moment';
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
  submitNewVehicle: (value: VehicleData) => void;
  submitOffender: (value: string) => void;
  submitVehicle: (value: string) => void;
  submitNewOffender: (value: OffenderData) => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
  viewSuggestedOpen: boolean;
  toggleViewSuggested: () => void;
  handleAddSuggestion: (id: string) => void;
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
  submitNewVehicle,
  submitOffender,
  submitVehicle,
  submitNewOffender,
  suggestedData,
  toggleViewSuggested,
  viewSuggestedOpen,
  handleAddSuggestion,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const optionMenuItems = [
    {
      label: intl.formatMessage({ defaultMessage: 'Add Alias', id: 'KDH1mp' }),
      key: '1',
      icon: <FontAwesomeIcon size="3x" icon={faPlus} />,
      onClick: toggleAddAlias,
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Delete', id: 'K3r6DQ' }),
      key: '2',
      icon: <FontAwesomeIcon icon={faTrash} />,
      onClick: () => {
        confirm({
          title: intl.formatMessage({
            defaultMessage: 'Do you want to delete the crime group?',
            id: 'sozjTX',
          }),
          content: intl.formatMessage({
            defaultMessage: 'This action cannot be undone.',
            id: 'JDJoIZ',
          }),
          onOk() {
            onDeleteCrimeGroup();
          },
        });
      },
    },
  ];

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <CrimeGroupSideList current={crimeGroupId} />
        </Col>
        <Col flex={1} className={classes.detailsContent}>
          <Row gutter={8} className={classes.headerBar} justify="end">
            <Col>
              <Tooltip
                title={
                  data?.crimeGroup?.subscribed
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
                  color={data?.crimeGroup?.subscribed ? undefined : 'danger'}
                >
                  <FontAwesomeIcon
                    size="1x"
                    style={{ marginRight: 8 }}
                    icon={data?.crimeGroup?.subscribed ? faBellSlash : faBell}
                  />
                  {data?.crimeGroup?.subscribed
                    ? intl.formatMessage({
                        defaultMessage: 'Un-follow Updates',
                        id: '45gIlS',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Follow Updates',
                        id: 'gBN+ok',
                      })}
                </Button>
              </Tooltip>
            </Col>
            {editRights && (
              <Col>
                <Dropdown overlay={<Menu items={optionMenuItems} />}>
                  <Button type="text">
                    <Space>
                      {intl.formatMessage({
                        defaultMessage: 'Options',
                        id: 'NDV5Mq',
                      })}
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
            )}
          </Row>
          <div className={classes.content}>
            <div className={classes.details}>
              <Card loading={loading}>
                <Title level={3}>
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {ref} {alias}',
                      id: 'FGm79Y',
                    },
                    {
                      ref: data?.crimeGroup?.reference || '',
                      alias: data?.crimeGroup?.alias
                        ? `(${data?.crimeGroup?.alias})`
                        : '',
                    }
                  )}
                </Title>
                <Row gutter={32}>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Incidents',
                        id: 'pUlxda',
                      })}
                      value={data?.crimeGroup?.totalIncidents || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Offenders',
                        id: 'Pyo0l3',
                      })}
                      value={data?.crimeGroup?.totalOffenders || 0}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Loss',
                        id: 'LPr3Nh',
                      })}
                      value={`£${
                        data?.crimeGroup?.totalValue?.toLocaleString() || 0
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
                        data?.crimeGroup?.totalRecoveredValue?.toLocaleString() ||
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
                        data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0
                      }%`}
                    />
                  </Col>
                </Row>
              </Card>
              <Card loading={loading}>
                <Row gutter={8} align="middle" style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Offenders',
                        id: 'xb54TN',
                      })}
                    </Title>
                  </Col>
                  {suggestedData?.crimeGroup?.suggestedMembers &&
                    suggestedData.crimeGroup.suggestedMembers.length > 0 && (
                      <Col>
                        <Button
                          onClick={toggleViewSuggested}
                          danger
                          size="small"
                          type="ghost"
                        >
                          {suggestedData.crimeGroup.suggestedMembers.length}
                          {intl.formatMessage({
                            defaultMessage: 'Suggested Members',
                            id: 'TxnvVF',
                          })}
                        </Button>
                      </Col>
                    )}
                  <Col>
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              label: intl.formatMessage({
                                defaultMessage: 'Add Existing Offenders',
                                id: '1FbM4r',
                              }),
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
                              label: intl.formatMessage({
                                defaultMessage: 'Create New Offender',
                                id: '58ir77',
                              }),
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
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Offenders',
                          id: 'xb54TN',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.offenders.length && !loading ? (
                  <OffenderTable
                    offenders={data?.crimeGroup?.offenders}
                    hasNavigation
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No offenders for this crime group',
                      id: '3x8wG/',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              {data?.crimeGroup?.incidents &&
                data?.crimeGroup?.incidents.length > 0 && (
                  <MapCard
                    width="100%"
                    height={500}
                    markers={
                      data?.crimeGroup?.incidents.map((incident) => ({
                        geoLat: incident?.location?.geoLat,
                        geoLng: incident?.location?.geoLng,
                      })) || []
                    }
                  />
                )}
              <Card loading={loading}>
                <Row align="middle" style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Vehicles',
                        id: 'r6wuJ3',
                      })}
                    </Title>
                  </Col>
                  <Col>
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              label: intl.formatMessage({
                                defaultMessage: 'Add Existing Vehicles',
                                id: 'goP1s6',
                              }),
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
                              label: intl.formatMessage({
                                defaultMessage: 'Create New Vehicle',
                                id: 'xiAZxN',
                              }),
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
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Vehicles',
                          id: 'r6wuJ3',
                        })}
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

                {data?.crimeGroup?.vehicles.length && !loading ? (
                  <VehicleTable
                    vehicles={data?.crimeGroup?.vehicles}
                    hasNavigation
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No vehicles for this crime group',
                      id: 'dtAhMN',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
              <Card loading={loading}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                    id: 'mtr3R4',
                  })}
                </Title>
                {data?.crimeGroup?.incidents &&
                data?.crimeGroup?.incidents.length > 0 &&
                !loading ? (
                  <IncidentTable // TODO
                    // @ts-expect-error says can be null
                    incidents={data?.crimeGroup?.incidents.filter(
                      (incident) => incident !== null
                    )}
                    hasNavigation
                    pageSize={20}
                  />
                ) : (
                  <Empty
                    description={intl.formatMessage({
                      defaultMessage: 'No incidents for this crime group',
                      id: 'uFO+ib',
                    })}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            </div>

            <Modal
              title={intl.formatMessage({
                id: '8sZeJM',
                defaultMessage: 'Edit Update Content',
              })}
              visible={editUpdate !== null}
              onOk={handleEditUpdate}
              onCancel={() => setEditUpdate(null)}
              okText={intl.formatMessage({
                id: 'jvo0vs',
                defaultMessage: 'Save',
              })}
            >
              <Input
                value={editUpdateInput}
                onChange={(e) => setEditUpdateInput(e.target.value)}
              />
            </Modal>
          </div>
        </Col>
        <Col span={6}>
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
                  <div className="date">
                    {intl.formatMessage({
                      id: 'gjBiyj',
                      defaultMessage: 'Loading...',
                    })}
                  </div>
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
                            {intl.formatMessage({
                              id: 'pCzvx3',
                              defaultMessage: 'Edit Update',
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
                              id: 'ef1dfd',
                              defaultMessage: 'Delete Update',
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
                                  id: 'pCzvx3',
                                  defaultMessage: 'Edit Update',
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
              crimeGroupId={crimeGroupId}
              setReplyTo={setReplyTo}
              subscribed={data?.crimeGroup?.subscribed || false}
              setOptionRowShow={setOptionRowShow}
            />
          </div>
        </Col>
      </Row>

      <Drawer
        title={intl.formatMessage({
          id: 'V+RsEq',
          defaultMessage: 'Add New Offender',
        })}
        visible={addOffender}
        width={700}
        onClose={toggleAddOffender}
        zIndex={999}
      >
        {addOffender ? (
          <AddOffender
            update={submitNewOffender}
            onClose={toggleAddOffender}
            // saving={saving}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          id: '1FbM4r',
          defaultMessage: 'Add Existing Offenders',
        })}
        visible={addExistingOffender}
        width={800}
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            update={(submitData) => submitOffender(submitData.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      {/* vehicle */}
      <Drawer
        title={intl.formatMessage({
          id: 'cHbTr7',
          defaultMessage: 'Add New Vehicle',
        })}
        open={addNewVehicle}
        width={700}
        zIndex={999}
        onClose={toggleAddNewVehicle}
      >
        {addNewVehicle ? (
          <AddVehicle
            onClose={toggleAddNewVehicle}
            update={submitNewVehicle}
            saving={saving}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          id: 'goP1s6',
          defaultMessage: 'Add Existing Vehicles',
        })}
        open={addExistingVehicle}
        width={800}
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            update={(submitData) => submitVehicle(submitData.id)}
            onClose={toggleAddExistingVehicle}
            vehicleIds={vehicleIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          id: '9p+uZ/',
          defaultMessage: 'Add New Alias',
        })}
        open={addAlias}
        width={600}
        onClose={toggleAddAlias}
      >
        {addAlias ? <AddAlias onClose={toggleAddAlias} /> : <div />}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          id: 'jxHIQ/',
          defaultMessage: 'Suggested Group Members',
        })}
        open={viewSuggestedOpen}
        width={900}
        onClose={toggleViewSuggested}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {viewSuggestedOpen && editRights && (
          <SuggestedMembers
            suggestedData={suggestedData}
            onClose={toggleViewSuggested}
            handleAddSuggestion={handleAddSuggestion}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ViewCrimeGroup;
