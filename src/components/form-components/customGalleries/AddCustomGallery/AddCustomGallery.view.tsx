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

const AddOffenderWarning = ({
  onSubmit,
  onClose,
  saving,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row style={{ marginBottom: 30 }}>
      <Col>
        <Text type="secondary">
          Custom galleries are added to offenders to sort.
        </Text>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter a name for the new custom gallery.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={10} disabled={saving} />
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

export default AddOffenderWarning;
