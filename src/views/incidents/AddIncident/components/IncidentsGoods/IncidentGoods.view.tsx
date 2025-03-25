/* eslint-disable quotes */

import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';

import StockItemSelect, {
  type StockItemValue,
} from '#/components/form-components/StockItemSelect/StockItemSelect.view';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import Input from 'antd/es/input/Input';
import { GoodsMode } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Paragraph, Title } = Typography;

interface Props {
  division: string | undefined;
  dontKnowGoods: () => void;
  goods: {
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  goodsMode: string;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsVisible: boolean;
  knowGoods: () => void;
  onAddItem: (data: StockItemValue) => void;
}

const IncidentGoods = ({
  division,
  dontKnowGoods,
  goods,
  goodsMode,
  goodsTypesData,
  goodsVisible,
  knowGoods,
  onAddItem,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {goodsVisible
              ? intl.formatMessage({
                  defaultMessage: 'What goods were involved?',
                })
              : intl.formatMessage({
                  defaultMessage: 'Do you know what goods were involved?',
                })}
          </Title>
        </Col>
        <Col flex={1}>
          <Paragraph
            italic
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
          >
            {intl.formatMessage({
              defaultMessage:
                '- Please provide information about the lost/recovered goods.',
            })}
          </Paragraph>
        </Col>
        {goodsVisible && (
          <Col>
            <Button onClick={dontKnowGoods}>
              <FormattedMessage defaultMessage="Don't know the goods" />
            </Button>
          </Col>
        )}
      </Row>
      {goodsVisible ? (
        <Form.List
          name="goods"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Add at least one item',
              }),
              // eslint-disable-next-line @typescript-eslint/require-await
              validator: async (rule, value) => {
                console.log(rule);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (value === undefined || (value && value.length === 0))
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
                <StockItemSelect
                  allowClear
                  division={division}
                  onChange={onAddItem}
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
                    defaultMessage:
                      'Search for an item to add to this incident.',
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
                          onClick={() =>
                            add({
                              recoveredValue: 0,
                            })
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
                                  defaultMessage: 'Item Description',
                                })
                          }
                          name={[name, 'description']}
                          tooltip={intl.formatMessage({
                            defaultMessage:
                              'Provide a more detailed description of the items taken if possible to help the police.',
                          })}
                        >
                          <Input style={{ width: 300 }} />
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
                            min={0}
                            precision={2}
                            // TODO fix
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
                            max={goods[index]?.value ?? undefined}
                            min={0}
                            precision={2}
                            // TODO fix
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
                            {
                              message: intl.formatMessage({
                                defaultMessage:
                                  'Please enter a quantity over 0.',
                              }),
                              min: 1,
                              type: 'number',
                            },
                          ]}
                          tooltip={intl.formatMessage({
                            defaultMessage:
                              'The quantity of the items involved.',
                          })}
                        >
                          <InputNumber
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
                            max={goods[index].quantity}
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
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 8 }}
                          />
                        }
                        onClick={() =>
                          add({
                            recoveredValue: 0,
                          })
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
      ) : (
        <div style={{ paddingBottom: 20, paddingTop: 10 }}>
          <Row>
            <Col>
              <Form.Item
                name="goodsKnown"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select an option',
                    }),
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
                  onChange={(event) => event.target.value && knowGoods()}
                  optionType="button"
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'I know the goods involved',
                      }),
                      value: true,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: "I don't know the goods involved",
                      }),
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default IncidentGoods;
