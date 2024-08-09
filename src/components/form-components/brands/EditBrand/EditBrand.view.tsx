import type { BrandQuery } from '#/views/settings/brands/graphql/queries/__generated__/brand.generated';
import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { Button, Col, Form, Input, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditBrand';

interface Props {
  data: Exclude<BrandQuery['brand'], null | undefined> | null | undefined;
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const EditOffenderWarning = ({
  data,
  form,
  loading,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return loading ? (
    <Skeleton />
  ) : (
    <Form
      form={form}
      initialValues={{
        businesses: data?.businesses.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
        description: data?.description,
        name: data?.name,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
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
        <Col span={23}>
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
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select at least one business for the new brand.',
                    }),
                    required: true,
                  },
                ]}
              >
                <BusinessesSelect
                  disabled={saving}
                  maxTagCount={3}
                  mode="multiple"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search for a business...',
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

export default EditOffenderWarning;
