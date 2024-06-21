import React from 'react';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMagnifyingGlass,
  faPaperPlane,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import BusinessSideList from 'components/businesses/BusinessSideList';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditBusiness from 'components/form-components/businesses/EditBusiness';
import AddUser from 'components/form-components/user/AddUser';
import AddUserToBusiness from 'components/form-components/user/AddUserToBusiness';
import type { MutationUpdaterFn } from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import AddTodo from 'components/form-components/Todos/AddTodo';
import ViewTodo from 'components/form-components/Todos/ViewTodo/Todo.container';
import ActivityTable from 'components/tables/ActivityTable';
import IncidentTable from 'components/tables/IncidentTable';
import LocatingCard from 'components/map/LocatingCard';
import type { LocationData } from 'types/DataType';
import useStyles from './ViewBusiness.styles';
import LinkDem from '../../../../components/form-components/businesses/LinkDem';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';
import type { BusinessQuery } from 'graphql/businesses/queries/business.generated';
import type { ListBusinessUsersQuery } from 'graphql/users/queries/list-business-users.generated';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';
import type { ListActionsQuery } from 'graphql/actions/queries/list-actions.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/update-todo.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';

interface UserTable {
  key: string;
  name: string;
  status: string;
  lastLogin: string;
  groups: { id: string; name: string }[];
}

interface Props {
  data: BusinessQuery | undefined;
  loading: boolean;
  businessId: string | undefined;
  editVisible: boolean;
  toggleEdit: () => void;
  inviteUserVisible: boolean;
  toggleInviteUser: () => void;
  addUserVisible: boolean;
  toggleAddUser: () => void;
  usersData: ListBusinessUsersQuery | undefined;
  usersLoading: boolean;
  updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateUsersListExisting: MutationUpdaterFn<InviteExistingUserMutation>;
  updateAddUsersToBusiness: MutationUpdaterFn<AddUsersToBusinessMutation>;
  actionsData: ListActionsQuery | undefined;
  onRemoveBusiness: (value: string) => void;
  toggleLinkDem: () => void;
  linkDemVisible: boolean;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  viewTodoVisible: string | null;
  setViewTodoVisible: (value: string | null) => void;
  completeTodoVisible: string | null;
  setCompleteTodoVisible: (value: string | null) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  onEditAddress: (value: LocationData) => void;
}

