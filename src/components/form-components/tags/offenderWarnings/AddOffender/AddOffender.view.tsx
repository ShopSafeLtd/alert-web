import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
}

const AddOffender = ({ onSubmit, onClose, saving }: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row style={{ marginBottom: 30 }}>
      <Col>
        <Text type="secondary">
          Offender warnings are added to offenders to highlight important things
          about them, for example that the are like that they are prone to
          violence.
        </Text>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={21}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter a name for the new offender warning.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>

      <Col span={21}>
        <Form.Item name="description" label="Description">
          <Input disabled={saving} />
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
            Create
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddOffender;
