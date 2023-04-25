import React from 'react';

import { Role } from 'graphql/generated';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import type { SelectOptions } from 'types/DataType';
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
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  businessProvided: boolean;
  schemeLoading: boolean;
  selectedRole: Role | undefined;
  setSelectedRole: (value: Role) => void;
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
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
}: Props): JSX.Element => (
  <Form<FormData>
    form={form}
    initialValues={{
      fullName: '',
      email: '',
      business: {
        value: '',
        label: '',
      },
      role: Role.User,
      postcode: '',
      street: '',
      townCity: '',
      building: '',
      county: '',
      groups: [],
      chats: [],
      publicName: true,
    }}
    layout="vertical"
    onFinish={onSubmit}
    onValuesChange={onValuesChange}
  >
    <Title level={4} style={{ marginBottom: 15 }}>
      User Detail:
    </Title>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: 'Please enter a name for the new user.',
            },
          ]}
        >
          <Input readOnly={existingUser} disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              required: true,
              message: 'Please enter a email address for the new user.',
            },
          ]}
        >
          <Input readOnly={existingUser} disabled={saving} type="email" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="business"
          label="Business"
          rules={[
            {
              required: !existingUser,
              message: 'Please select a business for the new user.',
            },
          ]}
        >
          <DebounceSelect
            showSearch
            allowClear
            disabled={saving || existingUser || businessProvided}
            placeholder="Search for a business..."
            fetchOptions={onSearchBusiness}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="role"
          label="Role"
          rules={[
            { required: true, message: 'Please select a role for the user.' },
          ]}
        >
          <Select
            disabled={saving}
            onChange={(value) => setSelectedRole(value)}
          >
            <Select.Option key={Role.User} value={Role.User}>
              <Typography.Text>User</Typography.Text>
              <Typography.Paragraph
                type="secondary"
                style={{ fontSize: 13, margin: 0 }}
              >
                A basic user account that all submitting data but <br /> no
                admin features.
              </Typography.Paragraph>
            </Select.Option>
            <Select.Option key={Role.ContentAdmin} value={Role.ContentAdmin}>
              <Typography.Text>Content Admin</Typography.Text>
              <Typography.Paragraph
                type="secondary"
                style={{ fontSize: 13, margin: 0, fontWeight: 400 }}
              >
                An account that allows for submitting and administering <br />{' '}
                data but no access to settings.
              </Typography.Paragraph>
            </Select.Option>
            <Select.Option key={Role.SchemeAdmin} value={Role.SchemeAdmin}>
              <Typography.Text>Scheme Admin</Typography.Text>
              <Typography.Paragraph
                type="secondary"
                style={{ fontSize: 13, margin: 0 }}
              >
                Full administrator account with access to all settings.
              </Typography.Paragraph>
            </Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Title level={4} style={{ marginBottom: 15 }}>
      User Groups:
    </Title>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="groups"
          label="Groups"
          rules={[
            {
              required: true,
              message: 'Please selected at least one group for a user.',
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
        <Form.Item name="chats" label="Chat Groups">
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
    {selectedRole === Role.SchemeAdmin &&
      selectedGroups &&
      selectedGroups.length > 0 && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="approverGroups" label="Approver Groups">
              <Select
                loading={chatsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={groupsData?.filter(({ value }) =>
                  selectedGroups.includes(value)
                )}
                optionFilterProp="label"
                optionLabelProp="label"
              />
            </Form.Item>
          </Col>
        </Row>
      )}

    <Form.Item
      label="Show user name in the system"
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

    <Title level={4} style={{ marginBottom: 15 }}>
      Notification Settings:
    </Title>
    <Form.Item
      label="Only notify users for their own and subscribed incidents:"
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
      label="Send app notifications for incidents:"
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
      label="Send emails for incidents:"
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
      label="Only notify users for their own and subscribed offenders:"
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
      label="Send app notifications for offenders:"
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
      label="Send emails for offenders:"
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
      label="Send app notifications for new chat messages:"
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
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            htmlType="submit"
          >
            Invite User
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddUser;
