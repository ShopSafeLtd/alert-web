import React from 'react';
import {
  Table,
  Row,
  Col,
  Input,
  Typography,
  Select,
  Drawer,
  Button,
} from 'antd';
import type {
  ListUsersQuery,
  SchemeGroupsQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddUser from 'components/form-components/user/AddUser';
import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/pro-light-svg-icons';
import EditUser from 'components/form-components/user/EditUser';

interface Props {
  data: ListUsersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groupsData: SchemeGroupsQuery | undefined;
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
}

const UserList = ({
  data,
  loading,
  search,
  setSearch,
  groupsData,
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
}: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a user..."
          allowClear
        />
      </Col>
      <Col>
        <Select
          loading={groupsLoading}
          style={{ minWidth: 250 }}
          allowClear
          mode="multiple"
          value={selectedGroups}
          onChange={setSelectedGroups}
          placeholder="Filter Groups"
          options={groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          }))}
          optionFilterProp="label"
          optionLabelProp="label"
        />
      </Col>
      <Col flex={1} />
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
          Invite New User
        </Button>
      </Col>
    </Row>
    <Table
      size="small"
      loading={loading}
      pagination={{
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
          title: 'Name',
          dataIndex: 'name',
          render: (value, record) => (
            <Link to={`/app/scheme-settings/users/view/${record.key}`}>
              {value}
            </Link>
          ),
        },
        {
          key: 'status',
          title: 'Status',
          dataIndex: 'status',
          render: (value) => (
            <Typography.Text type={value === 'Enabled' ? 'success' : 'warning'}>
              {value}
            </Typography.Text>
          ),
        },
        {
          key: 'emailAddress',
          title: 'Email Address',
          dataIndex: 'emailAddress',
        },
        {
          key: 'business',
          title: 'Business',
          dataIndex: 'business',
          render: (value, record) => (
            <Link
              to={`/app/scheme-settings/businesses/view/${record.businessId}`}
            >
              {value}
            </Link>
          ),
        },
        {
          key: 'groups',
          title: 'Groups',
          dataIndex: 'groups',
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
        business: user.businesses.length > 0 ? user.businesses[0].name : '',
        businessId: user.businesses.length > 0 ? user.businesses[0].id : '',
        groups: user.groups
          .map((group, index) => (index === 0 ? group.name : ` ${group.name}`))
          .toString(),
        status: user.status,
      }))}
    />

    <Drawer
      title="Invite New User"
      open={addUser}
      width="800"
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
      title="Edit User"
      open={editUser !== undefined}
      width="800"
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

export default UserList;
