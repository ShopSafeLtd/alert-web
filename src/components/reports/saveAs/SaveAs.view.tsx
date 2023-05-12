import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';

interface OnSubmitValues {
  name: string;
}

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  onClose: () => void;
}

const SaveAs = ({ onSubmit, saving, onClose }: Props) => (
  <Card style={{ marginLeft: 20, marginRight: 20 }}>
    <Form<OnSubmitValues>
      initialValues={{
        name: '',
      }}
      onFinish={onSubmit}
    >
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input a name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={saving}
              type="primary"
              htmlType="submit"
            >
              Save As
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </Card>
);

export default SaveAs;
