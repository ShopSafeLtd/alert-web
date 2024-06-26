import React from 'react';
import { Button, Col, Form, InputNumber, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';
import Input from 'antd/es/input/Input';
import StockItemSearch, {
  type StockItemValue,
} from '#/components/form-components/StockItemSearch/StockItemSearch.view';

interface Props {
  onClose: () => void;
  onSubmit: (value: GoodsData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
}

const AddGoods = ({
  onClose,
  onSubmit,
  goodsTypesData,
  goodsMode,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const onAddItem = (data: StockItemValue) => {
    console.log(data);
    form.setFieldsValue({
      sku: data.sku || '',
      value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
      quantity: undefined,
      recoveredQuantity: 0,
      name: data.name || '',
      stockItem: data.id,
    });
  };

  const stockItem = Form.useWatch<string | undefined>('stockItem', form);
  console.log(stockItem);
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      {goodsMode === GoodsMode.Generic && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="goodsTypeId"
              label={intl.formatMessage({
                defaultMessage: 'Type of Goods',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a type',
                  }),
                },
              ]}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select goods...',
                })}
                allowClear
                options={
                  (goodsTypesData &&
                    goodsTypesData.listGoodsTypes.goodsTypes.map(
                      (goodsType) => ({
                        value: goodsType.id,
                        label: goodsType.name,
                      })
                    )) ||
                  []
                }
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="value"
              label={intl.formatMessage({
                defaultMessage: 'Value',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The value of the goods involved in the incident, both lost and recovered.',
              })}
            >
              <InputNumber
                style={{ width: '100%' }}
                prefix="£"
                precision={2}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="recoveredValue"
              label={intl.formatMessage({
                defaultMessage: 'Value Recovered',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the goods that were recovered.',
              })}
            >
              <InputNumber
                style={{ width: '100%' }}
                prefix="£"
                precision={2}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {!stockItem && goodsMode === GoodsMode.Specific && (
        <StockItemSearch
          showSearch
          allowClear
          placeholder={intl.formatMessage({
            defaultMessage: 'Search for an item to add to the incident...',
          })}
          style={{ width: 500, marginBottom: 20 }}
          onAddItem={onAddItem}
          division=""
        />
      )}
      {goodsMode === GoodsMode.Specific && (
        <Row gutter={8}>
          <Col>
            <Form.Item name="stockItem" />
          </Col>
          <Col>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Item Name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the name',
                  }),
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
              name="sku"
              label={intl.formatMessage({
                defaultMessage: 'SKU',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the SKU',
                  }),
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
              name="value"
              label={intl.formatMessage({
                defaultMessage: 'Value',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the value',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the item.',
              })}
            >
              <InputNumber
                style={{ width: 150 }}
                // prefix="£"
                precision={2}
                min={0}
                disabled={stockItem === undefined}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="quantity"
              label={intl.formatMessage({
                defaultMessage: 'Quantity',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a quantity.',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The quantity of the items involved.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                style={{ width: 150 }}
                precision={0}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="recoveredQuantity"
              label={intl.formatMessage({
                defaultMessage: 'Recovered Quantity',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a recovered quantity.',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The quantity of the goods that were recovered.',
              })}
            >
              <InputNumber
                disabled={stockItem === undefined}
                style={{ width: 150 }}
                precision={0}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddGoods;
