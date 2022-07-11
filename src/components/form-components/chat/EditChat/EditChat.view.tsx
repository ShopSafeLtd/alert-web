import React from 'react';
import { ChatQuery, ListSchemeUsersQuery } from 'graphql/generated';
import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';

interface FormData {
  name: string;
  description: string;
  user: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: ChatQuery | undefined;
  loading: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const EditChat = ({
  onSubmit,
  onClose,
  data,
  loading,
  usersData,
  usersLoading,
  saving,
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        name: data?.chat?.name,
        description: data?.chat?.description,
        user:
          data?.chat?.members && data.chat.members.length > 0
            ? data.chat.members.map(({ user }) => user.id)
            : [],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label="Chat Group Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the chat group.',
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item name="description" label="Chat Group Description">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Form.Item name="user" label="users">
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
            >
              {usersData?.users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.fullName}-{user.organisation}
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

export default EditChat;
