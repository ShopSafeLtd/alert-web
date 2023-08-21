import React from 'react';
import type { Role, UserQuery } from 'graphql/generated';
import { UserStatus } from 'graphql/generated';
import { RoleValues } from 'types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Empty,
  PageHeader,
  Row,
  Statistic,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import EditUser from 'components/form-components/user/EditUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarClock,
  faCalendarDays,
  faCalendarWeek,
  faLockKeyhole,
  faPaperPlaneTop,
  faPenToSquare,
  faTrash,
  faUnlockKeyhole,
} from '@fortawesome/pro-light-svg-icons';
import { GetUserStatusValues } from 'types/enums/user_status';
import formatLoginTime from 'utils/format-login-time';
import LinkDem from '../../../../components/form-components/user/LinkDem';
import useStyles from './UserDetail.styles';

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
  userRole: Role | undefined;
}
const getTextStatus = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'green';
  if (value === UserStatus.Invited) return 'orange';
  if (value === UserStatus.Disabled) return 'red';
  return 'green';
};
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
  userRole,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.user?.fullName}
        // new things to translate
        subTitle={
          <Tag
            color={getTextStatus(data?.user?.status || UserStatus.Active)}
            style={{ marginTop: 0 }}
          >
            {GetUserStatusValues[data?.user?.status || UserStatus.Active]}
          </Tag>
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
            {data?.user?.status === UserStatus.NotInvited ? (
              <FormattedMessage defaultMessage="Send Invite" id="Mn4m0R" />
            ) : (
              <FormattedMessage defaultMessage="Resend Invite" id="uVl/Bo" />
            )}
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
          <Card
            style={{ width: '100%' }}
            bodyStyle={{ width: '100%' }}
            loading={loading}
          >
            <Row align="top" style={{ marginBottom: 10 }}>
              <Col flex={1}>
                <Typography.Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'LogIn Event Summary',
                    id: '1QNy/E',
                  })}
                </Typography.Title>
              </Col>
              <Col style={{ marginTop: -5 }}>
                <Button
                  disabled={saving}
                  onClick={() => navigate(`/app/reports/user-engagement`)}
                  // icon={
                  //   <FontAwesomeIcon
                  //     size="lg"
                  //     style={{ marginRight: 5 }}
                  //     icon={faEye}
                  //   />
                  // }
                >
                  <FormattedMessage
                    defaultMessage="View All Logins"
                    id="1AU/Ys"
                  />
                </Button>
              </Col>
            </Row>

            <Row justify="space-between">
              <Statistic
                className={classes.stats}
                title={intl.formatMessage({
                  defaultMessage: 'Last Login',
                  id: 'LPUHNC',
                })}
                value={
                  data?.user?.lastLogin?.loginTime
                    ? formatLoginTime(data?.user?.lastLogin?.loginTime)
                    : intl.formatMessage({
                        defaultMessage: 'Unknown',
                        id: '5jeq8P',
                      })
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarClock}
                  />
                }
              />

              <Statistic
                className={classes.stats}
                title={intl.formatMessage({
                  defaultMessage: 'Total logins in the last 30 Days',
                  id: 'PfxGeQ',
                })}
                value={data?.user?.totalThirtyDaysLogin || 0}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarDays}
                  />
                }
              />

              <Statistic
                className={classes.stats}
                title={intl.formatMessage({
                  defaultMessage: 'Total logins in the last year',
                  id: 'sM7fV8',
                })}
                value={data?.user?.totalLastYearLogin || 0}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarWeek}
                  />
                }
              />
            </Row>
          </Card>
          <Card loading={loading}>
            <Descriptions
              title={
                <Typography.Title level={4}>
                  <FormattedMessage defaultMessage="User Details" id="FyMi+8" />
                </Typography.Title>
              }
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
                {/* <Typography.Text
                type={
                  data?.user?.status === UserStatus.Active
                    ? 'success'
                    : 'warning'
                }
              >
                {data?.user?.status}
              </Typography.Text> */}
                <Tag
                  color={getTextStatus(data?.user?.status || UserStatus.Active)}
                  style={{ marginTop: -5 }}
                >
                  {GetUserStatusValues[data?.user?.status || UserStatus.Active]}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <FormattedMessage defaultMessage="Business" id="w1Fanr" />
                }
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
                  <FormattedMessage
                    defaultMessage="Email Address"
                    id="xxQxLE"
                  />
                }
                style={{ paddingBottom: 8 }}
              >
                {data?.user?.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Role" id="1ZgrhW" />}
                style={{ paddingBottom: 8 }}
              >
                {userRole && RoleValues[userRole]}
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
              {data?.user?.approverGroups &&
                data?.user?.approverGroups.length > 0 && (
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
                      ))}
                    </Row>
                  </Descriptions.Item>
                )}
              {data?.user?.chats && data?.user?.chats.length > 0 && (
                <Descriptions.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Chat Groups"
                      id="8TntzL"
                    />
                  }
                >
                  <Row gutter={[0, 8]}>
                    {data?.user?.chats
                      .map(({ chat }) => chat)
                      .map(({ name, id }) => (
                        <Col key={id}>
                          <Tag color="blue">{name}</Tag>
                        </Col>
                      ))}
                  </Row>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>
        <Col span={8} xxl={12}>
          {/* <Card>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Recent Activity" id="nc8QpJ" />
            </Typography.Title>
            <Empty
              description={
                <FormattedMessage defaultMessage="No Activity" id="vugtF7" />
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card> */}
          <Card>
            <Typography.Title level={4} style={{ marginBottom: 20 }}>
              <FormattedMessage
                defaultMessage="Recent Login Activities"
                id="J1F781"
              />
            </Typography.Title>
            {data?.user?.lastTenLogin && data?.user?.lastTenLogin.length > 0 ? (
              <Timeline mode="alternate">
                {data?.user?.lastTenLogin.map((login) => (
                  <Timeline.Item key={login?.id}>
                    {login?.loginTime && (
                      <Typography.Text>
                        {formatLoginTime(login?.loginTime)}
                      </Typography.Text>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'No Recent Login Activities',
                  id: '+FUwLf',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}

            {/* <Table
              size="small"
              loading={loading}
              pagination={{
                hideOnSinglePage: true,
                // total: data?.listUsers.total,
                // showTotal: (total) => `Total Users: ${total}`,
              }}
              columns={[
                {
                  key: 'loginTime',
                  // title: intl.formatMessage({
                  //   defaultMessage: 'Login Time',
                  //   id: '2o/IFP',
                  // }),
                  dataIndex: 'loginTime',
                },
              ]}
              dataSource={data?.user?.lastTenLogin.map((login) => ({
                key: login.id,
                // new Date(
                //           data?.user?.lastLogin?.loginTime
                //         ).toLocaleDateString()
                loginTime: formatLoginTime(login?.loginTime),
                // loginTime: moment(login?.loginTime).format('DD/MM/YYYY hh/mm'),
              }))}
            /> */}
          </Card>
        </Col>
      </Row>

      <Drawer
        title={
          <FormattedMessage defaultMessage="Edit User Details" id="OaNQvU" />
        }
        visible={editUser}
        width="600"
        onClose={toggleEditUser}
      >
        {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage defaultMessage="Link to dem user" id="lk9fDC" />
        }
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
};

export default userDetail;
