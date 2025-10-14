/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

export interface FormData {
  content: string;
  name: string;
  schemes: string[];
}

const createEditStatementView = ({
  data,
  form,
  onClose,
  onSubmit,
  saving,
  schemes,
}: {
  data: FormData;
  form: FormInstance<FormData>;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  saving: boolean;
  schemes: {
    label: string;
    value: string;
  }[];
}) => (
  <Form<FormData>
    form={form}
    initialValues={{
      ...data,
    }}
    layout="vertical"
    onFinish={onSubmit}
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          message: 'Please enter a name',
          required: true,
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
          message: 'Please select at least one scheme',
          required: true,
        },
      ]}
    >
      <Select mode="multiple" options={schemes} placeholder="Please select" />
    </Form.Item>
    <Form.Item
      label="Content"
      name="content"
      rules={[
        {
          message: 'Please enter content',
          required: true,
        },
      ]}
    >
      <Input.TextArea
        autoSize={{
          maxRows: 20,
          minRows: 8,
        }}
      />
    </Form.Item>

    <Form.Item>
      <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
        <Col>
          <Button disabled={saving} onClick={() => onClose()}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            htmlType="submit"
            loading={saving}
            type="primary"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default createEditStatementView;
