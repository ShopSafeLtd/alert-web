/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { RefObject } from 'react';
import React, { useState } from 'react';
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
  Modal,
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
  faPrint,
  faTrash,
  faUnlockKeyhole,
} from '@fortawesome/pro-light-svg-icons';
import { GetUserStatusValues } from 'types/enums/user_status';
import formatLoginTime from 'utils/format-login-time';
import LinkDem from '../../../../components/form-components/user/LinkDem';
import useStyles from './UserDetail.styles';
import SetPassword from '../../../../components/form-components/SetPassword';
import { EditPasswordButton } from '#/components/Password/OwnPasswordChange.view';
import { CustomTermsView } from '#/components/onboarding/Onboarding/SchemeTerms/Terms.view';
import type { Role } from 'graphql/types';
import { UserStatus } from 'graphql/types';
import type { UserQuery } from 'graphql/user/queries/user.generated';
import { useTermQuery } from '#/views/settings/users/UserDetail/graphql/queries/view-users-signed-terms.generated';

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
  toggleEditPassword: () => void;
  editPassword: boolean;
  isOwn: boolean;
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
}
const getTextStatus = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'green';
  if (value === UserStatus.Invited) return 'orange';
  if (value === UserStatus.Disabled) return 'red';
  return 'green';
};

