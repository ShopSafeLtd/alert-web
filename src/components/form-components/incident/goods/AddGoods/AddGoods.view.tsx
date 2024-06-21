import React from 'react';
import { Button, Col, Form, InputNumber, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';

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

  return (
    <Form layout="vertical" onFinish={onSubmit}>
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
      {goodsMode === GoodsMode.Specific && (
        <Row gutter={16}>
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
              <InputNumber style={{ width: '100%' }} precision={0} min={0} />
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
