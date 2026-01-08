import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { Currency } from 'graphql/types';
import type { GoodsData } from 'types/DataType';

import StockItemSelect, {
  type StockItemValue,
} from '#/components/form-components/StockItemSelect/StockItemSelect.view';
import { currencySymbolAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Button, Col, Form, InputNumber, Row, Select } from 'antd';
import Input from 'antd/es/input/Input';
import { GoodsMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  currency?: Currency | null;
  goodsMode: GoodsMode;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onClose: () => void;
  onSubmit: (value: GoodsData) => void;
}

const AddGoods = ({
  currency,
  goodsMode,
  goodsTypesData,
  onClose,
  onSubmit,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      damagedQuantity: 0,
      name: data.name || '',
      quantity: undefined,
      recoveredQuantity: 0,
      sku: data.sku || '',
      stockItemId: data.id,
      value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
    });
  };

  const stockItem = Form.useWatch<string | undefined>('stockItemId', form);
  const { prefix } = useAtomValue(currencySymbolAtom);
  return (
    <Form<GoodsData> form={form} layout="vertical" onFinish={onSubmit}>
      {goodsMode === GoodsMode.Generic && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Type of Goods',
              })}
              name="goodsTypeId"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a type',
                  }),
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                options={
                  goodsTypesData?.listGoodsTypes.goodsTypes.map(
                    (goodsType) => ({
                      label: goodsType.name,
                      value: goodsType.id,
                    })
                  ) || []
                }
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select goods...',
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Value',
              })}
              name="value"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The value of the goods involved in the incident, both lost and recovered.',
              })}
            >
              <InputNumber
                min={0}
                precision={2}
                prefix={prefix}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Value Recovered',
              })}
              name="recoveredValue"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the goods that were recovered.',
              })}
            >
              <InputNumber
                min={0}
                precision={2}
                prefix={prefix}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {!stockItem && goodsMode === GoodsMode.Specific && (
        <StockItemSelect
          allowClear
          currency={currency || undefined}
          onChange={onAddItem}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search for an item to add to the incident...',
          })}
          showSearch
          style={{ marginBottom: 20, width: 500 }}
        />
      )}
      {goodsMode === GoodsMode.Specific && (
        <Row gutter={8}>
          <Col>
            <Form.Item name="stockItemId" />
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Item Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the name',
                  }),
                  required: true,
                },
              ]}
            >
              <Input
                disabled={stockItem === undefined}
                readOnly
                style={{ width: 250 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'SKU',
              })}
              name="sku"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the SKU',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The SKU of the item.',
              })}
            >
              <Input
                disabled={stockItem === undefined}
                readOnly
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Value',
              })}
              name="value"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the value',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the item.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                min={0}
                precision={2}
                prefix={prefix}
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Quantity',
              })}
              name="quantity"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a quantity.',
                  }),
                  required: true,
                },
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Must be at least one.',
                  }),
                  min: 1,
                  type: 'number',
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The quantity of the items involved.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                min={0}
                precision={0}
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Recovered Quantity',
              })}
              name="recoveredQuantity"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a recovered quantity.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The quantity of the goods that were recovered.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                min={0}
                precision={0}
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Damaged Quantity',
              })}
              name="damagedQuantity"
              tooltip={intl.formatMessage({
                defaultMessage: 'The quantity of the goods that were damaged.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                min={0}
                precision={0}
                style={{ width: 150 }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button htmlType="submit" type="primary">
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddGoods;
