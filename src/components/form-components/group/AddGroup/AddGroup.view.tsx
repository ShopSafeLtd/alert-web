import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import type { SelectOptions } from 'types/DataType';
import type { FormData } from './useAddGroup';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
}

const AddGroup = ({
  onSubmit,
  onClose,
  usersData,
  adminUsersData,
  usersLoading,
  saving,
  selectedUsers,
  setSelectedUsers,
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
              message: 'Please selected at least one user for the new group.',
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
            options={usersData}
            onChange={(value) => setSelectedUsers(value)}
          />
        </Form.Item>
      </Col>
    </Row>
    {selectedUsers && selectedUsers.length > 0 && (
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item name="approvers" label="Approvers">
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              options={adminUsersData?.filter(({ value }) =>
                selectedUsers.includes(value)
              )}
              optionFilterProp="label"
              optionLabelProp="label"
            />
          </Form.Item>
        </Col>
      </Row>
    )}
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
