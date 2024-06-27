import React from 'react';
import type { FormInstance } from 'antd';
import {
  Input,
  Button,
  Col,
  Empty,
  Form,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useIntl } from 'react-intl';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';
import type { StockItemValue } from '#/components/form-components/StockItemSearch/StockItemSearch.view';
import StockItemSearch from '#/components/form-components/StockItemSearch/StockItemSearch.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import type { FormData } from './useAddGoods';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
  onAddItem: (data: StockItemValue) => void;
  form: FormInstance<FormData>;
  goods?: GoodsData[];
  division: string | undefined;
  saving: boolean;
}

const AddGoods = ({
  onClose,
  onSubmit,
  goodsTypesData,
  goodsMode,
  goods,
  form,
  division,
  onAddItem,
  saving,
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
    <Form<FormData>
      layout="vertical"
      onFinish={onSubmit}
      form={form}
      initialValues={{
        goods: [
          {
            sku: '',
            name: '',
            stockItem: '',
          },
        ],
      }}
    >
      <Form.List
        name="goods"
        rules={[
          {
            // eslint-disable-next-line @typescript-eslint/require-await
            validator: async (rule, value) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              if (value && value.length === 0)
                throw new Error(
                  intl.formatMessage({
                    defaultMessage: 'Something wrong!',
                  })
                );
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Specific && (
              <StockItemSearch
                showSearch
                allowClear
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Search for an item to add to the incident...',
                })}
                style={{ width: 500, marginBottom: 20 }}
                onAddItem={onAddItem}
                division={division}
                disabled={saving}
              />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Specific && fields.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={intl.formatMessage({
                  defaultMessage: 'Search for an item to add to this incident.',
                })}
              />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Generic && fields.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={intl.formatMessage({
                  defaultMessage: 'No goods added to incident',
                })}
              >
                <Form.Item>
                  <Row justify="center">
                    <Col>
                      <Button
                        onClick={() =>
                          add({
                            recoveredValue: 0,
                          })
                        }
                        block
                        icon={
                          <FontAwesomeIcon
                            style={{ marginRight: 8 }}
                            icon={faPlus}
                          />
                        }
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Add Item',
                        })}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Empty>
            )}
            {fields.map(({ key, name, ...restField }, index) => (
              <Row key={key} gutter={8}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
                {goodsMode === GoodsMode.Generic && (
                  <>
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Type of Goods',
                              })
                        }
                        name={[name, 'goodsType']}
                        rules={[
                          {
                            required: index === 0,
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
                          style={{ width: 300 }}
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
                          disabled={saving}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                          style={{ width: 150 }}
                          prefix="£"
                          precision={2}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'recoveredValue']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value Recovered',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a value',
                            }),
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'The value of the goods that were recovered.',
                        })}
                      >
                        <InputNumber
                          disabled={saving}
                          style={{ width: 150 }}
                          prefix="£"
                          precision={2}
                          min={0}
                          max={
                            goods && goods[index]?.value
                              ? goods[index]?.value
                              : undefined
                          }
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
                {goodsMode === GoodsMode.Specific && (
                  <>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Item Name',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the name',
                            }),
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage: 'The SKU of the name.',
                        })}
                      >
                        <Input readOnly style={{ width: 250 }} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'sku']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'SKU',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the SKU',
                            }),
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage: 'The SKU of the item.',
                        })}
                      >
                        <Input readOnly style={{ width: 250 }} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                          disabled={saving}
                          style={{ width: 150 }}
                          // prefix="£"
                          precision={2}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                          disabled={saving}
                          style={{ width: 150 }}
                          precision={0}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'recoveredQuantity']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity Recovered',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage:
                                'Please enter a recovered quantity.',
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
                          style={{ width: 150 }}
                          precision={0}
                          min={0}
                          max={
                            goods && goods[index].quantity
                              ? goods[index].quantity
                              : undefined
                          }
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

                {fields.length > 1 && (
                  <Col>
                    <Button
                      loading={saving}
                      disabled={saving}
                      style={{ marginTop: index === 0 ? 30 : 0 }}
                      size="small"
                      onClick={() => remove(name)}
                    >
                      <FontAwesomeIcon size="lg" icon={faTrash} />
                    </Button>
                  </Col>
                )}
              </Row>
            ))}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Generic && fields.length > 0 && (
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={saving}
                      disabled={saving}
                      onClick={() =>
                        add({
                          recoveredValue: 0,
                        })
                      }
                      block
                      icon={
                        <FontAwesomeIcon
                          style={{ marginRight: 8 }}
                          icon={faPlus}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Item',
                      })}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>

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
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddGoods;
