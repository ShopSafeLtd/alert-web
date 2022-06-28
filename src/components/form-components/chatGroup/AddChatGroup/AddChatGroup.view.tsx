import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { Role, SchemeGroupsQuery } from "graphql/generated";

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
}

const AddChatGroup = ({ onSubmit, onClose }: Props) => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: "Please enter a name for the new chat group.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter a description for the new chat group.",
            },
          ]}
        >
          <Input />
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
            Create A New Chat Group
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddChatGroup;
