import type { UserListQuery } from '#/views/settings/users/UserList/__generated__/UserList.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { Role } from 'graphql/types';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';
import type { UserSort } from 'types/enums/user_sort';

import { faEdit, faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table, Tag, Typography } from 'antd';
import AddUser from 'components/form-components/user/AddUser';
import EditUser from 'components/form-components/user/EditUser';
import UserFilter from 'components/users/UserFilter';
import { UserStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { GetUserStatusValues, userStatusValues } from 'types/enums/user_status';

interface Props {
  addUser: boolean;
  clearFilters: () => void;
  currentPage: number;
  currentPageSize: number;
  data: UserListQuery | undefined;
  editUser: string | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  order: UserSort;
  search: string;
  selectedGroups: string[];
  setOrder: (value: UserSort) => void;
  setSearch: (value: string) => void;
  setSelectedGroups: (value: string[]) => void;
  setUserRole: (value: Role) => void;
  setUserStatus: (value: UserStatus[]) => void;
  sortFilter: boolean;
  toggleAddUser: () => void;
  toggleEditUser: (value?: string | undefined) => void;
  toggleSortFilter: () => void;
  updateExitingUserList: MutationUpdaterFn<InviteExistingUserMutation>;
  updateUserList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  userRole: Role | undefined;
  userStatus: UserStatus[] | undefined;
}
const getTextStatus = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'success';
  if (value === UserStatus.Invited) return 'warning';
  if (value === UserStatus.Disabled) return 'danger';
  return 'secondary';
};
const UserList = ({
  addUser,
  clearFilters,
  currentPage,
  currentPageSize,
  data,
  editUser,
  groups,
  groupsLoading,
  loading,
  onPaginationChange,
  order,
  search,
  selectedGroups,
  setOrder,
  setSearch,
  setSelectedGroups,
  setUserRole,
  setUserStatus,
  sortFilter,
  toggleAddUser,
  toggleEditUser,
  toggleSortFilter,
  updateExitingUserList,
  updateUserList,
  userRole,
  userStatus,
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
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a user...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleSortFilter}
          >
            <FormattedMessage defaultMessage="Sort & filter" />
          </Button>
        </Col>

        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddUser}
            type="primary"
          >
            <FormattedMessage defaultMessage="Invite New User" />
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
              <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                {value}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },
          {
            dataIndex: 'status',
            filters: userStatusValues.map((el) => ({
              text: el.label,
              value: el.value,
            })),
            key: 'status',
            // @ts-ignore
            onFilter: (value: UserStatus, record: { status: UserStatus }) =>
              record.status.includes(value),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (value: UserStatus) => (
              <Typography.Text type={getTextStatus(value)}>
                {GetUserStatusValues[value]}
              </Typography.Text>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Status',
            }),
          },
          {
            dataIndex: 'emailAddress',
            key: 'emailAddress',
            title: intl.formatMessage({
              defaultMessage: 'Email Address',
            }),
          },
          {
            dataIndex: 'business',
            filters: businessFilter,
            key: 'business',
            // @ts-ignore
            onFilter: (
              value: boolean | number | string,
              record: { businesses: { id: string; name: string }[] }
            ) => record.businesses.some(({ id }) => id === value),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (_, record) =>
              record.businesses.map(({ id, name }) => (
                <Link
                  key={id}
                  to={`/app/scheme-settings/businesses/view/${id}`}
                >
                  <Tag color="red">{name}</Tag>
                </Link>
              )),
            title: intl.formatMessage({
              defaultMessage: 'Business',
            }),
          },
          {
            dataIndex: 'groups',
            filters: groupFilter,
            key: 'groups',
            // @ts-ignore
            onFilter: (
              value: boolean | number | string,
              record: { groups: { id: string; name: string }[] }
            ) => record.groups.some(({ id }) => id === value),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (value: { id: string; name: string }[]) => (
              <Typography.Text>
                {value
                  .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                  .toString()}
              </Typography.Text>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Groups',
            }),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <Button
                onClick={() => toggleEditUser(record.key)}
                size="small"
                type="text"
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </Button>
            ),
            title: '',
            width: 50,
          },
        ]}
        dataSource={data?.listUsers.users.map((user) => ({
          businesses: user.businesses.map((el) => ({
            id: el.id,
            name: el.name,
          })),
          emailAddress: user.email,
          groups: user.groups,
          key: user.id,
          name: user.fullName,
          status: user.status || UserStatus.Inactive,
        }))}
        loading={loading}
        pagination={{
          current: currentPage,
          defaultPageSize: 50,
          hideOnSinglePage: true,
          onChange: onPaginationChange,
          pageSize: currentPageSize,
          showSizeChanger: true,
          showTotal: (total) => `Total Users: ${total}`,
          total: data?.listUsers.total,
        }}
        size="small"
      />
      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'User Filters',
        })}
        width={400}
      >
        <UserFilter
          clearFilters={clearFilters}
          groups={groups}
          groupsFilter={selectedGroups}
          groupsLoading={groupsLoading}
          order={order}
          setGroupsFilter={setSelectedGroups}
          setOrder={setOrder}
          setUserRole={setUserRole}
          setUserStatus={setUserStatus}
          userRole={userRole}
          userStatus={userStatus}
        />
      </Drawer>
      <Drawer
        onClose={toggleAddUser}
        open={addUser}
        title={intl.formatMessage({
          defaultMessage: 'Invite New User',
        })}
        width="600"
      >
        {addUser ? (
          <AddUser
            onClose={toggleAddUser}
            update={updateUserList}
            updateSearch={updateExitingUserList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => toggleEditUser()}
        open={editUser !== undefined}
        title={intl.formatMessage({
          defaultMessage: 'Edit User',
        })}
        width="600"
      >
        {editUser ? (
          <EditUser id={editUser} onClose={() => toggleEditUser()} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default UserList;
