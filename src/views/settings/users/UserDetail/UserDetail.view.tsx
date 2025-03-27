/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { ViewportData } from '#/types/DataType';
import type { Role } from 'graphql/types';
import type { RefObject } from 'react';

// import { EditPasswordButton } from '#/components/Password/OwnPasswordChange.view';
import LocatingModal from '#/components/map/LocatingModal';
import { CustomTermsView } from '#/components/onboarding/Onboarding/SchemeTerms/Terms.view';
import FormatCalendar from '#/utils/format-calendar-24h';
import SessionsTableModal from '#/views/settings/users/UserDetail/SessionsTable.modal';
import { useTermQuery } from '#/views/settings/users/UserDetail/graphql/queries/__generated__/view-users-signed-terms.generated';
import {
  faCalendarClock,
  faCalendarDays,
  faCalendarWeek,
  faLocationDot,
  faLockKeyhole,
  faPaperPlaneTop,
  faPenToSquare,
  faPrint,
  faTrash,
  faUnlockKeyhole,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Modal,
  PageHeader,
  Row,
  Statistic,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import EditUser from 'components/form-components/user/EditUser';
import { AppType, UserStatus } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { GetUserStatusValues } from 'types/enums/user_status';
import formatLoginTime from 'utils/format-login-time';

import type { ViewUserQuery } from './graphql/queries/__generated__/view-user.generated';

import SetPassword from '../../../../components/form-components/SetPassword';
import LinkDem from '../../../../components/form-components/user/LinkDem';
import useStyles from './UserDetail.styles';

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  data: ViewUserQuery | undefined;
  deleteConfirm: () => void;
  demId: null | string | undefined;
  demLink: boolean;
  disableConfirm: () => void;
  editPassword: boolean;
  editUser: boolean;
  enableConfirm: () => void;
  handlePrint: () => void;
  inviteConfirm: () => void;
  // isOwn: boolean;
  isPrinting: boolean;
  isSessionsModalOpen: boolean;
  loading: boolean;
  saving: boolean;
  setIsSessionsModalOpen: (value: boolean) => void;
  setViewport: (value: ViewportData | null) => void;
  toggleDemLink: () => void;
  toggleEditPassword: () => void;
  toggleEditUser: () => void;
  userRole: Role | undefined;

  viewport: ViewportData | null;
}
const getTextStatus = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'green';
  if (value === UserStatus.Invited) return 'orange';
  if (value === UserStatus.Disabled) return 'red';
  return 'green';
};

const UserTermsModal = ({
  componentRef,
  date,
  isPrinting,
  name,
  signature,
  termsId,
}: {
  componentRef: RefObject<HTMLDivElement>;
  date: string;
  isPrinting: boolean;
  name: string;
  signature: string;
  termsId: string;
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
                height: '100%',
                marginTop: 20,
                width: '100%',
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
          dangerouslySetInnerHTML={{ __html: signature }}
          style={{
            height: '100px',
            marginLeft: 5,
            outline: '1px solid black',
            width: '300px',
          }}
        />
      </div>
    </Card>
  );
};

