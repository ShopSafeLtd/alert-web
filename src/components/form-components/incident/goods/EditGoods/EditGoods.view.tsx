import React from 'react';
import { Button, Form, Row, Col, Select, InputNumber } from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/generated';
import { GoodsMode } from 'graphql/generated';

interface Props {
  data: GoodsData;
  onClose: () => void;
  onSubmit: (value: GoodsData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
}

const EditGoods = ({
  data,
  onClose,
  onSubmit,
  goodsTypesData,
  goodsMode,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        goodsTypeId: data.goodsType?.id,
        value: data.value || 0,
        recoveredValue: data.recoveredValue || 0,
      }}
    >
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
      {goodsMode === GoodsMode.Specific && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="recoveredQuantity"
              label={intl.formatMessage({
                defaultMessage: 'Quantity Recovered',
                id: 'vQz41I',
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
              <InputNumber style={{ width: '100%' }} precision={0} min={0} />
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
              {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditGoods;
