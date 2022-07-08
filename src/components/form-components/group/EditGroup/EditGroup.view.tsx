import React from 'react';
import { GroupQuery, ListSchemeUsersQuery } from 'graphql/generated';
import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';

interface FormData {
  name: string;
  description: string;
  users: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: GroupQuery | undefined;
  loading: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const EditUser = ({
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
        name: data?.group?.name,
        description: data?.group?.description,
        users:
          data?.group?.users && data.group.users.length > 0
            ? data.group.users.map(({ id }) => id)
            : [],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label="Group Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the Group.',
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item name="description" label="Group Description">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="users"
            label="users"
            rules={[
              {
                required: true,
                message: 'Please selected at least one group for the user.',
              },
            ]}
          >
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

export default EditUser;
