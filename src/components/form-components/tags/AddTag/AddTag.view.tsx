import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddTag';

const { Text } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  description?: string;
}

const AddTag = ({
  onSubmit,
  onClose,
  saving,
  description,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      {description && (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Text type="secondary">{description}</Text>
          </Col>
        </Row>
      )}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the custom gallery.',
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
            })}
          >
            <Input.TextArea rows={10} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddTag;
