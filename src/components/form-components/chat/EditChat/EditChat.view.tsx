import React from 'react';
import type { ChatQuery, ListSchemeUsersQuery } from 'graphql/generated';
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
  !data && loading ? (
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
            label="Name"
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
          <Form.Item name="description" label="Description">
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Form.Item name="user" label="Users">
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              filterOption
              optionFilterProp="label"
              options={usersData?.users.map((user) => ({
                value: user.id,
                label: `${user.fullName} (${user.businesses[0]?.name})`,
              }))}
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
              Save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

export default EditChat;
