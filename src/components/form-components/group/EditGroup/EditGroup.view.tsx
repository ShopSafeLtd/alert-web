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

const EditGroup = ({
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
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the group.',
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
          <Form.Item
            name="users"
            label="Users"
            rules={[
              {
                required: true,
                message: 'Please selected at least one user for the group.',
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
                label: `${user.fullName} (${user.organisation})`,
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

export default EditGroup;
