import type { ListGoodsTypesQuery } from '#/graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { GoodsData } from 'types/DataType';

import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { GoodsMode } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
const { useForm } = Form;

interface Props {
  data: GoodsData;
  goodsMode: GoodsMode;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onClose: () => void;
  onSubmit: (value: GoodsData) => void;
  saving: boolean;
}

const EditGoods = ({
  data,
  goodsMode,
  goodsTypesData,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [form] = useForm<GoodsData>();

  const value = Form.useWatch('value', form);
  const quantity = Form.useWatch('quantity', form);

  return (
    <Form<GoodsData>
      initialValues={{
        goodsTypeId: data.goodsType?.id,
        // goodsTypeId: data.goodsTypeId,
        name: data.name,
        quantity: data.quantity,
        recoveredQuantity: data.recoveredQuantity,
        recoveredValue: data.recoveredValue || 0,
        sku: data.sku,
        stockItemId: data.stockItemId,
        value: data.value || 0,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
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
                disabled={saving}
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
                disabled={saving}
                min={0}
                precision={2}
                prefix="£"
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
                disabled={saving}
                max={value ?? undefined}
                min={0}
                precision={2}
                prefix="£"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {goodsMode === GoodsMode.Specific && (
        <Row gutter={16}>
          <Col span={12}>
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
              tooltip={intl.formatMessage({
                defaultMessage: 'The SKU of the name.',
              })}
            >
              <Input disabled={saving} readOnly style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <Input disabled={saving} readOnly style={{ width: 250 }} />
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
                disabled={saving}
                min={0}
                precision={2}
                prefix="£"
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
                disabled={saving}
                max={value ?? undefined}
                min={0}
                precision={2}
                prefix="£"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Quantity Recovered',
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
                disabled={saving}
                max={quantity ?? undefined}
                min={0}
                precision={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} loading={saving} onClick={onClose}>
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

export default EditGoods;