const UserTermsModal = ({
  isPrinting,
  componentRef,
  termsId,
  signature,
  name,
  date,
}: {
  isPrinting: boolean;
  componentRef: RefObject<HTMLDivElement>;
  termsId: string;
  signature: string;
  name: string;
  date: string;
}) => {
  const { data: termsData, loading } = useTermQuery({
    skip: !termsId,
    variables: {
      where: {
        id: termsId,
      },
    },
  });

  const terms = termsData?.term?.content || '';

  return (
    <Card loading={loading}>
      <div
        ref={componentRef}
        style={
          isPrinting
            ? undefined
            : {
                width: '100%',
                height: '100%',
                marginTop: 20,
              }
        }
      >
        <CustomTermsView isPrinting={isPrinting} terms={terms} />
        <br />
        I confirm that I have read and agree to the above terms and conditions.
        <br />
        Date: {date}
        <br />
        Signed By: {name}
        <br />
        <div
          style={{
            outline: '1px solid black',
            width: '300px',
            height: '100px',
            marginLeft: 5,
          }}
          dangerouslySetInnerHTML={{ __html: signature }}
        />
      </div>
    </Card>
  );
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
  toggleEditPassword,
  editPassword,
  isOwn,
  componentRef,
  handlePrint,
  isPrinting,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const EditPassword = () => {
    if (isOwn) {
      return <EditPasswordButton key="5" saving={saving} />;
    }
    return (
      <Button key="5" disabled={saving} onClick={toggleEditPassword}>
        <FormattedMessage defaultMessage="Edit Password" />
      </Button>
    );
  };

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
          <EditPassword key="5" />,
          <Button
            key="3"
            // disabled={saving || !!data?.user?.demId || !demId}
            disabled
            onClick={toggleDemLink}
          >
            <FormattedMessage defaultMessage="Link Dem User" />
          </Button>,
          data?.user.signedTerms?.signature ? (
            <Button key="userTerms1" onClick={showModal}>
              {intl.formatMessage({
                defaultMessage: 'User terms',
              })}
            </Button>
          ) : null,
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
              <FormattedMessage defaultMessage="Send Invite" />
            ) : (
              <FormattedMessage defaultMessage="Resend Invite" />
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
              <FormattedMessage defaultMessage="Enable User" />
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
              <FormattedMessage defaultMessage="Disable User" />
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
            <FormattedMessage defaultMessage="Delete User" />
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
                  })}
                </Typography.Title>
              </Col>
              <Col style={{ marginTop: -5 }}>
                <Button
                  disabled={saving}
                  onClick={() => navigate('/app/reports/user-engagement')}
                  // icon={
                  //   <FontAwesomeIcon
                  //     size="lg"
                  //     style={{ marginRight: 5 }}
                  //     icon={faEye}
                  //   />
                  // }
                >
                  <FormattedMessage defaultMessage="View All Logins" />
                </Button>
              </Col>
            </Row>

            <Row justify="space-between">
              <Statistic
                className={classes.stats}
                title={intl.formatMessage({
                  defaultMessage: 'Last Login',
                })}
                value={
                  data?.user?.lastLogin?.loginTime
                    ? formatLoginTime(data?.user?.lastLogin?.loginTime)
                    : intl.formatMessage({
                        defaultMessage: 'Unknown',
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
                  <FormattedMessage defaultMessage="User Details" />
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
                  <FormattedMessage defaultMessage="Edit Details" />
                </Button>
              }
            >
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Full Name" />}
                style={{ paddingBottom: 8 }}
              >
                {data?.user?.fullName}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Status" />}
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
                  color={getTextStatus(
                    data?.user?.status || UserStatus.Inactive
                  )}
                  style={{ marginTop: -5 }}
                >
                  {
                    GetUserStatusValues[
                      data?.user?.status || UserStatus.Inactive
                    ]
                  }
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Business" />}
                style={{ paddingBottom: 8 }}
              >
                <Row gutter={16}>
                  {data?.user?.businesses.map(({ id, name }) => (
                    <Col key="business-redirect">
                      <Link
                        to={`/app/scheme-settings/businesses/view/${id || ''}`}
                      >
                        {name}
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Email Address" />}
                style={{ paddingBottom: 8 }}
              >
                {data?.user?.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Role" />}
                style={{ paddingBottom: 8 }}
              >
                {userRole && RoleValues[userRole]}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Groups" />}
              >
                <Row gutter={[0, 8]}>
                  {data?.user?.groups.map(({ name, id }) => (
                    <Col key={id}>
                      <Tag color="blue">{name}</Tag>
                    </Col>
                  )) || <FormattedMessage defaultMessage="No Groups" />}
                </Row>
              </Descriptions.Item>
              {data?.user?.approverGroups &&
                data?.user?.approverGroups.length > 0 && (
                  <Descriptions.Item
                    label={
                      <FormattedMessage defaultMessage="Approver Groups" />
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
              {data?.user?.defaultGroups &&
                data?.user?.defaultGroups.length > 0 && (
                  <Descriptions.Item
                    label={<FormattedMessage defaultMessage="Default Groups" />}
                  >
                    <Row gutter={[0, 8]}>
                      {data?.user?.defaultGroups.map(({ name, id }) => (
                        <Col key={id}>
                          <Tag color="blue">{name}</Tag>
                        </Col>
                      ))}
                    </Row>
                  </Descriptions.Item>
                )}
              {data?.user?.chats && data?.user?.chats.length > 0 && (
                <Descriptions.Item
                  label={<FormattedMessage defaultMessage="Chat Groups" />}
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
              <FormattedMessage defaultMessage="Recent Login Activities" />
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
        title={<FormattedMessage defaultMessage="Edit User Details" />}
        open={editUser}
        width="600"
        onClose={toggleEditUser}
      >
        {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
      </Drawer>
      <Drawer
        title={<FormattedMessage defaultMessage="Edit Password" />}
        open={editPassword}
        width="600"
        onClose={toggleEditPassword}
      >
        <SetPassword
          userId={data?.user?.id || ''}
          onClose={toggleEditPassword}
        />
      </Drawer>
      <Drawer
        title={<FormattedMessage defaultMessage="Link to dem user" />}
        open={demLink && !!demId}
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
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'User Terms',
        })}
        style={{ top: 20 }}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable
        width={900}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button onClick={handlePrint} type="primary" key="printButton">
            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faPrint} />
            {intl.formatMessage({
              defaultMessage: 'Print',
            })}
          </Button>,
        ]}
      >
        <UserTermsModal
          termsId={data?.user.signedTerms?.terms.id || ''}
          signature={data?.user.signedTerms?.signature || ''}
          name={data?.user.fullName || ''}
          date={new Date(
            data?.user.signedTerms?.signedAt || ''
          ).toLocaleDateString()}
          isPrinting={isPrinting}
          componentRef={componentRef}
        />
      </Modal>
    </div>
  );
};

export default userDetail;
