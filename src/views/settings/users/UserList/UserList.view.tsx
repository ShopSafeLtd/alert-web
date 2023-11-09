import React from 'react';
import { Button, Col, Drawer, Input, Row, Table, Tag, Typography } from 'antd';
import { UserStatus } from 'graphql/generated';
import type {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
  UserListQuery,
  Role,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddUser from 'components/form-components/user/AddUser';
import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import EditUser from 'components/form-components/user/EditUser';
import type { UserSort } from 'types/enums/user_sort';
import UserFilter from 'components/users/UserFilter';
import { FormattedMessage, useIntl } from 'react-intl';
import { GetUserStatusValues, userStatusValues } from 'types/enums/user_status';

interface Props {
  data: UserListQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  selectedGroups: string[];
  setSelectedGroups: (value: string[]) => void;
  addUser: boolean;
  toggleAddUser: () => void;
  updateUserList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateExitingUserList: MutationUpdaterFn<InviteExistingUserMutation>;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  toggleEditUser: (value?: string | undefined) => void;
  editUser: string | undefined;
  userStatus: UserStatus[] | undefined;
  setUserStatus: (value: UserStatus[]) => void;
  userRole: Role | undefined;
  setUserRole: (value: Role) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  order: UserSort;
  setOrder: (value: UserSort) => void;
  clearFilters: () => void;
}
const getTextStatus = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'success';
  if (value === UserStatus.Invited) return 'warning';
  if (value === UserStatus.Disabled) return 'danger';
  return 'secondary';
};
const UserList = ({
  data,
  loading,
  search,
  setSearch,
  groups,
  groupsLoading,
  selectedGroups,
  setSelectedGroups,
  addUser,
  toggleAddUser,
  updateUserList,
  updateExitingUserList,
  onPaginationChange,
  currentPage,
  currentPageSize,
  editUser,
  toggleEditUser,
  userStatus,
  setUserStatus,
  userRole,
  setUserRole,
  order,
  setOrder,
  sortFilter,
  toggleSortFilter,
  clearFilters,
}: Props): JSX.Element => {
  const intl = useIntl();
  const groupIds = new Set(
    data?.listUsers.users?.flatMap((el) => el.groups.map(({ id }) => id))
  );
  const groupData = data?.listUsers.users?.flatMap((el) => el.groups);
  const groupFilter = [...groupIds]
    .map((id) => groupData?.find((el) => el.id === id))
    .map((el) => ({ text: el?.name || '', value: el?.id || '' }));
  const businessIds = new Set(
    data?.listUsers.users?.flatMap((el) => el.businesses.map(({ id }) => id))
  );
  const businessData = data?.listUsers.users?.flatMap((el) => el.businesses);
  const businessFilter = [...businessIds]
    .map((id) => businessData?.find((el) => el.id === id))
    .map((el) => ({ text: el?.name || '', value: el?.id || '' }));
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a user...',
              id: 'jNlSdL',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            onClick={toggleSortFilter}
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Sort & filter" id="ndDyqZ" />
          </Button>
        </Col>

        <Col>
          <Button
            type="primary"
            onClick={toggleAddUser}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Invite New User" id="EbeHm3" />
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 50,
          pageSize: currentPageSize,
          showSizeChanger: true,
          current: currentPage,
          onChange: onPaginationChange,
          total: data?.listUsers.total,
          showTotal: (total) => `Total Users: ${total}`,
        }}
        columns={[
          {
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            dataIndex: 'name',
            render: (value, record) => (
              <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                {value}
              </Link>
            ),
          },
          {
            key: 'status',
            title: intl.formatMessage({
              defaultMessage: 'Status',
              id: 'tzMNF3',
            }),
            dataIndex: 'status',
            filters: userStatusValues.map((el) => ({
              text: el.label,
              value: el.value,
            })),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onFilter: (value: UserStatus, record: { status: UserStatus }) =>
              record.status.includes(value),
            render: (value: UserStatus) => (
              <Typography.Text type={getTextStatus(value)}>
                {GetUserStatusValues[value]}
              </Typography.Text>
            ),
          },
          {
            key: 'emailAddress',
            title: intl.formatMessage({
              defaultMessage: 'Email Address',
              id: 'xxQxLE',
            }),
            dataIndex: 'emailAddress',
          },
          {
            key: 'business',
            title: intl.formatMessage({
              defaultMessage: 'Business',
              id: 'w1Fanr',
            }),
            dataIndex: 'business',
            filters: businessFilter,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onFilter: (
              value: string | number | boolean,
              record: { businesses: { id: string; name: string }[] }
            ) => record.businesses.some(({ id }) => id === value),
            render: (_, record) =>
              record.businesses.map(({ id, name }) => (
                <Link to={`/app/scheme-settings/businesses/view/${id}`}>
                  <Tag color="red">{name}</Tag>
                </Link>
              )),
          },
          {
            key: 'groups',
            title: intl.formatMessage({
              defaultMessage: 'Groups',
              id: 'hzmswI',
            }),
            dataIndex: 'groups',
            filters: groupFilter,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onFilter: (
              value: string | number | boolean,
              record: { groups: { id: string; name: string }[] }
            ) => record.groups.some(({ id }) => id === value),
            render: (value: { id: string; name: string }[]) => (
              <Typography.Text>
                {value
                  .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                  .toString()}
              </Typography.Text>
            ),
          },
          {
            key: 'actions',
            title: '',
            dataIndex: 'actions',
            width: 50,
            render: (_, record) => (
              <Button
                size="small"
                type="text"
                onClick={() => toggleEditUser(record.key)}
              >
                <FontAwesomeIcon size="lg" icon={faEdit} />
              </Button>
            ),
          },
        ]}
        dataSource={data?.listUsers.users.map((user) => ({
          key: user.id,
          name: user.fullName,
          emailAddress: user.email,
          businesses: user.businesses.map((el) => ({
            name: el.name,
            id: el.id,
          })),
          groups: user.groups,
          status: user.status || UserStatus.Inactive,
        }))}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'User Filters',
          id: 'cmwbt4',
        })}
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={400}
      >
        <UserFilter
          clearFilters={clearFilters}
          order={order}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          groupsFilter={selectedGroups}
          setGroupsFilter={setSelectedGroups}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Invite New User',
          id: 'EbeHm3',
        })}
        open={addUser}
        width="600"
        onClose={toggleAddUser}
      >
        {addUser ? (
          <AddUser
            update={updateUserList}
            updateSearch={updateExitingUserList}
            onClose={toggleAddUser}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit User',
          id: 'tT2D9t',
        })}
        open={editUser !== undefined}
        width="600"
        onClose={() => toggleEditUser()}
      >
        {editUser ? (
          <EditUser onClose={() => toggleEditUser()} id={editUser} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default UserList;
