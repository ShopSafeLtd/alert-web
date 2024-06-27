import React from 'react';
import { Button, Form, Row, Col, Select, InputNumber, Input } from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';
const { useForm } = Form;

interface Props {
  data: GoodsData;
  onClose: () => void;
  onSubmit: (value: GoodsData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
  saving: boolean;
}

const EditGoods = ({
  data,
  onClose,
  onSubmit,
  goodsTypesData,
  goodsMode,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [form] = useForm<GoodsData>();

  const value = Form.useWatch('value', form);
  const quantity = Form.useWatch('quantity', form);

  return (
    <Form<GoodsData>
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        goodsTypeId: data.goodsType,
        goodsType: data.goodsType,
        name: data.name,
        value: data.value || 0,
        recoveredValue: data.recoveredValue || 0,
        sku: data.sku,
        quantity: data.quantity,
        recoveredQuantity: data.recoveredQuantity,
        stockItem: data.stockItem,
      }}
    >
      {goodsMode === GoodsMode.Generic && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="goodsType"
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
                disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
                style={{ width: '100%' }}
                prefix="£"
                precision={2}
                min={0}
                max={value}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {goodsMode === GoodsMode.Specific && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={'name'}
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
              tooltip={intl.formatMessage({
                defaultMessage: 'The SKU of the name.',
              })}
            >
              <Input readOnly disabled={saving} style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'sku'}
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
              <Input readOnly disabled={saving} style={{ width: 250 }} />
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
                disabled={saving}
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
                disabled={saving}
                style={{ width: '100%' }}
                prefix="£"
                precision={2}
                min={0}
                max={value}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="recoveredQuantity"
              label={intl.formatMessage({
                defaultMessage: 'Quantity Recovered',
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
                disabled={saving}
                style={{ width: '100%' }}
                precision={0}
                min={0}
                max={quantity}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button onClick={onClose} loading={saving} disabled={saving}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              disabled={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditGoods;
