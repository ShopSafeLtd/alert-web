import React from 'react';
import { Button, Col, Form, Input, Row, Skeleton, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { TagQuery } from 'graphql/tag/queries/tag.generated';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const EditOffenderWarning = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        name: data?.tag?.name,
        description: data?.tag?.description,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Update the necessary fields for the offender warning.',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a name for the offender warning.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
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
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditOffenderWarning;
