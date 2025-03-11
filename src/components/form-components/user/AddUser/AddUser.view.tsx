/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
import type { FormInstance } from 'antd';
import type { BusinessData, SelectOptions } from 'types/DataType';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
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
  Switch,
  Typography,
} from 'antd';
import PhoneInput from 'antd-phone-input';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import { Role } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddUser';

import useStyles from './user.styles';

const { Title } = Typography;

interface Props {
  addBusinessVisible: boolean;
  availableRoles: SelectOptions[];
  businessProvided: boolean;
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  existingUser: boolean;
  form: FormInstance<FormData>;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  saving: boolean;
  schemeLoading: boolean;
  selectedGroups: string[] | undefined;
  selectedRole: string | undefined;
  setSelectedGroups: (value: string[]) => void;
  setSelectedRole: (value: string) => void;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const AddUser = ({
  addBusinessVisible,
  availableRoles,
  businessProvided,
  chatsData,
  chatsLoading,
  existingUser,
  form,
  groupsData,
  groupsLoading,
  onClose,
  onSubmit,
  onValuesChange,
  saving,
  schemeLoading,
  selectedGroups,
  selectedRole,
  setSelectedGroups,
  setSelectedRole,
  toggleAddBusinessVisible,
  updateNewBusinessData,
}: Props): JSX.Element => {
  const intl = useIntl();
  // const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const classes = useStyles();
  // const validator = (_, { valid }) => {
  //   // if (valid(true)) return Promise.resolve(); // strict validation
  //   if (valid()) return Promise.resolve(); // non-strict validation
  //   return Promise.reject('Invalid phone number');
  // };

  return (
    <Form<FormData>
      form={form}
      initialValues={{
        building: '',
        businesses: [],
        chats: [],
        county: '',
        email: '',
        fullName: '',
        groups: [],
        postcode: '',
        publicName: true,
        reportToAllBusinesses: false,
        role: '',
        street: '',
        townCity: '',
      }}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
    >
      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({ defaultMessage: 'User Detail:' })}
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
                  defaultMessage: 'Please enter a name for the new user.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} readOnly={existingUser} />
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
            <Input disabled={saving} readOnly={existingUser} type="email" />
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
                validator(_, { valid }) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const email = getFieldValue('email');
                  if (!valid && !email) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage:
                            'Please enter an email address or mobile number for the new user.',
                        })
                      )
                    );
                  }
                  // if (valid) {
                  //   return Promise.reject(
                  //     new Error(
                  //       intl.formatMessage({
                  //         defaultMessage: `Invalid mobile number. Please include a valid country code such as +44.`,
                  //       })
                  //     )
                  //   );
                  // }
                  return Promise.resolve();
                },
              }),
            ]}
            // tooltip={intl.formatMessage({
            //   defaultMessage:
            //     'Make sure to format the mobile number with a country code and a space after it.',
            // })}
          >
            <PhoneInput
              disableParentheses
              distinct
              preferredCountries={['gb']}
            />
            {/* <Input disabled={saving} readOnly={existingUser} type="tel" />*/}
          </Form.Item>
        </Col>
      </Row>
      {businessProvided ? (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
              })}
              name="businesses"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one business for the new user.',
                  }),
                  required: !existingUser,
                },
              ]}
            >
              <BusinessesSelect
                allowClear
                disabled={saving || businessProvided}
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
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Role',
              })}
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
                loading={schemeLoading}
                onChange={(value) => setSelectedRole(value)}
                options={availableRoles}
              />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <>
          <Row gutter={16}>
            <Col flex={1}>
              <Row align="middle" gutter={20}>
                <Col flex={1}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Businesses',
                    })}
                    name="businesses"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select at least one business for the new user.',
                        }),
                        required: !existingUser,
                      },
                    ]}
                  >
                    <BusinessesSelect
                      allowClear
                      disabled={saving || businessProvided}
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
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
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
                label={intl.formatMessage({
                  defaultMessage: 'Role',
                })}
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
                  loading={schemeLoading}
                  onChange={(value) => setSelectedRole(value)}
                  options={availableRoles}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

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
                    'Please select at least one group for a user.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              loading={groupsLoading}
              maxTagCount={3}
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
              defaultMessage: 'Chat Groups',
            })}
            name="chats"
          >
            <Select
              disabled={saving}
              loading={chatsLoading}
              maxTagCount={3}
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
                  defaultMessage: 'Approver Groups',
                })}
                name="approverGroups"
              >
                <Select
                  disabled={saving}
                  loading={chatsLoading}
                  maxTagCount={3}
                  mode="multiple"
                  optionFilterProp="label"
                  optionLabelProp="label"
                  options={groupsData?.filter(({ value }) =>
                    form.getFieldValue('groups').includes(value)
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
                  form.getFieldValue('groups').includes(value)
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
            style={{
              flexDirection: 'row',
              justifyItems: 'center',
              marginBottom: 0,
            }}
            valuePropName="checked"
          >
            <Switch
              className="scheme-detail-switch"
              disabled={saving}
              style={{ marginLeft: 10, marginTop: -22 }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Allow user to report to all businesses',
            })}
            name="reportToAllBusinesses"
            style={{
              flexDirection: 'row',
              justifyItems: 'center',
              marginBottom: 0,
            }}
            valuePropName="checked"
          >
            <Switch
              className="scheme-detail-switch"
              disabled={saving}
              style={{ marginLeft: 10, marginTop: -22 }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Title level={4} style={{ marginBottom: 15 }}>
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
              {intl.formatMessage({
                defaultMessage: 'Invite User',
              })}
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

export default AddUser;
