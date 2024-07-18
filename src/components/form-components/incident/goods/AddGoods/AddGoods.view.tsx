import type { StockItemValue } from '#/components/form-components/StockItemSearch/StockItemSearch.view';
import type { FormInstance } from 'antd';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import type { GoodsData } from 'types/DataType';

import StockItemSearch from '#/components/form-components/StockItemSearch/StockItemSearch.view';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { GoodsMode } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddGoods';

interface Props {
  division: string | undefined;
  form: FormInstance<FormData>;
  goods?: GoodsData[];
  goodsMode: GoodsMode;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onAddItem: (data: StockItemValue) => void;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddGoods = ({
  division,
  form,
  goods,
  goodsMode,
  goodsTypesData,
  onAddItem,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form<FormData>
      form={form}
      initialValues={{
        goods: [
          {
            recoveredValue: 0,
          },
        ],
      }}
      layout="vertical"
      onFinish={onSubmit}
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
                allowClear
                disabled={saving}
                division={division}
                onAddItem={onAddItem}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Search for an item to add to the incident...',
                })}
                showSearch
                style={{ marginBottom: 20, width: 500 }}
              />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Specific && fields.length === 0 && (
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'Search for an item to add to this incident.',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
            {goodsMode === GoodsMode.Generic && fields.length === 0 && (
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'No goods added to incident',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Form.Item>
                  <Row justify="center">
                    <Col>
                      <Button
                        block
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 8 }}
                          />
                        }
                        onClick={() => {
                          console.log('add');
                          add({
                            recoveredValue: 0,
                          });
                        }}
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
              <Row gutter={8} key={key}>
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
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a type',
                            }),
                            required: index === 0,
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
                          style={{ width: 300 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                              })
                        }
                        name={[name, 'value']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a value',
                            }),
                            required: index === 0,
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
                          style={{ width: 150 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value Recovered',
                              })
                        }
                        name={[name, 'recoveredValue']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a value',
                            }),
                            required: index === 0,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'The value of the goods that were recovered.',
                        })}
                      >
                        <InputNumber
                          disabled={saving}
                          max={goods?.[index]?.value ?? undefined}
                          min={0}
                          precision={2}
                          prefix="£"
                          style={{ width: 150 }}
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
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Item Name',
                              })
                        }
                        name={[name, 'name']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the name',
                            }),
                            required: index === 0,
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
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'SKU',
                              })
                        }
                        name={[name, 'sku']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the SKU',
                            }),
                            required: index === 0,
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
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                              })
                        }
                        name={[name, 'value']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the value',
                            }),
                            required: index === 0,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage: 'The value of the item.',
                        })}
                      >
                        <InputNumber
                          disabled={saving}
                          min={0}
                          // prefix="£"
                          precision={2}
                          style={{ width: 150 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity',
                              })
                        }
                        name={[name, 'quantity']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a quantity.',
                            }),
                            required: index === 0,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage: 'The quantity of the items involved.',
                        })}
                      >
                        <InputNumber
                          disabled={saving}
                          min={0}
                          precision={0}
                          style={{ width: 150 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity Recovered',
                              })
                        }
                        name={[name, 'recoveredQuantity']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage:
                                'Please enter a recovered quantity.',
                            }),
                            required: index === 0,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'The quantity of the goods that were recovered.',
                        })}
                      >
                        <InputNumber
                          disabled={saving}
                          max={goods?.[index].quantity ?? undefined}
                          min={0}
                          precision={0}
                          style={{ width: 150 }}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

                {fields.length > 1 && (
                  <Col>
                    <Button
                      disabled={saving}
                      loading={saving}
                      onClick={() => remove(name)}
                      size="small"
                      style={{ marginTop: index === 0 ? 30 : 0 }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
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
                      block
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 8 }}
                        />
                      }
                      loading={saving}
                      onClick={() => {
                        console.log('add');
                        add({
                          recoveredValue: 0,
                          value: 0,
                        });
                      }}
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
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddGoods;
