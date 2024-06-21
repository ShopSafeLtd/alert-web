import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Skeleton, Typography } from 'antd';
import { useIntl } from 'react-intl';
import DebounceSelect from '../../DebounceSelect';
import type { FormData } from './useEditBrand';
import type { BrandQuery } from '#/views/settings/brands/graphql/queries/brand.generated';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: Exclude<BrandQuery['brand'], undefined | null> | null | undefined;
  loading: boolean;
  saving: boolean;
  form: FormInstance<FormData>;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
}

const EditOffenderWarning = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
  form,
  onSearchBusiness,
}: Props): JSX.Element => {
  const intl = useIntl();
  return loading ? (
    <Skeleton />
  ) : (
    <Form
      form={form}
      initialValues={{
        name: data?.name,
        description: data?.description,
        businesses: data?.businesses.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
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
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the brand.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
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
      <Row gutter={16}>
        <Col flex={1}>
          <Row gutter={20} align="middle">
            <Col flex={1}>
              <Form.Item
                name="businesses"
                label={intl.formatMessage({
                  defaultMessage: 'Businesses',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select at least one business for the new brand.',
                    }),
                  },
                ]}
              >
                <DebounceSelect
                  showSearch
                  allowClear
                  mode="multiple"
                  maxTagCount={3}
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search for a business...',
                  })}
                  fetchOptions={onSearchBusiness}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
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
