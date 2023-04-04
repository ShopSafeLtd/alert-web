import React from 'react';
import { Button, Form, Input, Row, Col, Typography } from 'antd';
import type { LocationData } from 'types/DataType';

interface Props {
  onClose: () => void;
  onSubmit: (value: LocationData) => void;
  saving: boolean;
}

const AddOffender = ({ onClose, onSubmit, saving }: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Typography.Title level={4} style={{ marginBottom: 15 }}>
      New Location:
    </Typography.Title>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="building" label="Building">
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="street"
          label="Street"
          rules={[
            {
              required: true,
              message: 'Please enter a street for the new location.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="townCity"
          label="Town/City"
          rules={[
            {
              required: true,
              message: 'Please enter a town/city for the new location.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="county" label="County">
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="postcode"
          label="Postcode"
          rules={[
            {
              required: true,
              message: 'Please enter a postcode for the new location.',
            },
          ]}
        >
          <Input disabled={saving} />
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
            disabled={saving}
            loading={saving}
            type="primary"
            htmlType="submit"
          >
            Add New Location
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);
export default AddOffender;
