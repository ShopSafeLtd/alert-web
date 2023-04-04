import React from 'react';
import type {
  UserQuery,
  SchemeGroupsQuery,
  SchemeChatsQuery,
} from 'graphql/generated';
import { Role } from 'graphql/generated';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Skeleton,
  Switch,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';

const { Title } = Typography;

interface FormData {
  fullName: string;
  email: string;
  business: {
    value: string;
    label: string;
  };
  role: Role;
  groups: string[];
  chats: string[];
  incidentEmail: boolean;
  incidentPush: boolean;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
  messagePush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  publicName: boolean;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: UserQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const EditUser = ({
  onSubmit,
  onClose,
  data,
  loading,
  groupsData,
  groupsLoading,
  chatsData,
  chatsLoading,
  saving,
  onSearchBusiness,
}: Props): JSX.Element =>
  !data && loading ? (
    <Skeleton />
  ) : (
    <Form<FormData>
      initialValues={{
        fullName: data?.user?.fullName,
        email: data?.user?.email,
        business: {
          label: data?.user?.businesses[0]?.name,
          value: data?.user?.businesses[0]?.id,
        },
        role: data?.user?.schemes && data?.user?.schemes[0].role,
        groups:
          data?.user?.groups && data.user.groups.length > 0
            ? data.user.groups.map(({ id }) => id)
            : [],
        chats:
          data?.user?.chats && data.user.chats.length > 0
            ? data.user.chats.map(({ chat }) => chat.id)
            : [],
        publicName: data?.user?.publicName,
        incidentEmail: data?.user?.incidentEmail,
        incidentPush: data?.user?.incidentPush,
        subscribedIncidentOnly: data?.user?.subscribedIncidentOnly,
        subscribedOffenderOnly: data?.user?.subscribedOffenderOnly,
        messagePush: data?.user?.messagePush,
        offenderEmail: data?.user?.offenderEmail,
        offenderPush: data?.user?.offenderPush,
      }}
      layout="vertical"
      onFinish={onSubmit}
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
                message: 'Please enter a name for the user.',
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: 'Please enter a email address for the user.',
              },
            ]}
          >
            <Input disabled={saving} type="email" />
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
                required: true,
                message: 'Please select a business for the new user.',
              },
            ]}
          >
            <DebounceSelect
              showSearch
              allowClear
              disabled={saving}
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
            <Select disabled={saving}>
              <Select.Option key={Role.User} value={Role.User}>
                User
              </Select.Option>
              <Select.Option key={Role.ContentAdmin} value={Role.ContentAdmin}>
                Content Admin
              </Select.Option>
              <Select.Option key={Role.SchemeAdmin} value={Role.SchemeAdmin}>
                Scheme Admin
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
                message: 'Please selected at least one group for the user.',
              },
            ]}
          >
            <Select
              loading={groupsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              options={groupsData?.groups.map((group) => ({
                value: group.id,
                label: group.name,
              }))}
              optionFilterProp="label"
              optionLabelProp="label"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="chats" label="Chats Group">
            <Select
              loading={chatsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              options={chatsData?.chats.map((chat) => ({
                value: chat.id,
                label: chat.name,
              }))}
              optionFilterProp="label"
              optionLabelProp="label"
            >
              {chatsData?.chats.map((chat) => (
                <Select.Option key={chat.id} value={chat.id}>
                  {chat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
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
              Save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

export default EditUser;
