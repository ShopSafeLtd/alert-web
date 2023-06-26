import React from 'react';
import type { TagQuery } from 'graphql/generated';
import { Button, Col, Form, Input, Row, Skeleton, Typography } from 'antd';
import { useIntl } from 'react-intl';

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
              id: 'UHXcnM',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a name for the offender warning.',
                  id: '5988Gb',
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
              id: 'Q8Qw5B',
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
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditOffenderWarning;
