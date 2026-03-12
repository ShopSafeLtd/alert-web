/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
import type { FormInstance } from 'antd';
import type { UserQuery } from 'graphql/user/queries/__generated__/user.generated';
import type { BusinessData, SelectOptions } from 'types/DataType';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
// import validateMobileWithCountryCode from '#/utils/validate-contry-code';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import PhoneInput from 'antd-phone-input';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import { Role } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditUser';

import useStyles from './user.styles';

const { Title } = Typography;

interface Props {
  addBusinessVisible: boolean;
  availableRoles: SelectOptions[];
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  data: UserQuery | undefined;
  form: FormInstance<FormData>;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedGroups: string[] | undefined;
  selectedRole: string | undefined;
  setSelectedGroups: (value: string[]) => void;
  setSelectedRole: (value: string) => void;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const EditUser = ({
  addBusinessVisible,
  availableRoles,
  chatsData,
  chatsLoading,
  data,
  form,
  groupsData,
  groupsLoading,
  loading,
  onClose,
  onSubmit,
  saving,
  selectedGroups,
  selectedRole,
  setSelectedGroups,
  setSelectedRole,
  toggleAddBusinessVisible,
  updateNewBusinessData,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const currentScheme = useAtomValue(currentSchemeAtom);

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form<FormData>
      form={form}
      initialValues={{
        activityEmail: data?.user?.activityEmail,
        activityPush: data?.user?.activityPush,
        approverGroups:
          data?.user?.approverGroups && data.user.approverGroups.length > 0
            ? data.user.approverGroups.map(({ id }) => id)
            : [],
        bulletinEmails: data?.user?.bulletinEmails,
        bulletinPush: data?.user?.bulletinPush,
        businesses: data?.user?.businesses.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
        chats:
          data?.user?.chats && data.user.chats.length > 0
            ? data.user.chats.map(({ chat }) => chat.id)
            : [],
        defaultGroups:
          data?.user?.defaultGroups && data.user.defaultGroups.length > 0
            ? data.user.defaultGroups.map(({ id }) => id)
            : [],
        email: data?.user?.email,
        fullName: data?.user?.fullName,
        groups:
          data?.user?.groups && data.user.groups.length > 0
            ? data.user.groups.map(({ id }) => id)
            : [],
        incidentEmail: data?.user?.incidentEmail,
        incidentPush: data?.user?.incidentPush,
        messagePush: data?.user?.messagePush,
        mobileNumber: data?.user?.mobileNumber,
        offenderEmail: data?.user?.offenderEmail,
        offenderPush: data?.user?.offenderPush,
        publicName: data?.user?.publicName,

        reportToAllBusinesses: data?.user?.reportToAllBusinesses || false,
        role: data?.user?.schemePermission?.id || '',
        subscribedIncidentOnly: data?.user?.subscribedIncidentOnly,
        subscribedOffenderOnly: data?.user?.subscribedOffenderOnly,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({
          defaultMessage: 'User Details:',
        })}
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Full Name',
            })}
            name="fullName"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the user',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Email Address',
            })}
            name="email"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const mobile = getFieldValue('mobileNumber');
                  if (value || (mobile && mobile.valid())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        defaultMessage:
                          'Please enter an email address or mobile number for the new user.',
                      })
                    )
                  );
                },
              }),
            ]}
          >
            <Input disabled={saving} type="email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Mobile Number',
            })}
            name="mobileNumber"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const email = getFieldValue('email') as string | undefined;
                  const { areaCode, phoneNumber, valid } =
                    (value as {
                      areaCode?: string;
                      phoneNumber?: string;
                      valid: () => boolean;
                    }) ?? {};
                  const hasInput = !!(phoneNumber || areaCode);

                  if (hasInput && !valid()) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage:
                            'Invalid mobile number. Please include a valid country code such as +44.',
                        })
                      )
                    );
                  }
                  if (!hasInput && !email) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage:
                            'Please enter an email address or mobile number for the new user.',
                        })
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <PhoneInput
              disableParentheses
              distinct
              preferredCountries={['gb']}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col flex={1}>
          <Row align="middle" gutter={20}>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Business',
                })}
                name="businesses"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a business for the new user.',
                    }),
                    required: !currentScheme.optionalBusinessOnUsers,
                  },
                ]}
              >
                <BusinessesSelect
                  allowClear
                  disabled={saving}
                  maxTagCount={3}
                  mode="multiple"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search for a business...',
                  })}
                  showSearch
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddBusinessVisible}
                style={{ color: 'red', marginTop: 3, padding: 8 }}
              >
                {intl.formatMessage({
                  defaultMessage: 'New Business',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Role' })}
            name="role"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select a role for the user.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              loading={loading}
              onChange={(value) => setSelectedRole(value)}
              options={availableRoles}
            />
          </Form.Item>
        </Col>
      </Row>
      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({ defaultMessage: 'User Groups:' })}
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            name="groups"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please selected at least one group for the user.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              loading={groupsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={(value) => setSelectedGroups(value)}
              optionFilterProp="label"
              optionLabelProp="label"
              options={groupsData}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Chats Group',
            })}
            name="chats"
          >
            <Select
              disabled={saving}
              loading={chatsLoading}
              maxTagCount={2}
              mode="multiple"
              optionFilterProp="label"
              optionLabelProp="label"
              options={chatsData}
            />
          </Form.Item>
        </Col>
      </Row>

      {selectedGroups && selectedGroups.length > 0 && (
        <Row gutter={16}>
          {selectedRole === Role.SchemeAdmin && (
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Group Admin',
                })}
                name="approverGroups"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Group members who can have specific workflows triggered for them',
                })}
              >
                <Select
                  disabled={saving}
                  loading={chatsLoading}
                  maxTagCount={3}
                  mode="multiple"
                  optionFilterProp="label"
                  optionLabelProp="label"
                  options={groupsData?.filter(({ value }) =>
                    selectedGroups.includes(value)
                  )}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Default Groups',
              })}
              name="defaultGroups"
            >
              <Select
                disabled={saving}
                loading={chatsLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={groupsData?.filter(({ value }) =>
                  selectedGroups.includes(value)
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Show user name in the system',
            })}
            name="publicName"
            valuePropName="checked"
          >
            <Switch className={classes.switch} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Allow user to report to all businesses',
            })}
            name="reportToAllBusinesses"
            valuePropName="checked"
          >
            <Switch className={classes.switch} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Title level={4} style={{ marginBottom: 10 }}>
        {intl.formatMessage({
          defaultMessage: 'Notification Settings:',
        })}
      </Title>
      <Title style={{ fontSize: 16, marginBottom: 15 }}>
        {intl.formatMessage({
          defaultMessage: 'Incidents:',
        })}
      </Title>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage:
            'Only notify users for their own and subscribed incidents:',
        })}
        name="subscribedIncidentOnly"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for incidents:',
        })}
        name="incidentPush"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send emails for incidents:',
        })}
        name="incidentEmail"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Title style={{ fontSize: 16, marginBottom: 15, marginTop: 10 }}>
        {intl.formatMessage({
          defaultMessage: 'Offenders:',
        })}
      </Title>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage:
            'Only notify users for their own and subscribed offenders:',
        })}
        name="subscribedOffenderOnly"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for offenders:',
        })}
        name="offenderPush"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send emails for offenders:',
        })}
        name="offenderEmail"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Title style={{ fontSize: 16, marginBottom: 15, marginTop: 10 }}>
        {intl.formatMessage({
          defaultMessage: 'Bulletins:',
        })}
      </Title>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for bulletins:',
        })}
        name="bulletinPush"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send emails for bulletins:',
        })}
        name="bulletinEmails"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Title style={{ fontSize: 16, marginBottom: 15, marginTop: 10 }}>
        {intl.formatMessage({
          defaultMessage: 'Chat Messages:',
        })}
      </Title>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for new chat messages:',
        })}
        name="messagePush"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Title style={{ fontSize: 16, marginBottom: 15, marginTop: 10 }}>
        {intl.formatMessage({
          defaultMessage: 'Activities:',
        })}
      </Title>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for activities:',
        })}
        name="activityPush"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>
      <Form.Item
        className={classes.switchItem}
        label={intl.formatMessage({
          defaultMessage: 'Send emails for activities:',
        })}
        name="activityEmail"
        valuePropName="checked"
      >
        <Switch className={classes.switch} disabled={saving} />
      </Form.Item>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        onClose={toggleAddBusinessVisible}
        open={addBusinessVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
        })}
        width={600}
      >
        {addBusinessVisible && (
          <AddBusiness
            onClose={toggleAddBusinessVisible}
            saving={saving}
            update={updateNewBusinessData}
          />
        )}
      </Drawer>
    </Form>
  );
};

export default EditUser;
