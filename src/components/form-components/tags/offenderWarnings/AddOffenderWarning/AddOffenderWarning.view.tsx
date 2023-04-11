import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import type { Scheme } from 'state';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
  schemes: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  userSchemes: Scheme[];
  schemeId: string;
}

const AddOffenderWarning = ({
  onSubmit,
  onClose,
  saving,
  userSchemes,
  schemeId,
}: Props): JSX.Element => (
  <Form
    layout="vertical"
    onFinish={onSubmit}
    initialValues={{
      schemes: [schemeId],
    }}
  >
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
      <Col span={24}>
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

      <Col span={24}>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={10} disabled={saving} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="schemes"
          label="Schemes"
          rules={[
            {
              required: true,
              message: 'Please select at least one scheme.',
            },
          ]}
        >
          <Select
            disabled={saving}
            mode="multiple"
            options={userSchemes.map((scheme) => ({
              value: scheme.scheme.id,
              label: scheme.scheme.name,
            }))}
          />
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
