import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { CrimeType, TagType } from 'graphql/generated';
import type { Scheme } from 'state';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
  schemes: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  type?: TagType;
  userSchemes: Scheme[];
  schemeId: string;
}

const AddCrimeType = ({
  onSubmit,
  onClose,
  saving,
  type = TagType.IncidentCrimeType,
  schemeId,
  userSchemes,
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

      {type === TagType.IncidentCrimeType && (
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
            <Select
              disabled={saving}
              options={[
                { value: CrimeType.Burglary, label: 'Burglary' },
                { value: CrimeType.CriminalDamage, label: 'Criminal Damage' },
                { value: CrimeType.Drugs, label: 'Drugs' },
                { value: CrimeType.FraudForgery, label: 'Fraud & Forgery' },
                { value: CrimeType.Robbery, label: 'Robbery' },
                { value: CrimeType.SexualOffences, label: 'Sexual Offences' },
                { value: CrimeType.TheftHandling, label: 'Theft & Handling' },
                {
                  value: CrimeType.Violence,
                  label: 'Violence Against The Person',
                },
                { value: CrimeType.Other, label: 'Other' },
              ]}
            />
          </Form.Item>
        </Col>
      )}
    </Row>
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
