import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/update-todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ListActionsQuery } from 'graphql/actions/queries/list-actions.generated';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';
import type { BusinessQuery } from 'graphql/businesses/queries/business.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';
import type { ListBusinessUsersQuery } from 'graphql/users/queries/list-business-users.generated';
import type { LocationData } from 'types/DataType';

import {
  faEdit,
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
import IncidentTable from 'components/tables/IncidentTable';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import LinkDem from '../../../../components/form-components/businesses/LinkDem';
import useStyles from './ViewBusiness.styles';

interface UserTable {
  groups: { id: string; name: string }[];
  key: string;
  lastLogin: string;
  name: string;
  status: string;
}

interface Props {
  actionsData: ListActionsQuery | undefined;
  addTodo: boolean;
  addUserVisible: boolean;
  businessId: string | undefined;
  completeTodoVisible: null | string;
  data: BusinessQuery | undefined;
  deleteConfirm: (value: string) => void;
  editVisible: boolean;
  inviteUserVisible: boolean;
  linkDemVisible: boolean;
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  onRemoveBusiness: (value: string) => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setViewTodoVisible: (value: null | string) => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddTodo: () => void;
  toggleAddUser: () => void;
  toggleEdit: () => void;
  toggleInviteUser: () => void;
  toggleLinkDem: () => void;
  updateAddUsersToBusiness: MutationUpdaterFn<AddUsersToBusinessMutation>;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateUsersListExisting: MutationUpdaterFn<InviteExistingUserMutation>;
  usersData: ListBusinessUsersQuery | undefined;
  usersLoading: boolean;
  viewTodoVisible: null | string;
}

const ViewBusiness = ({
  actionsData,
  addTodo,
  addUserVisible,
  businessId,
  completeTodoVisible,
  data,
  deleteConfirm,
  editVisible,
  inviteUserVisible,
  linkDemVisible,
  loading,
  onEditAddress,
  onRemoveBusiness,
  saving,
  setCompleteTodoVisible,
  setViewTodoVisible,
  templatesData,
  templatesLoading,
  toggleAddTodo,
  toggleAddUser,
  toggleEdit,
  toggleInviteUser,
  toggleLinkDem,
  updateAddUsersToBusiness,
  updateTodo,
  updateTodoList,
  updateUsersList,
  updateUsersListExisting,
  usersData,
  usersLoading,
  viewTodoVisible,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <BusinessSideList current={businessId} />
        </Col>
        <Col className={classes.content} flex={1}>
          <Row className={classes.headerBar} gutter={8} justify="end">
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
            </Col>
            <Col>
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
                        <Tag className={classes.tag} key={i}>
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
                    {data?.business?.tags && data?.business?.tags.length > 0 ? (
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
              </Descriptions>
            </Card>

            <LocatingCard
              height={194}
              location={data?.business?.locations[0]}
              setLocation={onEditAddress}
              width="100%"
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
                      <Typography.Text
                        type={value === 'Enabled' ? 'success' : 'warning'}
                      >
                        {value}
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
                      user.loginEvents && user.loginEvents.length > 0
                        ? moment(user.loginEvents[0]?.loginTime || '').format(
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
                hasNavigation
                incidents={data?.business?.incidents || []}
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
                    disabled={templatesLoading}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                    loading={templatesLoading}
                    onClick={toggleAddTodo}
                    size="small"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Activity',
                    })}
                  </Button>
                </Col>
              </Row>

              <ActivityTable
                saving={saving || loading}
                setCompleteTodoVisible={setCompleteTodoVisible}
                setViewTodoVisible={setViewTodoVisible}
                todos={data?.business?.todos}
              />
            </Card>
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
                            {moment(action.createdAt).format('HH:mm DD/MM/YY')}
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
    </div>
  );
};

export default ViewBusiness;
