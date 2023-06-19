import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';

interface AddressForm {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
}

const NewOffenderAddress = ({ onClose, onSubmit }: Props) => (
  <Form<AddressForm> layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="alias"
          label="Label"
          tooltip="A friendly name for the address to identify it, such as home"
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="building" label="Building">
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="street"
          label="Street"
          rules={[
            {
              required: true,
              message: 'Please enter a street for the new address.',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="townCity"
          label="Town/City"
          rules={[
            {
              required: true,
              message: 'Please enter a town/city for the new address.',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="county" label="County">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="postcode"
          label="Postcode"
          rules={[
            {
              required: true,
              message: 'Please enter a postcode for the new address.',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item>
      <Row style={{ marginTop: 30 }} gutter={10} justify="end">
        <Col>
          <Button onClick={onClose}>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Add Address
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default NewOffenderAddress;
