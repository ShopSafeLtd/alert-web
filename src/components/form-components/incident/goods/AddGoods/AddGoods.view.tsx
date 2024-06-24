import React from 'react';
import { Button, Form, Row, Col, Select, InputNumber } from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/generated';
import { GoodsMode } from 'graphql/generated';
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
                id: 'awr2tc',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a type',
                    id: 'pd8FHc',
                  }),
                },
              ]}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select goods...',
                  id: 'p4Hiyr',
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
                id: 'GufXy5',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                    id: 'Umf5pG',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The value of the goods involved in the incident, both lost and recovered.',
                id: 'MPzA66',
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
                id: 'FqEGSY',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a value',
                    id: 'Umf5pG',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the goods that were recovered.',
                id: 'JuhI7q',
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
            id: 'kK3vTg',
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
                id: 'd0Q+yP',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the name',
                    id: '42iFTN',
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
                id: 'k4brJy',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the SKU',
                    id: '0WNVIn',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The SKU of the item.',
                id: 'rrLaZs',
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
                id: 'GufXy5',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the value',
                    id: 'wP/hlO',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The value of the item.',
                id: 'xYuu48',
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
                id: 'qVGRIE',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a quantity.',
                    id: 'KEVIs3',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The quantity of the items involved.',
                id: 'X3X/lp',
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
                id: '+30ZkY',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a recovered quantity.',
                    id: 'CZemdW',
                  }),
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The quantity of the goods that were recovered.',
                id: '00WDlL',
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
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ defaultMessage: 'Create', id: 'VzzYJk' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddGoods;
