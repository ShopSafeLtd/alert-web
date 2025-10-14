import type { UpdateStockItemInput } from '#/graphql/types';
import type { FormInstance } from 'antd';

import { Currency } from '#/graphql/types';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  form: FormInstance;
  onCancel: () => void;
  onSubmit: (values: UpdateStockItemInput) => void;
  updating: boolean;
}

const EditStockItem = ({ form, onCancel, onSubmit, updating }: Props) => {
  const intl = useIntl();

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Name' })}
        name="name"
        rules={[
          {
            message: intl.formatMessage({ defaultMessage: 'Name is required' }),
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'SKU' })}
        name="sku"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Barcode' })}
        name="barcode"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Brand' })}
        name="brand"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Division' })}
        name="division"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Variant' })}
        name="variant"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Currency' })}
        name="currency"
      >
        <Select>
          {Object.values(Currency).map((curr) => (
            <Select.Option key={curr} value={curr}>
              {curr}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Sales Price (Local)' })}
        name="salesPriceLocal"
      >
        <InputNumber min={0} precision={2} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Sales Price (Standard)' })}
        name="salesPriceStandard"
      >
        <InputNumber min={0} precision={2} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button htmlType="submit" loading={updating} type="primary">
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
          <Button onClick={onCancel}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditStockItem;
