import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { Role, SchemeGroupsQuery } from "graphql/generated";

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  role: Role;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
}

const AddUser = ({ onSubmit, onClose, groupsData, groupsLoading }: Props) => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter a name for the new user.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              required: true,
              message: "Please enter a email address for the new user.",
            },
          ]}
        >
          <Input type="email" />
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
              message: "Please enter a organisation for the new user.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="role"
          label="Role"
          rules={[
            { required: true, message: "Please select a role for the user." },
          ]}
        >
          <Select defaultValue={Role.User}>
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
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="groups"
          label="Groups"
          rules={[
            {
              required: true,
              message: "Please selected at least one group for a user.",
            },
          ]}
        >
          <Select loading={groupsLoading} mode="multiple" maxTagCount={2}>
            {groupsData?.groups.map((group) => (
              <Select.Option key={group.id} value={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item>
      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Button onClick={onClose}>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Invite User
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddUser;
