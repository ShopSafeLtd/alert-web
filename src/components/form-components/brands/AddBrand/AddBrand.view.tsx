import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddBrand';

interface Props {
  form: FormInstance<FormData>;
  onClose: () => void;

  onSubmit: (value: FormData) => void;

  saving: boolean;
}

const AddBrand = ({
  form,
  onClose,

  onSubmit,

  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Typography.Title level={4} style={{ marginBottom: 15 }}>
        {intl.formatMessage({ defaultMessage: 'Brand Detail:' })}
      </Typography.Title>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the brand.',
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
      </Row>
      <Row gutter={16}>
        <Col flex={1}>
          <Row align="middle" gutter={20}>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Businesses',
                })}
                name="businesses"
              >
                <BusinessesSelect
                  maxTagCount="responsive"
                  mode="multiple"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Businesses',
                  })}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
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
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddBrand;
