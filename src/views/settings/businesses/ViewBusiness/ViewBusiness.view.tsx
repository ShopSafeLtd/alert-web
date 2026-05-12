import type { UpsertDemDeviceMutation } from '#/components/form-components/DemDevice/AddDemDevice/graphql/mutations/__generated__/upsert-dem-device.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
// import EvidenceTable from '#/components/tables/EvidenceTable';
import type { RecycleDemEvidenceMutation } from '#/components/tables/DemEvidenceTable/graphql/__generated__/recycle-dem-evidence.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ListActionsQuery } from 'graphql/actions/queries/__generated__/list-actions.generated';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/__generated__/add-users-to-business.generated';
import type { BusinessQuery } from 'graphql/businesses/queries/__generated__/business.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type { BusinessLpWatchlistOrderBy } from 'graphql/types';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';
import type { ListBusinessUsersQuery } from 'graphql/users/queries/__generated__/list-business-users.generated';
import type { DemDeviceData, LocationData } from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import AddDemDevice from '#/components/form-components/DemDevice/AddDemDevice';
import DemDeviceTable from '#/components/tables/DemDeviceTable';
import DemEvidenceTable from '#/components/tables/DemEvidenceTable';
// import { ProfileUpdatedModel } from '#/types/enums/profile-update-type';
import { GetUserStatusValues } from '#/types/enums/user_status';
import {
  faEdit,
  faEnvelope,
  faMagnifyingGlass,
  faPaperPlane,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Menu,
  Popconfirm,
  Row,
  Skeleton,
  Table,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from 'antd';
import BusinessSideList from 'components/businesses/BusinessSideList';
import AddTodo from 'components/form-components/Todos/AddTodo';
import ViewTodo from 'components/form-components/Todos/ViewTodo/Todo.container';
import EditBusiness from 'components/form-components/businesses/EditBusiness';
import AddUser from 'components/form-components/user/AddUser';
import AddUserToBusiness from 'components/form-components/user/AddUserToBusiness';
import LocatingCard from 'components/map/LocatingCard';
import ActivityTable from 'components/tables/ActivityTable';
import { IncidentTableContainer } from 'components/tables/IncidentTable/IncidentTableContainer';
import dayjs from 'dayjs';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { formatPoliceAreas } from 'utils/formatPoliceAreas';

import type { BusinessLossPreventionDashboardQuery } from './graphql/queries/__generated__/business-loss-prevention-dashboard.generated';
import type { ListDemBusinessEvidenceQuery } from './graphql/queries/__generated__/list-business-dem-evidence.generated';

import LinkDem from '../../../../components/form-components/businesses/LinkDem';
import { countriesOptions } from '../../../../constants/countriesOptions';
import useStyles from './ViewBusiness.styles';
import LinkedInvestigations from './components/LossPreventionDashboard/LinkedInvestigations';
import LossPreventionSummary from './components/LossPreventionDashboard/LossPreventionSummary';
import LpCrimePatterns from './components/LossPreventionDashboard/LpCrimePatterns';
import LpOffenderWatchlist from './components/LossPreventionDashboard/LpOffenderWatchlist';
import LpWatchlistInsights from './components/LossPreventionDashboard/LpWatchlistInsights';
import RiskProfile from './components/LossPreventionDashboard/RiskProfile';
import SchemeComparison from './components/LossPreventionDashboard/SchemeComparison';
import PttSection from './components/PttSection';

interface UserTable {
  groups: { id: string; name: string }[];
  key: string;
  lastLogin: string;
  name: string;
  status: string;
}

type LpDashboard =
  BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard'];

interface Props {
  actionsData: ListActionsQuery | undefined;
  addDemDevice: boolean;
  addTodo: boolean;
  addUserVisible: boolean;
  bulkInviteConfirm: () => void;
  bulkInviting: boolean;
  businessId: string | undefined;
  completeTodoVisible: null | string;
  data: BusinessQuery | undefined;
  deleteConfirm: (value: string) => void;
  editDeviceData: DemDeviceData | undefined;
  editVisible: boolean;
  evidenceData: ListDemBusinessEvidenceQuery | undefined;
  evidenceLoading: boolean;
  inviteUserVisible: boolean;
  linkDemVisible: boolean;
  linkedInvestigations: LpDashboard['linkedInvestigations'] | null;
  loading: boolean;
  lpCrimePatterns: LpDashboard['crimePatterns'] | null;
  lpLoading: boolean;
  lpOffenderWatchlist: LpDashboard['offenderWatchlist'] | null;
  lpSummary: LpDashboard['summary'] | null;
  lpWatchlistInsights: LpDashboard['watchlistInsights'] | null;
  onEditAddress: (value: LocationData) => void;
  onRemoveBusiness: (value: string) => void;
  onRemoveDevice: (value: string) => void;
  riskProfile: LpDashboard['riskProfile'] | null;
  saving: boolean;
  schemeComparison: LpDashboard['schemeComparison'] | null;
  schemeId: null | string | undefined;
  selectedUserIds: string[];
  setCompleteTodoVisible: (value: null | string) => void;
  setEditDeviceData: (value: DemDeviceData | undefined) => void;
  setSelectedUserIds: (value: string[]) => void;
  setViewTodoVisible: (value: null | string) => void;
  setWatchlistOrderBy: (value: BusinessLpWatchlistOrderBy | undefined) => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddDemDevice: () => void;
  toggleAddTodo: () => void;
  toggleAddUser: () => void;
  toggleEdit: () => void;
  toggleInviteUser: () => void;
  toggleLinkDem: () => void;
  updateAddUsersToBusiness: MutationUpdaterFn<AddUsersToBusinessMutation>;
  updateDeleteEvidenceList: MutationUpdaterFn<RecycleDemEvidenceMutation>;
  updateDemDeviceList: MutationUpdaterFn<UpsertDemDeviceMutation>;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateUsersListExisting: MutationUpdaterFn<InviteExistingUserMutation>;
  usersData: ListBusinessUsersQuery | undefined;
  usersLoading: boolean;
  viewTodoVisible: null | string;
  watchlistOrderBy: BusinessLpWatchlistOrderBy | undefined;
}

const ViewBusiness = ({
  actionsData,
  addDemDevice,
  addTodo,
  addUserVisible,
  bulkInviteConfirm,
  bulkInviting,
  businessId,
  completeTodoVisible,
  data,
  deleteConfirm,
  editDeviceData,
  editVisible,
  evidenceData,
  evidenceLoading,
  inviteUserVisible,
  linkDemVisible,
  linkedInvestigations,
  loading,
  lpCrimePatterns,
  lpLoading,
  lpOffenderWatchlist,
  lpSummary,
  lpWatchlistInsights,
  onEditAddress,
  onRemoveBusiness,
  onRemoveDevice,
  riskProfile,
  saving,
  schemeComparison,
  schemeId,
  selectedUserIds,
  setCompleteTodoVisible,
  setEditDeviceData,
  setSelectedUserIds,
  setViewTodoVisible,
  setWatchlistOrderBy,
  templatesData,
  templatesLoading,
  toggleAddDemDevice,
  toggleAddTodo,
  toggleAddUser,
  toggleEdit,
  toggleInviteUser,
  toggleLinkDem,
  updateAddUsersToBusiness,
  updateDeleteEvidenceList,
  updateDemDeviceList,
  updateTodo,
  updateTodoList,
  updateUsersList,
  updateUsersListExisting,
  usersData,
  usersLoading,
  viewTodoVisible,
  watchlistOrderBy,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  // Row selection config
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedUserIds(selectedRowKeys as string[]);
    },
    selectedRowKeys: selectedUserIds,
  };

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <BusinessSideList current={businessId} />
        </Col>
        <Col className={classes.content} flex={1}>
          <Row className={classes.headerBar} gutter={8} justify="end">
            <Col>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Dem,
                }}
                unauthorizedElement={<div />}
              >
                <Button disabled onClick={toggleLinkDem} type="ghost">
                  {intl.formatMessage({
                    defaultMessage: 'Link to DEM',
                  })}
                </Button>
              </PermissionCheckWrapper>
            </Col>
            <Col>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Businesses,
                }}
                unauthorizedElement={<div />}
              >
                <Button onClick={toggleEdit} type="ghost">
                  <FontAwesomeIcon
                    icon={faEdit}
                    size="1x"
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Edit Business',
                  })}
                </Button>
              </PermissionCheckWrapper>
            </Col>
            <Col>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Delete,
                  model: PermissionModel.Businesses,
                }}
                unauthorizedElement={<div />}
              >
                <Button
                  onClick={() => deleteConfirm(data?.business?.id || '')}
                  type="ghost"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Delete',
                  })}
                </Button>
              </PermissionCheckWrapper>
            </Col>
          </Row>
          <div className={classes.details}>
            <Row gutter={[16, 16]} justify="end">
              <Col span={12}>
                <Card loading={loading}>
                  <Typography.Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Details',
                    })}
                  </Typography.Title>

                  <Descriptions column={1}>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Name',
                      })}
                      // style={{ paddingBottom: 8 }}
                    >
                      {data?.business?.name}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Site Number',
                      })}
                    >
                      {loading ? (
                        <Skeleton.Input style={{ height: 20 }} />
                      ) : (
                        data?.business?.siteNumber ||
                        intl.formatMessage({
                          defaultMessage: 'None',
                        })
                      )}
                    </Descriptions.Item>
                    {data?.business?.parent?.name && (
                      <Descriptions.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Parent Business',
                        })}
                      >
                        <Link
                          to={`/app/businesses/view/${
                            data?.business?.parent?.id || ''
                          }`}
                        >
                          {loading ? (
                            <Skeleton.Input style={{ height: 20 }} />
                          ) : (
                            data?.business?.parent?.name ||
                            intl.formatMessage({
                              defaultMessage: 'None',
                            })
                          )}
                        </Link>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Police Force',
                      })}
                    >
                      {loading ? (
                        <Skeleton.Input style={{ height: 20 }} />
                      ) : (
                        formatPoliceAreas(data?.business?.policeArea) ||
                        intl.formatMessage({
                          defaultMessage: 'None',
                        })
                      )}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Brands',
                      })}
                    >
                      <Row>
                        {data?.business?.brandsList &&
                        data?.business?.brandsList.length > 0 ? (
                          data?.business?.brandsList.map((el, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Typography.Text className={classes.tag} key={i}>
                              {el.name}
                            </Typography.Text>
                          ))
                        ) : (
                          <FormattedMessage defaultMessage="No Brands" />
                        )}
                      </Row>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Groups',
                      })}
                    >
                      <Row gutter={[0, 8]}>
                        {data?.business?.groups &&
                        data?.business?.groups.length > 0 ? (
                          data?.business?.groups.map(({ id, name }) => (
                            <Col key={id}>
                              <Tag color="blue">{name}</Tag>
                            </Col>
                          ))
                        ) : (
                          <FormattedMessage defaultMessage="No Groups" />
                        )}
                      </Row>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Tags',
                      })}
                    >
                      <Row gutter={[0, 8]}>
                        {data?.business?.tags &&
                        data?.business?.tags.length > 0 ? (
                          data?.business?.tags.map(({ id, name }) => (
                            <Col key={id}>
                              <Tag>{name}</Tag>
                            </Col>
                          ))
                        ) : (
                          <FormattedMessage defaultMessage="No Tag" />
                        )}
                      </Row>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Address',
                      })}
                      style={{ paddingBottom: 8 }}
                    >
                      {data?.business.locations.length
                        ? data?.business.locations[0]?.full
                        : ''}
                    </Descriptions.Item>
                    {(
                      data?.business.locations[0] as
                        | { country?: null | string }
                        | undefined
                    )?.country && (
                      <Descriptions.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Country',
                        })}
                      >
                        {(() => {
                          const countryCode =
                            (
                              data?.business.locations[0] as
                                | { country?: null | string }
                                | undefined
                            )?.country ?? '';
                          return (
                            countriesOptions.find(
                              (c) => c.value === countryCode
                            )?.label ?? countryCode
                          );
                        })()}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <LocatingCard
                  height={300}
                  location={data?.business?.locations[0]}
                  setLocation={onEditAddress}
                  width="100%"
                />
              </Col>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Automations,
                }}
                unauthorizedElement={<div />}
              >
                <Col span={24}>
                  <RiskProfile loading={lpLoading} riskProfile={riskProfile} />
                </Col>
              </PermissionCheckWrapper>
            </Row>

            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dashboard,
              }}
              unauthorizedElement={<div />}
            >
              <div style={{ marginTop: 16 }}>
                <LossPreventionSummary
                  loading={lpLoading}
                  summary={lpSummary}
                />
              </div>
            </PermissionCheckWrapper>

            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Offenders,
              }}
              unauthorizedElement={<div />}
            >
              <div style={{ marginBottom: 16 }}>
                <LpOffenderWatchlist
                  loading={lpLoading}
                  offenders={lpOffenderWatchlist}
                  onOrderByChange={setWatchlistOrderBy}
                  orderBy={watchlistOrderBy}
                />
              </div>
            </PermissionCheckWrapper>

            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Offenders,
              }}
              unauthorizedElement={<div />}
            >
              <div style={{ marginBottom: 16 }}>
                <LpWatchlistInsights
                  insights={lpWatchlistInsights}
                  loading={lpLoading}
                />
              </div>
            </PermissionCheckWrapper>

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Dashboard,
                }}
                unauthorizedElement={<div />}
              >
                <Col md={14} xs={24}>
                  <LpCrimePatterns data={lpCrimePatterns} loading={lpLoading} />
                </Col>
              </PermissionCheckWrapper>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Read,
                  model: PermissionModel.Dashboard,
                }}
                unauthorizedElement={<div />}
              >
                <Col md={10} xs={24}>
                  <SchemeComparison
                    comparison={schemeComparison}
                    loading={lpLoading}
                    schemeId={schemeId}
                  />
                </Col>
              </PermissionCheckWrapper>
            </Row>

            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Investigations,
              }}
              unauthorizedElement={<div />}
            >
              <div style={{ marginBottom: 16 }}>
                <LinkedInvestigations
                  investigations={linkedInvestigations}
                  loading={lpLoading}
                />
              </div>
            </PermissionCheckWrapper>

            <Card>
              <Row align="middle" className={classes.cardHeader}>
                <Col flex={1}>
                  <Typography.Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Users',
                    })}
                  </Typography.Title>
                </Col>
                {selectedUserIds.length > 0 && (
                  <Col>
                    <Tooltip
                      title={intl.formatMessage(
                        {
                          defaultMessage:
                            'Resend invitations to {count} selected users',
                        },
                        { count: selectedUserIds.length }
                      )}
                    >
                      <Button
                        disabled={bulkInviting}
                        icon={
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 5 }}
                          />
                        }
                        loading={bulkInviting}
                        onClick={bulkInviteConfirm}
                        size="small"
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Reinvite Selected ({count})',
                          },
                          { count: selectedUserIds.length }
                        )}
                      </Button>
                    </Tooltip>
                  </Col>
                )}
                <Col>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            key: '1',
                            label: intl.formatMessage({
                              defaultMessage: 'Add Existing',
                            }),
                            onClick: toggleAddUser,
                          },
                          {
                            icon: (
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                style={{ marginRight: 5 }}
                              />
                            ),
                            key: '2',
                            label: intl.formatMessage({
                              defaultMessage: 'Invite New User',
                            }),
                            onClick: toggleInviteUser,
                          },
                        ]}
                      />
                    }
                  >
                    <Button
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                      size="small"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add User',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

              <Table<UserTable>
                columns={[
                  {
                    dataIndex: 'name',
                    key: 'name',
                    render: (value, item) => (
                      <Link to={`/app/scheme-settings/users/view/${item.key}`}>
                        {value}
                      </Link>
                    ),
                    title: intl.formatMessage({
                      defaultMessage: 'Name',
                    }),
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    render: (value) => (
                      <Typography.Text>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        {GetUserStatusValues[value]}
                      </Typography.Text>
                    ),
                    title: intl.formatMessage({
                      defaultMessage: 'Status',
                    }),
                  },
                  {
                    dataIndex: 'lastLogin',
                    key: 'lastLogin',
                    title: intl.formatMessage({
                      defaultMessage: 'Last Login',
                    }),
                  },
                  {
                    dataIndex: 'groups',
                    key: 'groups',
                    render: (values: { id: string; name: string }[]) =>
                      values.map((group) => (
                        <Tag key={group.id}>{group.name}</Tag>
                      )),
                    title: intl.formatMessage({
                      defaultMessage: 'Groups',
                    }),
                  },
                  {
                    dataIndex: 'actions',
                    key: 'actions',
                    render: (_, item) => (
                      <Popconfirm
                        onConfirm={() => onRemoveBusiness(item.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage: 'Are you sure?',
                        })}
                      >
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove From Business',
                          })}
                        >
                          <Button
                            size="small"
                            style={{ padding: '0px 8px' }}
                            type="text"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    ),
                  },
                ]}
                dataSource={
                  usersData?.users.map((user) => ({
                    groups: user.groups,
                    key: user.id,
                    lastLogin:
                      user.sessions && user.sessions.length > 0
                        ? dayjs(user.sessions[0]?.createdAt || '').format(
                            'HH:mm DD/MM/YY'
                          )
                        : 'No LogIn Data',
                    name: user.fullName,
                    status: user.status || 'Unknown',
                  })) || []
                }
                loading={usersLoading}
                pagination={{
                  hideOnSinglePage: true,
                  pageSize: 10,
                }}
                rowSelection={rowSelection}
                size="small"
              />
            </Card>
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dem,
              }}
              unauthorizedElement={<div />}
            >
              <Card loading={loading}>
                <Row align="middle" className={classes.cardHeader}>
                  <Col flex={1}>
                    <Typography.Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Dem Devices',
                      })}
                    </Typography.Title>
                  </Col>
                  <PermissionCheckWrapper
                    permission={{
                      method: PermissionMethod.Write,
                      model: PermissionModel.Dem,
                    }}
                    unauthorizedElement={<div />}
                  >
                    <Col>
                      <Button
                        disabled={loading}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                        loading={loading}
                        onClick={toggleAddDemDevice}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Dem Device',
                        })}
                      </Button>
                    </Col>
                  </PermissionCheckWrapper>
                </Row>

                <DemDeviceTable
                  demDevices={data?.business.demDevices.map((el) => ({
                    ...el,
                    business: data.business.id,
                    demGroups: el.demGroups.map(({ id }) => id),
                  }))}
                  onDelete={onRemoveDevice}
                  saving={saving || loading}
                  setEditData={setEditDeviceData}
                />
              </Card>
            </PermissionCheckWrapper>
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Dem,
              }}
              unauthorizedElement={<div />}
            >
              <Card loading={evidenceLoading}>
                <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
                  <Col flex={1}>
                    <Typography.Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Dem Evidence',
                      })}
                    </Typography.Title>
                  </Col>

                  {/* <Col>
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                    onClick={toggleAddDocument}
                    size="small"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Evidence',
                    })}
                  </Button>
                </Col> */}
                </Row>
                <DemEvidenceTable
                  demEvidence={evidenceData?.listDemBusinessEvidence}
                  saving={loading || evidenceLoading}
                  update={updateDeleteEvidenceList}
                />
                {/* <EvidenceTable
                deleteRights
                evidence={data?.business.evidences}
                saving={loading || saving}
                title={ProfileUpdatedModel.Business}
              /> */}
              </Card>
            </PermissionCheckWrapper>
            <PttSection
              businessId={businessId || ''}
              pttGroupId={data?.business?.pttGroupId}
            />
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Incidents,
              }}
              unauthorizedElement={<div />}
            >
              <Card>
                <Typography.Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </Typography.Title>
                <IncidentTableContainer
                  businessId={data?.business?.id}
                  hasNavigation
                  pageSize={5}
                />
              </Card>
            </PermissionCheckWrapper>
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Tasks,
              }}
              unauthorizedElement={<div />}
            >
              <Card loading={loading}>
                <Row align="middle" className={classes.cardHeader}>
                  <Col flex={1}>
                    <Typography.Title level={4}>
                      {intl.formatMessage({
                        defaultMessage: 'Activities',
                      })}
                    </Typography.Title>
                  </Col>
                  <PermissionCheckWrapper
                    permission={{
                      method: PermissionMethod.Write,
                      model: PermissionModel.Tasks,
                    }}
                    unauthorizedElement={<div />}
                  >
                    <Col>
                      <Button
                        disabled={templatesLoading}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                        loading={templatesLoading}
                        onClick={toggleAddTodo}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Activity',
                        })}
                      </Button>
                    </Col>
                  </PermissionCheckWrapper>
                </Row>

                <ActivityTable
                  saving={saving || loading}
                  setCompleteTodoVisible={setCompleteTodoVisible}
                  setViewTodoVisible={setViewTodoVisible}
                  todos={data?.business?.todos}
                />
              </Card>
            </PermissionCheckWrapper>
          </div>
        </Col>
        {actionsData?.listActions.actions &&
        actionsData?.listActions.actions.length > 0 ? (
          <Col className={classes.updatesContainer} span={6}>
            <Card>
              <Typography.Title level={4} style={{ marginBottom: 30 }}>
                {intl.formatMessage({
                  defaultMessage: 'Recent Activity',
                })}
              </Typography.Title>

              {actionsData?.listActions.actions &&
              actionsData?.listActions.actions.length > 0 ? (
                <Timeline>
                  {actionsData.listActions.actions.map((action) => (
                    <Timeline.Item key={action.id}>
                      <Typography.Text>{action.description}</Typography.Text>
                      <Row gutter={32}>
                        <Col>
                          <Typography.Paragraph
                            style={{ fontSize: 12, marginBottom: 0 }}
                            type="secondary"
                          >
                            {dayjs(action.createdAt).format('HH:mm DD/MM/YY')}
                          </Typography.Paragraph>
                        </Col>
                        <Col>
                          <Typography.Paragraph
                            style={{ fontSize: 12, marginBottom: 0 }}
                            type="secondary"
                          >
                            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                            {action.byUser.fullName} -{' '}
                            {action.byUser.businesses[0]?.name}
                          </Typography.Paragraph>
                        </Col>
                      </Row>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No Recent Activity',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
          </Col>
        ) : undefined}
      </Row>

      <Drawer
        onClose={toggleEdit}
        open={editVisible}
        title={intl.formatMessage({
          defaultMessage: 'Edit Business',
        })}
        width={500}
      >
        {editVisible && (
          <EditBusiness businessId={businessId} onClose={toggleEdit} />
        )}
      </Drawer>

      <Drawer
        onClose={toggleLinkDem}
        open={linkDemVisible}
        title={intl.formatMessage({
          defaultMessage: 'Link DEM',
        })}
        width={500}
      >
        {linkDemVisible && (
          <LinkDem businessId={businessId || ''} onClose={toggleLinkDem} />
        )}
      </Drawer>
      <Drawer
        onClose={toggleInviteUser}
        open={inviteUserVisible}
        title={intl.formatMessage({
          defaultMessage: 'Invite Existing User',
        })}
        width={700}
      >
        {inviteUserVisible && (
          <AddUser
            business={{
              label: data?.business?.name || '',
              value: businessId || '',
            }}
            onClose={toggleInviteUser}
            update={updateUsersList}
            updateSearch={updateUsersListExisting}
          />
        )}
      </Drawer>

      <Drawer
        onClose={toggleAddUser}
        open={addUserVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing User',
        })}
        width={700}
      >
        {addUserVisible && (
          <AddUserToBusiness
            businessId={businessId || ''}
            onClose={toggleAddUser}
            update={updateAddUsersToBusiness}
          />
        )}
      </Drawer>
      {/* todo */}
      <Drawer
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        width="600"
      >
        {addTodo ? (
          <AddTodo
            businessId={data?.business?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
            onClose={toggleAddTodo}
            update={updateTodoList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setCompleteTodoVisible(null)}
        open={completeTodoVisible !== null}
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        width={800}
      >
        {completeTodoVisible ? (
          <ViewTodo
            id={completeTodoVisible}
            onClose={() => setCompleteTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setViewTodoVisible(null)}
        open={!!viewTodoVisible}
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        width={800}
      >
        {viewTodoVisible ? (
          <ViewTodo
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* dem device */}
      <Drawer
        onClose={toggleAddDemDevice}
        open={addDemDevice}
        title={intl.formatMessage({
          defaultMessage: 'Add Dem Device',
        })}
        width="600"
      >
        {addDemDevice ? (
          <AddDemDevice
            businessId={data?.business?.id}
            onClose={toggleAddDemDevice}
            update={updateDemDeviceList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditDeviceData(undefined)}
        open={!!editDeviceData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Dem Device',
        })}
        width="600"
      >
        {editDeviceData ? (
          <AddDemDevice
            businessId={data?.business?.id}
            editData={editDeviceData}
            onClose={() => setEditDeviceData(undefined)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewBusiness;
