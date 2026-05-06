import StockItemSelect, {
  type StockItemValue,
} from '#/components/form-components/StockItemSelect/StockItemSelect.view';
import { currencySymbolAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Empty, Form, InputNumber, Row, Typography } from 'antd';
import Input from 'antd/es/input/Input';
import { useAtomValue } from 'jotai';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  division: string | undefined;
  goods: {
    goodsType?: string;
    location?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  onAddItem: (data: StockItemValue) => void;
}

const IncidentGoods = ({ division, goods, onAddItem }: Props) => {
  const intl = useIntl();

  const { prefix } = useAtomValue(currencySymbolAtom);

  return (
    <div>
      <Typography.Paragraph strong>
        <FormattedMessage defaultMessage="Select items for the request" />
      </Typography.Paragraph>
      <Form.List
        name="items"
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
        {(fields, { remove }) => (
          <>
            <StockItemSelect
              allowClear
              division={division}
              onChange={onAddItem}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for an item to add to the request...',
              })}
              showSearch
              style={{ marginBottom: 20, width: 500 }}
            />
            {goods.length === 0 && (
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'Search for an item to add to this request.',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            {fields.map(({ key, name, ...restField }, index) => (
              <Row gutter={8} key={key}>
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
                        precision={2}
                        prefix={prefix}
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
                              defaultMessage: 'Required Quantity',
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
                            defaultMessage: 'Please enter a quantity over 0.',
                          }),
                          min: 1,
                          type: 'number',
                        },
                      ]}
                      tooltip={intl.formatMessage({
                        defaultMessage: 'The quantity of the items involved.',
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
                              defaultMessage: 'Location (Office Use Only)',
                            })
                      }
                      name={[name, 'location']}
                    >
                      <Input style={{ width: 200 }} />
                    </Form.Item>
                  </Col>
                </>
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
          </>
        )}
      </Form.List>
    </div>
  );
};

export default IncidentGoods;
