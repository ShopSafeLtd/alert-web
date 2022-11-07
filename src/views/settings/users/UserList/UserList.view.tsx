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
import {
  ListSchemeUsersQuery,
  SchemeGroupsQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddUser from 'components/form-components/user/AddUser';
import { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

interface Props {
  data: ListSchemeUsersQuery | undefined;
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
        defaultPageSize: 20,
        pageSize: 20,
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
          key: 'organisation',
          title: 'Organisation',
          dataIndex: 'organisation',
        },
        {
          key: 'groups',
          title: 'Groups',
          dataIndex: 'groups',
        },
      ]}
      dataSource={data?.users.map((user) => ({
        key: user.id,
        name: user.fullName,
        emailAddress: user.email,
        organisation: user.organisation,
        groups: user.groups
          .map((group, index) => (index === 0 ? group.name : ` ${group.name}`))
          .toString(),
        status: user.status,
      }))}
    />

    <Drawer
      title="Invite New User"
      visible={addUser}
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
  </div>
);

export default UserList;
