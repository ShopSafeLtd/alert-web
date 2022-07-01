import React from 'react';
import {
  Role,
  UserQuery,
  SchemeGroupsQuery,
  SchemeChatsQuery,
} from 'graphql/generated';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
  Skeleton,
} from 'antd';
import { RoleValues } from 'types';

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
  data: UserQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
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
}: Props): JSX.Element => {
  return loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        fullName: data?.user?.fullName,
        email: data?.user?.email,
        organisation: data?.user?.organisation,
        role: data?.user?.schemes && data?.user?.schemes[0].role,
        postcode: data?.user?.addresses[0].postcode || '',
        street: data?.user?.addresses[0].street || '',
        townCity: data?.user?.addresses[0].townCity || '',
        building: data?.user?.addresses[0].building || '',
        county: data?.user?.addresses[0].county || '',
        groups:
          data?.user?.groups && data.user.groups.length > 0
            ? data.user.groups.map(({ id }) => id)
            : [],
        chats:
          data?.user?.chats && data.user.chats.length > 0
            ? data.user.chats.map(({ chat }) => chat.id)
            : [],
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
                message: 'Please enter a name for the  user.',
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
            name="organisation"
            label="Organisation"
            rules={[
              {
                required: true,
                message: 'Please enter a organisation for the user.',
              },
            ]}
          >
            <Input disabled={saving} />
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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="postcode" label="Postcode">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="street" label="Street">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="townCity" label="Town City">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="building" label="Building">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="county" label="County">
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
                message: 'Please selected at least one group for the user.',
              },
            ]}
          >
            <Select
              loading={groupsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
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
          <Form.Item name="chats" label="Chats Group">
            <Select
              loading={chatsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
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
};

export default EditUser;
