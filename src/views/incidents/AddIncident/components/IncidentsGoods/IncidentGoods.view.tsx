/* eslint-disable quotes */

import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import React from 'react';
import { useIntl } from 'react-intl';

import Input from 'antd/es/input/Input';
import useStyles from '../../AddIncident.styles';
import type { StockItemValue } from '../../../../../components/form-components/StockItemSearch/StockItemSearch.view';
import StockItemSearch from '../../../../../components/form-components/StockItemSearch/StockItemSearch.view';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';

const { Paragraph, Title } = Typography;

interface Props {
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: string;
  onAddItem: (data: StockItemValue) => void;
  division: string | undefined;
  goods: {
    goodsType?: string;
    value?: number;
    recoveredValue?: number;
    quantity?: number;
    recoveredQuantity?: number;
    sku?: string;
    name?: string;
    stockItem?: string;
  }[];
}

const IncidentGoods = ({
  goodsVisible,
  knowGoods,
  dontKnowGoods,
  goodsTypesData,
  goodsMode,
  onAddItem,
  division,
  goods,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {goodsVisible
              ? intl.formatMessage({
                  defaultMessage: 'What goods were involved?',
                })
              : intl.formatMessage({
                  defaultMessage: 'Do you know what goods were involved?',
                })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            {intl.formatMessage({
              defaultMessage:
                '- Please provide information about the lost/recovered goods.',
            })}
          </Paragraph>
        </Col>
      </Row>
      {goodsVisible ? (
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
                />
              )}
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
              {goodsMode === GoodsMode.Specific && fields.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={intl.formatMessage({
                    defaultMessage:
                      'Search for an item to add to this incident.',
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
                            style={{ width: 150 }}
                            prefix="£"
                            precision={2}
                            min={0}
                            max={goods[index]?.value ?? undefined}
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
                            defaultMessage:
                              'The quantity of the items involved.',
                          })}
                        >
                          <InputNumber
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
                            style={{ width: 150 }}
                            precision={0}
                            min={0}
                            max={goods[index].quantity}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}

                  {fields.length > 1 && (
                    <Col>
                      <Button
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
      ) : (
        <div style={{ paddingTop: 10, paddingBottom: 20 }}>
          <Row gutter={16}>
            <Col>
              <Button onClick={knowGoods} danger>
                {intl.formatMessage({
                  defaultMessage: 'I know the goods involved',
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={dontKnowGoods}>
                {intl.formatMessage({
                  defaultMessage: "I don't know the goods involved",
                })}
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default IncidentGoods;
