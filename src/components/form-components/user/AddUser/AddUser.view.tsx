/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
import React from 'react';

import { Role } from 'graphql/generated';
import type { FormInstance } from 'antd';
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
import DebounceSelect from 'components/form-components/DebounceSelect';
import type { BusinessData, SelectOptions } from 'types/DataType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddUser';

const { Title } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  form: FormInstance<FormData>;
  existingUser: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
  businessProvided: boolean;
  schemeLoading: boolean;
  selectedRole: Role | undefined;
  setSelectedRole: (value: Role) => void;
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const AddUser = ({
  onSubmit,
  form,
  onClose,
  groupsData,
  groupsLoading,
  chatsData,
  chatsLoading,
  saving,
  onValuesChange,
  onSearchBusiness,
  existingUser,
  businessProvided,
  schemeLoading,
  selectedRole,
  setSelectedRole,
  selectedGroups,
  setSelectedGroups,
  addBusinessVisible,
  toggleAddBusinessVisible,
  updateNewBusinessData,
}: Props): JSX.Element => {
  const intl = useIntl();
  // const [selectedGroups, setSelectedGroups] = useState<string[]>();

  return (
    <Form<FormData>
      form={form}
      initialValues={{
        fullName: '',
        email: '',
        businesses: [],
        role: Role.User,
        postcode: '',
        street: '',
        townCity: '',
        building: '',
        county: '',
        groups: [],
        chats: [],
        publicName: true,
        reportToAllBusinesses: false,
      }}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
    >
      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({ defaultMessage: 'User Detail:', id: 'phPrn9' })}
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fullName"
            label={intl.formatMessage({
              defaultMessage: 'Full Name',
              id: 'TemVby',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new user.',
                  id: 'Ev5c0L',
                }),
              },
            ]}
          >
            <Input readOnly={existingUser} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label={intl.formatMessage({
              defaultMessage: 'Email Address',
              id: 'xxQxLE',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter an email address for the new user.',
                  id: 'suKy40',
                }),
              },
            ]}
          >
            <Input readOnly={existingUser} disabled={saving} type="email" />
          </Form.Item>
        </Col>
      </Row>

      {businessProvided ? (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="businesses"
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
                id: 'D0tMhW',
              })}
              rules={[
                {
                  required: !existingUser,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one business for the new user.',
                    id: '/OYfH0',
                  }),
                },
              ]}
            >
              <DebounceSelect
                showSearch
                allowClear
                mode="multiple"
                maxTagCount={3}
                disabled={saving || businessProvided}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                  id: 'qaJxSS',
                })}
                fetchOptions={onSearchBusiness}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label={intl.formatMessage({
                defaultMessage: 'Role',
                id: '1ZgrhW',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a role for the user.',
                    id: 'vJrE3G',
                  }),
                },
              ]}
            >
              <Select
                disabled={saving}
                onChange={(value) => setSelectedRole(value)}
              >
                <Select.Option key={Role.User} value={Role.User}>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'User',
                      id: 'EwRIOm',
                    })}
                  </Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ fontSize: 13, margin: 0 }}
                  >
                    {intl.formatMessage({
                      defaultMessage:
                        'A basic user account that can submit data but has no admin features.',
                      id: 'CA2t76',
                    })}
                  </Typography.Paragraph>
                </Select.Option>
                <Select.Option
                  key={Role.ContentAdmin}
                  value={Role.ContentAdmin}
                >
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Content Admin',
                      id: 'juchkY',
                    })}
                  </Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ fontSize: 13, margin: 0, fontWeight: 400 }}
                  >
                    {intl.formatMessage({
                      defaultMessage:
                        'An account that allows for submitting and administering data but has no access to settings.',
                      id: 'Cv0frO',
                    })}
                  </Typography.Paragraph>
                </Select.Option>
                <Select.Option key={Role.GroupAdmin} value={Role.GroupAdmin}>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Group Admin',
                      id: 'UmJl0N',
                    })}
                  </Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ fontSize: 13, margin: 0, fontWeight: 400 }}
                  >
                    {intl.formatMessage({
                      defaultMessage:
                        'An account that allows for submitting and administering data and limited access to settings within their group.',
                      id: 'Y3CqF1',
                    })}
                  </Typography.Paragraph>
                </Select.Option>

                <Select.Option key={Role.SchemeAdmin} value={Role.SchemeAdmin}>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Scheme Admin',
                      id: 'ZENz1B',
                    })}
                  </Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ fontSize: 13, margin: 0 }}
                  >
                    {intl.formatMessage({
                      defaultMessage:
                        'A full administrator account with access to all settings.',
                      id: 'k5jo6H',
                    })}
                  </Typography.Paragraph>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <>
          <Row gutter={16}>
            <Col flex={1}>
              <Row gutter={20} align="middle">
                <Col flex={1}>
                  <Form.Item
                    name="businesses"
                    label={intl.formatMessage({
                      defaultMessage: 'Businesses',
                      id: 'D0tMhW',
                    })}
                    rules={[
                      {
                        required: !existingUser,
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select at least one business for the new user.',
                          id: '/OYfH0',
                        }),
                      },
                    ]}
                  >
                    <DebounceSelect
                      showSearch
                      allowClear
                      mode="multiple"
                      maxTagCount={3}
                      disabled={saving || businessProvided}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Search for a business...',
                        id: 'qaJxSS',
                      })}
                      fetchOptions={onSearchBusiness}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>

                <Col>
                  <Button
                    disabled={saving}
                    style={{ color: 'red', padding: 8, marginTop: 3 }}
                    onClick={toggleAddBusinessVisible}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'New Business',
                      id: 'KepKya',
                    })}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="role"
                label={intl.formatMessage({
                  defaultMessage: 'Role',
                  id: '1ZgrhW',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please select a role for the user.',
                      id: 'vJrE3G',
                    }),
                  },
                ]}
              >
                <Select
                  disabled={saving}
                  onChange={(value) => setSelectedRole(value)}
                >
                  <Select.Option key={Role.User} value={Role.User}>
                    {intl.formatMessage({
                      defaultMessage: 'User',
                      id: 'EwRIOm',
                    })}
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: 13, margin: 0 }}
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          'A basic user account that can submit data but has no admin features.',
                        id: 'CA2t76',
                      })}
                    </Typography.Paragraph>
                  </Select.Option>
                  <Select.Option
                    key={Role.ContentAdmin}
                    value={Role.ContentAdmin}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Content Admin',
                      id: 'juchkY',
                    })}
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: 13, margin: 0, fontWeight: 400 }}
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          'An account that allows for submitting and administering data but has no access to settings.',
                        id: 'Cv0frO',
                      })}
                    </Typography.Paragraph>
                  </Select.Option>
                  <Select.Option
                    key={Role.SchemeAdmin}
                    value={Role.SchemeAdmin}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Scheme Admin',
                      id: 'ZENz1B',
                    })}
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: 13, margin: 0 }}
                    >
                      {intl.formatMessage({
                        defaultMessage:
                          'A full administrator account with access to all settings.',
                        id: 'k5jo6H',
                      })}
                    </Typography.Paragraph>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({ defaultMessage: 'User Groups:', id: 'OfXLJQ' })}
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Groups',
              id: 'hzmswI',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one group for a user.',
                  id: '0h0TWW',
                }),
              },
            ]}
          >
            <Select
              loading={groupsLoading}
              disabled={saving}
              onChange={(value) => setSelectedGroups(value)}
              mode="multiple"
              maxTagCount={3}
              options={groupsData}
              optionFilterProp="label"
              optionLabelProp="label"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="chats"
            label={intl.formatMessage({
              defaultMessage: 'Chat Groups',
              id: '8TntzL',
            })}
          >
            <Select
              loading={chatsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              options={chatsData}
              optionFilterProp="label"
              optionLabelProp="label"
            />
          </Form.Item>
        </Col>
      </Row>

      {selectedGroups && selectedGroups.length > 0 && (
        <Row gutter={16}>
          {selectedRole === Role.SchemeAdmin && (
            <Col span={12}>
              <Form.Item
                name="approverGroups"
                label={intl.formatMessage({
                  defaultMessage: 'Approver Groups',
                  id: 'D/FCTs',
                })}
              >
                <Select
                  loading={chatsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  options={groupsData?.filter(({ value }) =>
                    form.getFieldValue('groups').includes(value)
                  )}
                  optionFilterProp="label"
                  optionLabelProp="label"
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              name="defaultGroups"
              label={intl.formatMessage({
                defaultMessage: 'Default Groups',
                id: '2KZp/e',
              })}
            >
              <Select
                loading={chatsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={groupsData?.filter(({ value }) =>
                  form.getFieldValue('groups').includes(value)
                )}
                optionFilterProp="label"
                optionLabelProp="label"
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
              id: 'YxFuTi',
            })}
            name="publicName"
            valuePropName="checked"
            style={{
              marginBottom: 0,
              flexDirection: 'row',
              justifyItems: 'center',
            }}
          >
            <Switch
              disabled={saving}
              style={{ marginLeft: 10, marginTop: -22 }}
              className="scheme-detail-switch"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Allow user to report to all businesses',
              id: 'OILM5t',
            })}
            name="reportToAllBusinesses"
            valuePropName="checked"
            style={{
              marginBottom: 0,
              flexDirection: 'row',
              justifyItems: 'center',
            }}
          >
            <Switch
              disabled={saving}
              style={{ marginLeft: 10, marginTop: -22 }}
              className="scheme-detail-switch"
            />
          </Form.Item>
        </Col>
      </Row>

      <Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({
          defaultMessage: 'Notification Settings:',
          id: 'op0fQr',
        })}
      </Title>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage:
            'Only notify users for their own and subscribed incidents:',
          id: 'q92TAS',
        })}
        name="subscribedIncidentOnly"
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for incidents:',
          id: 'hwc1SW',
        })}
        name="incidentPush"
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Send emails for incidents:',
          id: 'P8o2fl',
        })}
        name="incidentEmail"
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        name="subscribedOffenderOnly"
        label={intl.formatMessage({
          defaultMessage:
            'Only notify users for their own and subscribed offenders:',
          id: 'PxTS+p',
        })}
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        name="offenderPush"
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for offenders:',
          id: 'kOXe4z',
        })}
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        name="offenderEmail"
        label={intl.formatMessage({
          defaultMessage: 'Send emails for offenders:',
          id: 'jhu5sz',
        })}
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>
      <Form.Item
        name="messagePush"
        label={intl.formatMessage({
          defaultMessage: 'Send app notifications for new chat messages:',
          id: 'S4ojdm',
        })}
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
          loading={schemeLoading}
        />
      </Form.Item>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Invite User',
                id: 'Mh7T6y',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        open={addBusinessVisible}
        onClose={toggleAddBusinessVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
          id: 'p47asT',
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
