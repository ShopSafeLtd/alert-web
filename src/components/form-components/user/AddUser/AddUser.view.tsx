import React from 'react';
import { Role, SchemeGroupsQuery, SchemeChatsQuery } from 'graphql/generated';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';

const { Title } = Typography;

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  role: Role;
  postcode: string;
  street: string;
  townCity: string;
  building: string;
  county: string;
  groups: string[];
  chats: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  form: FormInstance<FormData>;
  existingUser: boolean;
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

  existingUser,
}: Props): JSX.Element => (
  <Form<FormData>
    form={form}
    initialValues={{
      fullName: '',
      email: '',
      organisation: '',
      role: Role.User,
      postcode: '',
      street: '',
      townCity: '',
      building: '',
      county: '',
      groups: [],
      chats: [],
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
          name="organisation"
          label="Organisation"
          rules={[
            {
              required: true,
              message: 'Please enter a organisation for the new user.',
            },
          ]}
        >
          <Input readOnly={existingUser} disabled={saving} />
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
          <Select>
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
      User Address:
    </Title>
    <Row gutter={60}>
      <Col span={8}>
        <Form.Item name="building" label="Building">
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="street"
          label="Street"
          rules={[
            {
              required: true,
              message: 'Please enter a town/city for the address.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={60}>
      <Col span={8}>
        <Form.Item
          name="townCity"
          label="Town/City"
          rules={[
            {
              required: true,
              message: 'Please enter a town/city for the address.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="county" label="County">
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={60}>
      <Col span={8}>
        <Form.Item
          name="postcode"
          label="Postcode"
          rules={[
            {
              required: true,
              message: 'Please enter postcode for the address.',
            },
          ]}
        >
          <Input disabled={saving} />
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
            mode="multiple"
            maxTagCount={2}
            options={groupsData?.groups.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
            optionFilterProp="label"
            optionLabelProp="label"
          >
            {groupsData?.groups.map((group) => (
              <Select.Option key={group.id} value={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="chats" label="Chat Groups">
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
          />
        </Form.Item>
      </Col>
    </Row>

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
