import React from 'react';
import { UserQuery } from 'graphql/generated';
import { RoleValues } from 'types';

import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Empty,
  PageHeader,
  Row,
  Tag,
  Typography,
} from 'antd';
import EditUser from 'components/form-components/user/EditUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLockKeyhole,
  faPaperPlaneTop,
  faPenToSquare,
  faTrash,
  faUnlockKeyhole,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import LinkDem from '../../../../components/form-components/user/LinkDem';

interface Props {
  data: UserQuery | undefined;
  loading: boolean;
  editUser: boolean;
  saving: boolean;
  demLink: boolean;
  demId: string | null | undefined;
  toggleEditUser: () => void;
  inviteConfirm: () => void;
  enableConfirm: () => void;
  disableConfirm: () => void;
  deleteConfirm: () => void;
  toggleDemLink: () => void;
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
  demLink,
  toggleDemLink,
  demId,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={data?.user?.fullName}
      subTitle={data?.user?.disabled && 'User Disabled'}
      extra={[
        <Button
          key="3"
          disabled={saving || !!data?.user?.demId || !demId}
          onClick={toggleDemLink}
        >
          Link Dem User
        </Button>,
        <Button
          key="4"
          disabled={saving}
          onClick={inviteConfirm}
          icon={
            <FontAwesomeIcon
              style={{ marginRight: 5 }}
              size="lg"
              icon={faPaperPlaneTop}
            />
          }
        >
          Resend Invite
        </Button>,
        data?.user?.disabled ? (
          <Button
            key="3"
            disabled={saving}
            onClick={enableConfirm}
            icon={
              <FontAwesomeIcon
                style={{ marginRight: 5 }}
                size="lg"
                icon={faUnlockKeyhole}
              />
            }
          >
            Enable User
          </Button>
        ) : (
          <Button
            key="2"
            disabled={saving}
            onClick={disableConfirm}
            icon={
              <FontAwesomeIcon
                style={{ marginRight: 5 }}
                size="lg"
                icon={faLockKeyhole}
              />
            }
          >
            Disable User
          </Button>
        ),
        <Button
          key="1"
          disabled={saving}
          onClick={deleteConfirm}
          icon={
            <FontAwesomeIcon
              size="lg"
              style={{ marginRight: 5 }}
              icon={faTrash}
            />
          }
        >
          Delete User
        </Button>,
      ]}
    />

    <Row gutter={16}>
      <Col span={16} xxl={12}>
        <Card loading={loading}>
          <Descriptions
            title="Details"
            column={1}
            extra={
              <Button
                icon={
                  <FontAwesomeIcon
                    style={{ marginRight: 5 }}
                    size="lg"
                    icon={faPenToSquare}
                  />
                }
                onClick={toggleEditUser}
              >
                Edit Details
              </Button>
            }
          >
            <Descriptions.Item label="Full Name" style={{ paddingBottom: 8 }}>
              {data?.user?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Status" style={{ paddingBottom: 8 }}>
              <Typography.Text
                type={data?.user?.status === 'Enabled' ? 'success' : 'warning'}
              >
                {data?.user?.status}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Business" style={{ paddingBottom: 8 }}>
              <Link
                to={`/app/scheme-settings/businesses/view/${data?.user?.businesses[0]?.id}`}
              >
                {data?.user?.businesses[0]?.name}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item
              label="Email Address"
              style={{ paddingBottom: 8 }}
            >
              {data?.user?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Role" style={{ paddingBottom: 8 }}>
              {data?.user?.schemes && RoleValues[data?.user?.schemes[0].role]}
            </Descriptions.Item>
            <Descriptions.Item label="Groups">
              <Row gutter={[0, 8]}>
                {data?.user?.groups.map(({ name, id }) => (
                  <Col key={id}>
                    <Tag color="blue">{name}</Tag>
                  </Col>
                )) || 'No Groups'}
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="Chat Groups">
              <Row gutter={[0, 8]}>
                {data?.user?.chats
                  .map(({ chat }) => chat)
                  .map(({ name, id }) => (
                    <Col key={id}>
                      <Tag color="blue">{name}</Tag>
                    </Col>
                  )) || 'No Chat Groups'}
              </Row>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={8} xxl={12}>
        <Card>
          <Typography.Title level={4}>Recent Activity</Typography.Title>
          <Empty
            description="No Activity"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      </Col>
    </Row>
    <Drawer
      title="Edit User Details"
      visible={editUser}
      width="800"
      onClose={toggleEditUser}
    >
      {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
    </Drawer>
    <Drawer
      title="Link to dem user"
      visible={demLink && !!demId}
      width="800"
      onClose={toggleDemLink}
    >
      {demLink ? (
        <LinkDem
          onClose={toggleDemLink}
          businessId={demId || ''}
          userId={data?.user?.id || ''}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);

export default userDetail;
