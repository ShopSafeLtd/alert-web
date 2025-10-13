import type { CustomGalleryData } from 'types/DataType';

import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddCustomGallery';

const { Text } = Typography;

interface Props {
  data?: CustomGalleryData;
  groupsData:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  groupsLoading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddCustomGallery = ({
  data,
  groupsData,
  groupsLoading,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form
      initialValues={{
        description: data?.description,
        groups: data?.groups,
        name: data?.name,
      }}
      layout="vertical"
      onFinish={onSubmit}
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
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the custom gallery.',
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
              defaultMessage: 'Groups',
            })}
            name="groups"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please selected at least one group for the custom gallery.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              loading={groupsLoading}
              maxTagCount={3}
              mode="multiple"
              optionFilterProp="label"
              optionLabelProp="label"
              options={groupsData}
            />
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
