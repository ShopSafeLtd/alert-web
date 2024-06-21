import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { CustomGalleryData } from 'types/DataType';
import type { FormData } from './useAddCustomGallery';

const { Text } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  data?: CustomGalleryData;
  groupsData:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  groupsLoading: boolean;
}

const AddCustomGallery = ({
  onSubmit,
  onClose,
  saving,
  data,
  groupsData,
  groupsLoading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        name: data?.name,
        description: data?.description,
        groups: data?.groups,
      }}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Custom galleries are added to offenders or vehicles to sort.',
            })}
          </Text>
        </Col>
      </Row>
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
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please selected at least one group for the custom gallery.',
                }),
              },
            ]}
          >
            <Select
              loading={groupsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              options={groupsData}
              optionFilterProp="label"
              optionLabelProp="label"
            />
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
              {data
                ? intl.formatMessage({
                    defaultMessage: 'Save',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Create',
                  })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddCustomGallery;
