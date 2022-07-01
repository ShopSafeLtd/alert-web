import React from 'react';
import { UserQuery, UpdateUserMutation } from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import { RoleValues } from 'types';
import {
  SendOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import {
  Button,
  PageHeader,
  Tag,
  Card,
  Descriptions,
  Empty,
  Skeleton,
  Drawer,
} from 'antd';
import EditUser from 'components/form-components/user/EditUser';

interface Props {
  data: UserQuery | undefined;
  loading: boolean;
  editUser: boolean;
  toggleEditUser: () => void;
  // updateUserDetails: MutationUpdaterFn<UpdateUserMutation>;
}

const userDetail = ({
  data,
  loading,
  editUser,
  toggleEditUser,
}: // updateUserDetails,
Props) => {
  return (
    <div className="list-view">
      <PageHeader
        // ghost={false}
        onBack={() => window.history.back()}
        title={data?.user?.fullName}
        subTitle={data?.user?.disabled && 'User Disabled'}
        tags={<Tag color="red">{data?.user?.organisation}</Tag>}
        extra={[
          <Button
            key="3"
            type="primary"
            // disabled={isCurrent}
            // onClick={sendInvite}
            icon={<SendOutlined />}
          >
            Send Invite
          </Button>,
          data?.user?.disabled ? (
            <Button
              key="2"
              type="primary"
              // disabled={isCurrent}
              // onClick={enableUser}
              icon={<UnlockOutlined />}
            >
              Enable User
            </Button>
          ) : (
            <Button
              key="2"
              type="primary"
              // disabled={isCurrent}
              // onClick={disableUser}
              icon={<LockOutlined />}
            >
              Disable User
            </Button>
          ),
          <Button
            key="1"
            // disabled={isCurrent}
            // onClick={remove}
            type="primary"
            icon={<DeleteOutlined />}
          >
            Delete User
          </Button>,
        ]}
      />

      <Card>
        {loading ? (
          <Skeleton />
        ) : (
          <div>
            <Descriptions
              title="Details"
              // bordered={true}
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
                {!!data?.user?.schemes &&
                  RoleValues[data?.user?.schemes[0].role]}
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
              {!!data?.user?.groups && data?.user?.groups.length > 0 ? (
                <Descriptions.Item>
                  {data?.user?.groups
                    .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                    .toString()}
                </Descriptions.Item>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{
                    height: 20,
                  }}
                  description="Create Now"
                >
                  <Button icon={<UserAddOutlined />} onClick={toggleEditUser}>
                    Create
                  </Button>
                </Empty>
              )}
            </Descriptions>
            <Descriptions title="Chat Groups">
              {!!data?.user?.chats && data?.user?.chats.length > 0 ? (
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
                    imageStyle={{
                      height: 20,
                    }}
                    description="Create Now"
                  >
                    <Button icon={<UserAddOutlined />} onClick={toggleEditUser}>
                      Create
                    </Button>
                  </Empty>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
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
};

export default userDetail;
