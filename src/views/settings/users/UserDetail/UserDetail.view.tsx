import React from 'react';
import type { UserQuery } from 'graphql/generated';
import { UserStatus } from 'graphql/generated';
import { RoleValues } from 'types';
import { FormattedMessage } from 'react-intl';

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
      subTitle={
        data?.user?.disabled && (
          <FormattedMessage defaultMessage="User Disabled" id="cFQJf4" />
        )
      }
      extra={[
        <Button
          key="3"
          // disabled={saving || !!data?.user?.demId || !demId}
          disabled
          onClick={toggleDemLink}
        >
          <FormattedMessage defaultMessage="Link Dem User" id="n6qFde" />
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
          {/* new thing to translate:  data?.user?.status === UserStatus.NotInvited
                ? 'Send Invite'
                : 'Resend Invite' */}
          <FormattedMessage defaultMessage="Resend Invite" id="uVl/Bo" />
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
            <FormattedMessage defaultMessage="Enable User" id="59gCcZ" />
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
            <FormattedMessage defaultMessage="Disable User" id="ibMD0D" />
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
          <FormattedMessage defaultMessage="Delete User" id="mJbA00" />
        </Button>,
      ]}
    />

    <Row gutter={16}>
      <Col span={16} xxl={12}>
        <Card loading={loading}>
          <Descriptions
            title={<FormattedMessage defaultMessage="Details" id="Lv0zJu" />}
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
                <FormattedMessage defaultMessage="Edit Details" id="A2fHI3" />
              </Button>
            }
          >
            <Descriptions.Item
              label={
                <FormattedMessage defaultMessage="Full Name" id="TemVby" />
              }
              style={{ paddingBottom: 8 }}
            >
              {data?.user?.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Status" id="tzMNF3" />}
              style={{ paddingBottom: 8 }}
            >
              <Typography.Text
                type={
                  data?.user?.status === UserStatus.Active
                    ? 'success'
                    : 'warning'
                }
              >
                {data?.user?.status}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Business" id="w1Fanr" />}
              style={{ paddingBottom: 8 }}
            >
              <Link
                to={`/app/scheme-settings/businesses/view/${
                  data?.user?.businesses[0]?.id || ''
                }`}
              >
                {data?.user?.businesses[0]?.name}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage defaultMessage="Email Address" id="xxQxLE" />
              }
              style={{ paddingBottom: 8 }}
            >
              {data?.user?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Role" id="1ZgrhW" />}
              style={{ paddingBottom: 8 }}
            >
              {data?.user?.schemes && RoleValues[data?.user?.schemes[0].role]}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Groups" id="hzmswI" />}
            >
              <Row gutter={[0, 8]}>
                {data?.user?.groups.map(({ name, id }) => (
                  <Col key={id}>
                    <Tag color="blue">{name}</Tag>
                  </Col>
                )) || (
                  <FormattedMessage defaultMessage="No Groups" id="xt8fV1" />
                )}
              </Row>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  defaultMessage="Approver Groups"
                  id="D/FCTs"
                />
              }
            >
              <Row gutter={[0, 8]}>
                {data?.user?.approverGroups.map(({ name, id }) => (
                  <Col key={id}>
                    <Tag color="blue">{name}</Tag>
                  </Col>
                )) || (
                  <FormattedMessage
                    defaultMessage="No Approver Groups"
                    id="oujtV2"
                  />
                )}
              </Row>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage defaultMessage="Chat Groups" id="8TntzL" />
              }
            >
              <Row gutter={[0, 8]}>
                {data?.user?.chats
                  .map(({ chat }) => chat)
                  .map(({ name, id }) => (
                    <Col key={id}>
                      <Tag color="blue">{name}</Tag>
                    </Col>
                  )) || (
                  <FormattedMessage
                    defaultMessage="No Chat Groups"
                    id="8b6ooN"
                  />
                )}
              </Row>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={8} xxl={12}>
        <Card>
          <Typography.Title level={4}>
            <FormattedMessage defaultMessage="Recent Activity" id="nc8QpJ" />
          </Typography.Title>
          <Empty
            description={
              <FormattedMessage defaultMessage="No Activity" id="vugtF7" />
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      </Col>
    </Row>
    <Drawer
      title={
        <FormattedMessage defaultMessage="Edit User Details" id="OaNQvU" />
      }
      visible={editUser}
      width="800"
      onClose={toggleEditUser}
    >
      {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
    </Drawer>
    <Drawer
      title={<FormattedMessage defaultMessage="Link to dem user" id="lk9fDC" />}
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