const userDetail = ({
  componentRef,
  data,
  deleteConfirm,
  demId,
  demLink,
  disableConfirm,
  editPassword,
  editUser,
  enableConfirm,
  handlePrint,
  inviteConfirm,
  // isOwn,
  isPrinting,
  isSessionsModalOpen,
  loading,
  saving,
  setIsSessionsModalOpen,
  setViewport,
  toggleDemLink,
  toggleEditPassword,
  toggleEditUser,
  viewport,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const AppTypeFilter = [
    {
      text: intl.formatMessage({
        defaultMessage: 'Web',
      }),
      value: AppType.Web,
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'App',
      }),
      value: AppType.Native,
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsSessionsModalOpen(false);
  };
  const EditPassword = () => (
    // if (isOwn) {
    //   return <EditPasswordButton key="5" saving={saving} />;
    // }
    <Button disabled={saving} key="5" onClick={toggleEditPassword}>
      <FormattedMessage defaultMessage="Edit Password" />
    </Button>
  );
  return (
    <div className="list-view">
      <PageHeader
        extra={[
          <EditPassword key="5" />,
          <Button
            // disabled={saving || !!data?.user?.demId || !demId}
            disabled
            key="3"
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
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPaperPlaneTop}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="4"
            onClick={inviteConfirm}
          >
            {data?.user?.status === UserStatus.NotInvited ? (
              <FormattedMessage defaultMessage="Send Invite" />
            ) : (
              <FormattedMessage defaultMessage="Resend Invite" />
            )}
          </Button>,
          data?.user?.disabled ? (
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faUnlockKeyhole}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              key="3"
              onClick={enableConfirm}
            >
              <FormattedMessage defaultMessage="Enable User" />
            </Button>
          ) : (
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faLockKeyhole}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              key="2"
              onClick={disableConfirm}
            >
              <FormattedMessage defaultMessage="Disable User" />
            </Button>
          ),
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="1"
            onClick={deleteConfirm}
          >
            <FormattedMessage defaultMessage="Delete User" />
          </Button>,
        ]}
        onBack={() => window.history.back()}
        // new things to translate
        subTitle={
          <Tag
            color={getTextStatus(data?.user?.status || UserStatus.Active)}
            style={{ marginTop: 0 }}
          >
            {GetUserStatusValues[data?.user?.status || UserStatus.Active]}
          </Tag>
        }
        title={data?.user?.fullName}
      />

      <Row gutter={16}>
        <Col span={16} xxl={12}>
          <Card
            bodyStyle={{ width: '100%' }}
            loading={loading}
            style={{ width: '100%' }}
          >
            <Row align="top" style={{ marginBottom: 10 }}>
              <Col flex={1}>
                <Typography.Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'LogIn Event Summary',
                  })}
                </Typography.Title>
              </Col>
              {/* <Col style={{ marginTop: -5 }}>*/}
              {/*  <Button*/}
              {/*    disabled={saving}*/}
              {/*    onClick={() => navigate('/app/reports/user-engagement')}*/}
              {/*    // icon={*/}
              {/*    //   <FontAwesomeIcon*/}
              {/*    //     size="lg"*/}
              {/*    //     style={{ marginRight: 5 }}*/}
              {/*    //     icon={faEye}*/}
              {/*    //   />*/}
              {/*    // }*/}
              {/*  >*/}
              {/*    <FormattedMessage defaultMessage="View All Logins" />*/}
              {/*  </Button>*/}
              {/* </Col>*/}
            </Row>

            <Row justify="space-between">
              <Statistic
                className={classes.stats}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarClock}
                  />
                }
                title={intl.formatMessage({
                  defaultMessage: 'Last Login',
                })}
                value={
                  data?.user?.sessions[0]?.createdAt
                    ? formatLoginTime(data?.user?.sessions[0]?.createdAt)
                    : intl.formatMessage({
                        defaultMessage: 'Unknown',
                      })
                }
              />

              <Statistic
                className={classes.stats}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarDays}
                  />
                }
                title={intl.formatMessage({
                  defaultMessage: 'Total logins in the last 30 Days',
                })}
                value={data?.user?.totalThirtyDaysLogin || 0}
              />

              <Statistic
                className={classes.stats}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCalendarWeek}
                  />
                }
                title={intl.formatMessage({
                  defaultMessage: 'Total logins in the last year',
                })}
                value={data?.user?.totalLastYearLogin || 0}
              />
            </Row>
          </Card>
          <Card loading={loading}>
            <Descriptions
              column={1}
              extra={
                <Button
                  icon={
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ marginRight: 5 }}
                    />
                  }
                  onClick={toggleEditUser}
                >
                  <FormattedMessage defaultMessage="Edit Details" />
                </Button>
              }
              title={
                <Typography.Title level={4}>
                  <FormattedMessage defaultMessage="User Details" />
                </Typography.Title>
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
              {data?.user?.mobileNumber && (
                <Descriptions.Item
                  label={<FormattedMessage defaultMessage="Mobile Number" />}
                  style={{ paddingBottom: 8 }}
                >
                  {data?.user?.mobileNumber}
                </Descriptions.Item>
              )}
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Groups" />}
              >
                <Row gutter={[0, 8]}>
                  {data?.user?.groups.map(({ id, name }) => (
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
                      {data?.user?.approverGroups.map(({ id, name }) => (
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
                      {data?.user?.defaultGroups.map(({ id, name }) => (
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
                      .map(({ id, name }) => (
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
          <Card loading={loading}>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Typography.Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'User Sessions (Latest 10)',
                  })}
                </Typography.Title>
              </Col>
              <Col flex={1} />
              {/* <Col>*/}
              {/*  <Button*/}
              {/*    disabled={saving}*/}
              {/*    onClick={() => setIsSessionsModalOpen(true)}*/}
              {/*    size={'small'}*/}
              {/*    style={{*/}
              {/*      marginTop: -5,*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <FormattedMessage defaultMessage="View All" />*/}
              {/*  </Button>*/}
              {/* </Col>*/}
            </Row>
            <Table
              // rowClassName={classes.row}
              columns={[
                {
                  dataIndex: 'type',
                  filters: AppTypeFilter,
                  key: 'type',
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onFilter: (value: AppType, record: { type: AppType }) =>
                    record.type.includes(value),
                  // eslint-disable-next-line no-confusing-arrow
                  render: (_, record: { type: AppType }) =>
                    record.type === AppType.Web ? (
                      <Tag color="green">
                        {intl.formatMessage({
                          defaultMessage: 'Web',
                        })}
                      </Tag>
                    ) : (
                      <Tag color="red">
                        {intl.formatMessage({
                          defaultMessage: 'App',
                        })}
                      </Tag>
                    ),
                  title: intl.formatMessage({ defaultMessage: 'Type' }),
                  width: 100,
                },
                {
                  dataIndex: 'updatedAt',
                  ellipsis: true,
                  key: 'updatedAt',
                  // eslint-disable-next-line no-confusing-arrow
                  render: (value: Date) => (
                    <Tooltip title={new Date(value).toLocaleString('en-GB')}>
                      {FormatCalendar(new Date(value), intl, true)}{' '}
                      {new Date(value).toLocaleTimeString('en-GB')}
                    </Tooltip>
                  ),
                  title: intl.formatMessage({ defaultMessage: 'At' }),
                },
                {
                  dataIndex: 'completed',
                  key: 'actions',
                  // eslint-disable-next-line no-confusing-arrow
                  render: (
                    _,
                    record: { viewport: ViewportData | undefined }
                  ) =>
                    record.viewport ? (
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'View Session Location',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faLocationDot} />}
                          onClick={() => {
                            if (record.viewport) setViewport(record.viewport);
                          }}
                          size="small"
                        />
                      </Tooltip>
                    ) : undefined,
                  width: 50,
                },
              ]}
              dataSource={
                data?.user.sessions.map((session) => ({
                  key: session.id,
                  type: session.app,
                  updatedAt: session.createdAt,
                  viewport:
                    session.locationLat && session.locationLng
                      ? {
                          latitude: session.locationLat,
                          longitude: session.locationLng,
                        }
                      : undefined,
                })) || []
              }
              pagination={{
                hideOnSinglePage: true,
                pageSize: 10,
              }}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        onClose={toggleEditUser}
        open={editUser}
        title={<FormattedMessage defaultMessage="Edit User Details" />}
        width="600"
      >
        {editUser ? <EditUser onClose={toggleEditUser} /> : <div />}
      </Drawer>
      <Drawer
        onClose={toggleEditPassword}
        open={editPassword}
        title={<FormattedMessage defaultMessage="Edit Password" />}
        width="600"
      >
        <SetPassword
          onClose={toggleEditPassword}
          userId={data?.user?.id || ''}
        />
      </Drawer>
      <Drawer
        onClose={toggleDemLink}
        open={demLink && !!demId}
        title={<FormattedMessage defaultMessage="Link to dem user" />}
        width="800"
      >
        {demLink ? (
          <LinkDem
            businessId={demId || ''}
            onClose={toggleDemLink}
            userId={data?.user?.id || ''}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Modal
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="printButton" onClick={handlePrint} type="primary">
            <FontAwesomeIcon icon={faPrint} style={{ marginRight: 10 }} />
            {intl.formatMessage({
              defaultMessage: 'Print',
            })}
          </Button>,
        ]}
        maskClosable
        onCancel={handleCancel}
        open={isModalOpen}
        style={{ top: 20 }}
        title={intl.formatMessage({
          defaultMessage: 'User Terms',
        })}
        width={900}
      >
        <UserTermsModal
          componentRef={componentRef}
          date={new Date(
            data?.user.signedTerms?.signedAt || ''
          ).toLocaleDateString()}
          isPrinting={isPrinting}
          name={data?.user.fullName || ''}
          signature={data?.user.signedTerms?.signature || ''}
          termsId={data?.user.signedTerms?.terms.id || ''}
        />
      </Modal>
      <Modal
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        maskClosable
        onCancel={handleCancel}
        open={isSessionsModalOpen}
        style={{ top: 20 }}
        title={intl.formatMessage({
          defaultMessage: 'Sessions',
        })}
        width={900}
      >
        <SessionsTableModal
          intl={intl}
          open={isSessionsModalOpen}
          saving={saving}
          setViewport={setViewport}
          userId={data?.user.id || ''}
        />
      </Modal>
      {viewport && (
        <LocatingModal
          handleSubmit={() => {}}
          onClose={() => setViewport(null)}
          open={!!viewport}
          uneditable
          viewportData={viewport}
        />
      )}
    </div>
  );
};

export default userDetail;
