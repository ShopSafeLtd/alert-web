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
  PageHeader,
  Popconfirm,
  Row,
  Skeleton,
  Table,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from 'antd';
import type {
  AddUsersToBusinessMutation,
  BusinessQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
  ListActionsQuery,
  ListBusinessUsersQuery,
} from 'graphql/generated';
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
import useStyles from './ViewBusiness.styles';
import LinkDem from '../../../../components/form-components/businesses/LinkDem';

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
}: Props) => {
  const classNames = useStyles();
  return (
    <div className={classNames.page}>
      <Row wrap={false} style={{ height: '100vh', display: 'hidden' }}>
        <Col>
          <BusinessSideList current={businessId} />
        </Col>
        <Col flex={1} className={classNames.content}>
          <PageHeader
            onBack={() => window.history.back()}
            title={data?.business?.name}
            extra={[
              <Button
                key="5"
                // disabled={!!data?.business?.demId}
                disabled
                onClick={toggleLinkDem}
              >
                Link to DEM
              </Button>,
              <Button
                key="4"
                icon={
                  <FontAwesomeIcon
                    style={{ marginRight: 5 }}
                    size="lg"
                    icon={faEdit}
                  />
                }
                onClick={toggleEdit}
              >
                Edit Business
              </Button>,
            ]}
          />

          <Row gutter={16} className={classNames.details}>
            <Col span={16} xxl={12} className={classNames.detailCol}>
              <Card>
                <Typography.Title level={4}>Details</Typography.Title>
                <Descriptions column={1}>
                  <Descriptions.Item
                    style={{ paddingBottom: 5 }}
                    label="Location"
                  >
                    {loading ? (
                      <Skeleton.Input style={{ height: 20 }} />
                    ) : (
                      data?.business?.locations[0]?.full || 'None'
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Parent">
                    <Link
                      to={`/app/scheme-settings/businesses/view/${data?.business?.parent?.id}`}
                    >
                      {loading ? (
                        <Skeleton.Input style={{ height: 20 }} />
                      ) : (
                        data?.business?.parent?.name || 'None'
                      )}
                    </Link>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card>
                <Row align="middle" className={classNames.cardHeader}>
                  <Col flex={1}>
                    <Typography.Title level={4}>Users</Typography.Title>
                  </Col>
                  <Col>
                    <Dropdown
                      overlay={
                        <Menu
                          items={[
                            {
                              label: 'Add Existing',
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
                              label: 'Invite New',
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
                        Add User
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
                <Table<UserTable>
                  columns={[
                    {
                      key: 'name',
                      dataIndex: 'name',
                      title: 'Name',
                      render: (value, item) => (
                        <Link
                          to={`/app/scheme-settings/users/view/${item.key}`}
                        >
                          {value}
                        </Link>
                      ),
                    },
                    {
                      key: 'status',
                      dataIndex: 'status',
                      title: 'Status',
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
                      title: 'Last Login',
                    },
                    {
                      key: 'groups',
                      dataIndex: 'groups',
                      title: 'Groups',
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
                          title="Are you sure?"
                          onConfirm={() => onRemoveBusiness(item.key)}
                          overlayInnerStyle={{ padding: 10 }}
                        >
                          <Tooltip title="Remove from business">
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
                  size="small"
                />
              </Card>
            </Col>
            <Col span={8} xxl={12} className={classNames.detailCol}>
              <Card>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>
                  Recent Activity
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
                              {moment(action.createdAt).format(
                                'HH:mm DD/MM/YY'
                              )}
                            </Typography.Paragraph>
                          </Col>
                          <Col>
                            <Typography.Paragraph
                              type="secondary"
                              style={{ fontSize: 12, marginBottom: 0 }}
                            >
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
                    description="No Activity"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="Edit Business"
        open={editVisible}
        onClose={toggleEdit}
        width={500}
      >
        {editVisible && (
          <EditBusiness businessId={businessId} onClose={toggleEdit} />
        )}
      </Drawer>

      <Drawer
        title="Link to DEM"
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
        title="Invite New User"
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
        title="Add Existing Users"
      >
        {addUserVisible && (
          <AddUserToBusiness
            businessId={businessId || ''}
            onClose={toggleAddUser}
            update={updateAddUsersToBusiness}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ViewBusiness;
