import React from 'react';
import { UserQuery } from 'graphql/generated';
import { RoleValues } from 'types';
import {
  SendOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import {
  Button,
  PageHeader,
  Tag,
  Card,
  Descriptions,
  Empty,
  Drawer,
} from 'antd';
import EditUser from 'components/form-components/user/EditUser';

interface Props {
  data: UserQuery | undefined;
  loading: boolean;
  editUser: boolean;
  saving: boolean;
  toggleEditUser: () => void;
  inviteConfirm: () => void;
  enableConfirm: () => void;
  disableConfirm: () => void;
  deleteConfirm: () => void;
}

const userDetail = ({
  data,
  loading,
  editUser,
  toggleEditUser,
  saving,
  inviteConfirm,
  deleteConfirm,
  enableConfirm,
  disableConfirm,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={data?.user?.fullName}
      subTitle={data?.user?.disabled && 'User Disabled'}
      tags={<Tag color="red">{data?.user?.organisation}</Tag>}
      extra={[
        <Button
          key="3"
          type="primary"
          disabled={saving}
          onClick={inviteConfirm}
          icon={<SendOutlined />}
        >
          Send Invite
        </Button>,
        data?.user?.disabled ? (
          <Button
            type="primary"
            disabled={saving}
            onClick={enableConfirm}
            icon={<UnlockOutlined />}
          >
            Enable User
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={saving}
            onClick={disableConfirm}
            icon={<LockOutlined />}
          >
            Disable User
          </Button>
        ),
        <Button
          key="1"
          disabled={saving}
          onClick={deleteConfirm}
          type="primary"
          icon={<DeleteOutlined />}
        >
          Delete User
        </Button>,
      ]}
    />

    <Card loading={loading}>
      <div>
        <Descriptions
          title="Details"
          extra={
            <Button icon={<EditOutlined />} onClick={toggleEditUser}>
              Edit Details
            </Button>
          }
        >
          <Descriptions.Item label="Full Name">
            {data?.user?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Organisation">
            {data?.user?.organisation}
          </Descriptions.Item>
          <Descriptions.Item label="Email Address">
            {data?.user?.email}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            {data?.user?.schemes && RoleValues[data?.user?.schemes[0].role]}
          </Descriptions.Item>
          {data?.user?.addresses && data.user.addresses.length > 0 && (
            <Descriptions.Item label="Address">
              {data?.user?.addresses[0].building &&
                `${data?.user?.addresses[0].building}, `}
              {data?.user?.addresses[0].street &&
                `${data?.user?.addresses[0].street}, `}
              {data?.user?.addresses[0].townCity &&
                `${data?.user?.addresses[0].townCity}, `}
              {data?.user?.addresses[0].county &&
                `${data?.user?.addresses[0].county}, `}
              {data?.user?.addresses[0].postcode &&
                `${data?.user?.addresses[0].postcode}`}
            </Descriptions.Item>
          )}
        </Descriptions>
        <Descriptions title="Groups">
          {data?.user?.groups && data?.user?.groups.length > 0 ? (
            <Descriptions.Item>
              {data?.user?.groups
                .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                .toString()}
            </Descriptions.Item>
          ) : (
            <Descriptions.Item>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: -2, marginLeft: 5 }}
                description="No Data"
              />
            </Descriptions.Item>
          )}
        </Descriptions>
        <Descriptions title="Chat Groups">
          {data?.user?.chats && data?.user?.chats.length > 0 ? (
            <Descriptions.Item>
              {data?.user?.chats
                .map(({ chat }) => chat)
                .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                .toString()}
            </Descriptions.Item>
          ) : (
            <Descriptions.Item>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: -5, marginLeft: 10 }}
                description="No Data"
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>

      <Drawer
        title="Edit User Details"
        visible={editUser}
        width="800"
        onClose={toggleEditUser}
      >
        {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
      </Drawer>
    </Card>
  </div>
);

export default userDetail;
