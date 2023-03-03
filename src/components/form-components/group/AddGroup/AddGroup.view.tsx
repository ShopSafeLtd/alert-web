import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { ListSchemeUsersQuery } from 'graphql/generated';

interface FormData {
  name: string;
  description: string;
  users: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const AddGroup = ({
  onSubmit,
  onClose,
  usersData,
  usersLoading,
  saving,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={23}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter a name for the new group.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>

      <Col span={23}>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter a description for the new group.',
            },
          ]}
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={23}>
        <Form.Item
          name="users"
          label="Users"
          rules={[
            {
              required: true,
              message: 'Please selected at least one user for a group.',
            },
          ]}
        >
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
            type="primary"
            htmlType="submit"
            disabled={saving}
            loading={saving}
          >
            Create Group
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddGroup;