const ViewBusiness = ({
  data,
  loading,
  businessId,
  editVisible,
  toggleEdit,
  toggleLinkDem,
  inviteUserVisible,
  toggleInviteUser,
  usersLoading,
  usersData,
  updateUsersList,
  updateUsersListExisting,
  addUserVisible,
  toggleAddUser,
  updateAddUsersToBusiness,
  actionsData,
  onRemoveBusiness,
  linkDemVisible,
  saving,
  deleteConfirm,
  addTodo,
  toggleAddTodo,
  templatesData,
  templatesLoading,
  setViewTodoVisible,
  setCompleteTodoVisible,
  completeTodoVisible,
  viewTodoVisible,
  updateTodo,
  updateTodoList,
  onEditAddress,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <BusinessSideList current={businessId} />
        </Col>
        <Col flex={1} className={classes.content}>
          <Row gutter={8} className={classes.headerBar} justify="end">
            <Col>
              <Button
                // disabled={!!data?.business?.demId}
                disabled
                onClick={toggleLinkDem}
                type="ghost"
              >
                {intl.formatMessage({
                  defaultMessage: 'Link to DEM',
                })}
              </Button>
            </Col>
            <Col>
              <Button type="ghost" onClick={toggleEdit}>
                <FontAwesomeIcon
                  size="1x"
                  style={{ marginRight: 8 }}
                  icon={faEdit}
                />
                {intl.formatMessage({
                  defaultMessage: 'Edit Business',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                type="ghost"
                onClick={() => deleteConfirm(data?.business?.id || '')}
              >
                <FontAwesomeIcon
                  size="1x"
                  style={{ marginRight: 8 }}
                  icon={faTrash}
                />
                {intl.formatMessage({
                  defaultMessage: 'Delete',
                })}
              </Button>
            </Col>
          </Row>
          <div className={classes.details}>
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
                {/* <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Name',
                  id: 'LxDnoc',
                })}
                style={{ paddingBottom: 8 }}
              >
                {data?.business.}
              </Descriptions.Item> */}
                {data?.business?.parent?.name && (
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Parent',
                    })}
                  >
                    <Link
                      to={`/app/scheme-settings/businesses/view/${
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
                    defaultMessage: 'Brands',
                  })}
                >
                  <Row>
                    {data?.business?.brands &&
                    data?.business?.brands.length > 0 ? (
                      data?.business?.brands.map((el, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Tag key={i} className={classes.tag}>
                          {el}
                        </Tag>
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
                      data?.business?.groups.map(({ name, id }) => (
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
                    {data?.business?.tags && data?.business?.tags.length > 0 ? (
                      data?.business?.tags.map(({ name, id }) => (
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
              </Descriptions>
            </Card>

            <LocatingCard
              width="100%"
              height={194}
              location={data?.business?.locations[0]}
              setLocation={onEditAddress}
            />
            <Card>
              <Row align="middle" className={classes.cardHeader}>
                <Col flex={1}>
                  <Typography.Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Users',
                    })}
                  </Typography.Title>
                </Col>
                <Col>
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Add Existing',
                            }),
                            key: '1',
                            onClick: toggleAddUser,
                            icon: (
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ marginRight: 5 }}
                              />
                            ),
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Invite New User',
                            }),
                            key: '2',
                            onClick: toggleInviteUser,
                            icon: (
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                style={{ marginRight: 5 }}
                              />
                            ),
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
                        defaultMessage: 'Add User',
                      })}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

              <Table<UserTable>
                columns={[
                  {
                    key: 'name',
                    dataIndex: 'name',
                    title: intl.formatMessage({
                      defaultMessage: 'Name',
                    }),
                    render: (value, item) => (
                      <Link to={`/app/scheme-settings/users/view/${item.key}`}>
                        {value}
                      </Link>
                    ),
                  },
                  {
                    key: 'status',
                    dataIndex: 'status',
                    title: intl.formatMessage({
                      defaultMessage: 'Status',
                    }),
                    render: (value) => (
                      <Typography.Text
                        type={value === 'Enabled' ? 'success' : 'warning'}
                      >
                        {value}
                      </Typography.Text>
                    ),
                  },
                  {
                    key: 'lastLogin',
                    dataIndex: 'lastLogin',
                    title: intl.formatMessage({
                      defaultMessage: 'Last Login',
                    }),
                  },
                  {
                    key: 'groups',
                    dataIndex: 'groups',
                    title: intl.formatMessage({
                      defaultMessage: 'Groups',
                    }),
                    render: (values: { id: string; name: string }[]) =>
                      values.map((group) => (
                        <Tag key={group.id}>{group.name}</Tag>
                      )),
                  },
                  {
                    key: 'actions',
                    dataIndex: 'actions',
                    render: (_, item) => (
                      <Popconfirm
                        title={intl.formatMessage({
                          defaultMessage: 'Are you sure?',
                        })}
                        onConfirm={() => onRemoveBusiness(item.key)}
                        overlayInnerStyle={{ padding: 10 }}
                      >
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove From Business',
                          })}
                        >
                          <Button
                            type="text"
                            style={{ padding: '0px 8px' }}
                            size="small"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    ),
                  },
                ]}
                loading={usersLoading}
                dataSource={
                  usersData?.users.map((user) => ({
                    groups: user.groups,
                    key: user.id,
                    lastLogin:
                      user.loginEvents && user.loginEvents.length > 0
                        ? moment(user.loginEvents[0]?.loginTime || '').format(
                            'HH:mm DD/MM/YY'
                          )
                        : 'No LogIn Data',
                    name: user.fullName,
                    status: user.status || 'Unknown',
                  })) || []
                }
                pagination={{
                  hideOnSinglePage: true,
                  pageSize: 10,
                }}
                size="small"
              />
            </Card>
            <Card>
              <Typography.Title level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
              </Typography.Title>
              <IncidentTable
                incidents={data?.business?.incidents || []}
                hasNavigation
              />
            </Card>

            <Card loading={loading}>
              <Row align="middle" className={classes.cardHeader}>
                <Col flex={1}>
                  <Typography.Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Activities',
                    })}
                  </Typography.Title>
                </Col>
                <Col>
                  <Button
                    size="small"
                    onClick={toggleAddTodo}
                    loading={templatesLoading}
                    disabled={templatesLoading}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Activity',
                    })}
                  </Button>
                </Col>
              </Row>

              <ActivityTable
                todos={data?.business?.todos}
                saving={saving || loading}
                setViewTodoVisible={setViewTodoVisible}
                setCompleteTodoVisible={setCompleteTodoVisible}
              />
            </Card>
          </div>
        </Col>
        {actionsData?.listActions.actions &&
        actionsData?.listActions.actions.length > 0 ? (
          <Col span={6} className={classes.updatesContainer}>
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
                            type="secondary"
                            style={{ fontSize: 12, marginBottom: 0 }}
                          >
                            {moment(action.createdAt).format('HH:mm DD/MM/YY')}
                          </Typography.Paragraph>
                        </Col>
                        <Col>
                          <Typography.Paragraph
                            type="secondary"
                            style={{ fontSize: 12, marginBottom: 0 }}
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
        title={intl.formatMessage({
          defaultMessage: 'Edit Business',
        })}
        open={editVisible}
        onClose={toggleEdit}
        width={500}
      >
        {editVisible && (
          <EditBusiness businessId={businessId} onClose={toggleEdit} />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Link DEM',
        })}
        open={linkDemVisible}
        onClose={toggleLinkDem}
        width={500}
      >
        {linkDemVisible && (
          <LinkDem businessId={businessId || ''} onClose={toggleLinkDem} />
        )}
      </Drawer>
      <Drawer
        open={inviteUserVisible}
        onClose={toggleInviteUser}
        width={700}
        title={intl.formatMessage({
          defaultMessage: 'Invite Existing User',
        })}
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
        open={addUserVisible}
        onClose={toggleAddUser}
        width={700}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing User',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        open={addTodo}
        width="600"
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo
            update={updateTodoList}
            onClose={toggleAddTodo}
            businessId={data?.business?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        open={completeTodoVisible !== null}
        width={800}
        onClose={() => setCompleteTodoVisible(null)}
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
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        open={!!viewTodoVisible}
        width={800}
        onClose={() => setViewTodoVisible(null)}
      >
        {viewTodoVisible ? (
          <ViewTodo
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewBusiness;
