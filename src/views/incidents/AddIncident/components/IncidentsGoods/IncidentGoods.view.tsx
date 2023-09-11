/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
  Empty,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import React from 'react';
import { useIntl } from 'react-intl';
import type { ListGoodsTypesQuery } from 'graphql/generated';
import Input from 'antd/es/input/Input';
import { GoodsMode } from 'graphql/generated';
import useStyles from '../../AddIncident.styles';
import type { StockItemValue } from '../../../../../components/form-components/StockItemSearch/StockItemSearch.view';
import StockItemSearch from '../../../../../components/form-components/StockItemSearch/StockItemSearch.view';

const { Paragraph, Title } = Typography;

interface Props {
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: string;
  onAddItem: (data: StockItemValue) => void;
  division: string | undefined;
}

const IncidentGoods = ({
  goodsVisible,
  knowGoods,
  dontKnowGoods,
  goodsTypesData,
  goodsMode,
  onAddItem,
  division,
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
                  id: '6L5/Qv',
                })
              : intl.formatMessage({
                  defaultMessage: 'Do you know what goods were involved?',
                  id: '+eY3nZ',
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
              id: '3kptQz',
            })}
          </Paragraph>
        </Col>
      </Row>
      {goodsVisible ? (
        <Form.List
          name="goods"
          rules={[
            {
              validator: async (rule, value) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (value && value.length === 0)
                  throw new Error(
                    intl.formatMessage({
                      defaultMessage: 'Something wrong!',
                      id: 'QL7Ixv',
                    })
                  );
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {goodsMode === GoodsMode.Generic && fields.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={intl.formatMessage({
                    id: 'yjhOzY',
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
                            id: 'kNLPWW',
                          })}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Empty>
              )}
              {goodsMode === GoodsMode.Specific && (
                <StockItemSearch
                  showSearch
                  allowClear
                  placeholder={intl.formatMessage({
                    defaultMessage:
                      'Search for an item to add to the incident...',
                    id: 'kK3vTg',
                  })}
                  style={{ width: 500, marginBottom: 20 }}
                  onAddItem={onAddItem}
                  division={division}
                />
              )}
              {goodsMode === GoodsMode.Specific && fields.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={intl.formatMessage({
                    id: '9mMWzj',
                    defaultMessage:
                      'Search for an item to add to this incident.',
                  })}
                />
              )}
              {fields.map(({ key, name, ...restField }, index) => (
                <Row key={key} gutter={8}>
                  {goodsMode === GoodsMode.Generic && (
                    <Col>
                      <Form.Item
                        {...restField}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Type of Goods',
                                id: 'awr2tc',
                              })
                        }
                        name={[name, 'goodsType']}
                        rules={[
                          {
                            required: index === 0,
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
                  )}
                  {goodsMode === GoodsMode.Generic && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                                id: 'GufXy5',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                          style={{ width: 150 }}
                          prefix="£"
                          precision={2}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {goodsMode === GoodsMode.Generic && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'recoveredValue']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value Recovered',
                                id: 'FqEGSY',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter a value',
                              id: 'Umf5pG',
                            }),
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'The value of the goods that were recovered.',
                          id: 'JuhI7q',
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
                  )}
                  {goodsMode === GoodsMode.Specific && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Item Name',
                                id: 'd0Q+yP',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage: 'Please enter the name',
                              id: '42iFTN',
                            }),
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage: 'The SKU of the name.',
                          id: 'XKEvdm',
                        })}
                      >
                        <Input readOnly style={{ width: 250 }} />
                      </Form.Item>
                    </Col>
                  )}
                  {goodsMode === GoodsMode.Specific && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'sku']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'SKU',
                                id: 'k4brJy',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                        <Input readOnly style={{ width: 250 }} />
                      </Form.Item>
                    </Col>
                  )}
                  {goodsMode === GoodsMode.Specific && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Value',
                                id: 'GufXy5',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {goodsMode === GoodsMode.Specific && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity',
                                id: 'qVGRIE',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
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
                          style={{ width: 150 }}
                          precision={0}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {goodsMode === GoodsMode.Specific && (
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, 'recoveredQuantity']}
                        label={
                          index
                            ? ''
                            : intl.formatMessage({
                                defaultMessage: 'Quantity Recovered',
                                id: 'vQz41I',
                              })
                        }
                        rules={[
                          {
                            required: index === 0,
                            message: intl.formatMessage({
                              defaultMessage:
                                'Please enter a recovered quantity.',
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
                          style={{ width: 150 }}
                          precision={0}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
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
                          id: 'kNLPWW',
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
                  id: '5RSz8i',
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={dontKnowGoods}>
                {intl.formatMessage({
                  defaultMessage: "I don't know the goods involved",
                  id: 'Syf67T',
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
