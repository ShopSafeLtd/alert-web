/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

export interface FormData {
  name: string;
  content: string;
  schemes: string[];
}

const createEditStatementView = ({
  data,
  saving,
  form,
  onSubmit,
  schemes,
  onClose,
}: {
  data: FormData;
  saving: boolean;
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  schemes: {
    label: string;
    value: string;
  }[];
  onClose: () => void;
}) => (
  <Form<FormData>
    form={form}
    initialValues={{
      ...data,
    }}
    onFinish={onSubmit}
    layout="vertical"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please enter a name',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Schemes"
      name="schemes"
      rules={[
        {
          required: true,
          message: 'Please select at least one scheme',
        },
      ]}
    >
      <Select mode="multiple" placeholder="Please select" options={schemes} />
    </Form.Item>
    <Form.Item
      label="Content"
      name="content"
      rules={[
        {
          required: true,
          message: 'Please enter content',
        },
      ]}
    >
      <Input.TextArea
        autoSize={{
          minRows: 8,
          maxRows: 20,
        }}
      />
    </Form.Item>

    <Form.Item>
      <Row style={{ marginTop: 10 }} gutter={10} justify="end">
        <Col>
          <Button disabled={saving} onClick={() => onClose()}>
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
            Submit
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default createEditStatementView;
