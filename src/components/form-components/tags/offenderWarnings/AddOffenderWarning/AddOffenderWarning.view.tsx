import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import type { Scheme } from 'state';
import { useIntl } from 'react-intl';

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
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
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
            {intl.formatMessage({
              defaultMessage:
                'Offender warnings are added to offenders to highlight important things about them, for example that they are prone to violence.',
              id: 'qeYxWJ',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a name for the new offender warning.',
                  id: 'owzkCW',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
          >
            <Input.TextArea rows={10} disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="schemes"
            label={intl.formatMessage({
              defaultMessage: 'Schemes',
              id: 'QgGevU',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one scheme.',
                  id: 'iiG8RT',
                }),
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
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Create', id: 'VzzYJk' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddOffenderWarning;
