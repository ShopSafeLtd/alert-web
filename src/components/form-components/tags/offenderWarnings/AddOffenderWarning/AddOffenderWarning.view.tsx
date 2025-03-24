import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  description: string;
  name: string;
  schemes: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  schemeId: string;
  userSchemes: { scheme: { id: string; name: string } }[];
}

const AddOffenderWarning = ({
  onClose,
  onSubmit,
  saving,
  schemeId,
  userSchemes,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form
      initialValues={{
        schemes: [schemeId],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Offender warnings are added to offenders to highlight important things about them, for example that they are prone to violence.',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a name for the new offender warning.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
          >
            <Input.TextArea disabled={saving} rows={10} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Schemes',
            })}
            name="schemes"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one scheme.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              mode="multiple"
              options={userSchemes.map((scheme) => ({
                label: scheme.scheme.name,
                value: scheme.scheme.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddOffenderWarning;
