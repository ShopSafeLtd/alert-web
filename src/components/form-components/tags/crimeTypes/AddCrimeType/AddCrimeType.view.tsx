import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { CrimeType } from 'graphql/generated';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
}

const AddCrimeType = ({ onSubmit, onClose, saving }: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row style={{ marginBottom: 30 }}>
      <Col>
        <Text type="secondary">
          Crime types are used to catagories incidents that are submitted by
          members.
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
              message: 'Please enter a name for the new crime type.',
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

      <Col span={24}>
        <Form.Item
          name="crimeType"
          label="Crime Type Category"
          rules={[
            {
              required: true,
              message: 'Please select a category for the new crime type.',
            },
          ]}
        >
          <Select disabled={saving}>
            <Select.Option value={CrimeType.Burglary}>Burglary</Select.Option>
            <Select.Option value={CrimeType.CriminalDamage}>
              Criminal Damage
            </Select.Option>
            <Select.Option value={CrimeType.Drugs}>Drugs</Select.Option>
            <Select.Option value={CrimeType.FraudForgery}>
              Fraud & Forgery
            </Select.Option>
            <Select.Option value={CrimeType.Robbery}>Robbery</Select.Option>
            <Select.Option value={CrimeType.SexualOffences}>
              Sexual Offences
            </Select.Option>
            <Select.Option value={CrimeType.TheftHandling}>
              Theft & Handling
            </Select.Option>
            <Select.Option value={CrimeType.Violence}>
              Violence Against The Person
            </Select.Option>
            <Select.Option value={CrimeType.Other}>Other</Select.Option>
          </Select>
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

export default AddCrimeType;
