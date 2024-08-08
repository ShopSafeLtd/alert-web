import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { ShoeSide } from '#/graphql/types';
import { getTitle, shoeTypeValues } from '#/types/enums/shoe';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Skeleton,
  Steps,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { StockItemValue } from '../../StockItemSearch/StockItemSearch.view';
import type { FormData } from './useAddShoe';

import StockItemSearch from '../../StockItemSearch/StockItemSearch.view';

interface Props {
  currentStep: number;
  form: FormInstance<FormData>;
  info: string;
  loading: boolean;
  onClose: () => void;
  onSearchStockItem: (data: StockItemValue) => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddShoe = ({
  currentStep,
  form,
  info,
  loading,
  onClose,
  onSearchStockItem,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const shoeSizes = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
    10.5, 11, 11.5, 12, 12.5, 13,
  ];

  return (
    <div>
      <Steps
        current={currentStep}
        items={[
          {
            // description: ,
            title: intl.formatMessage({ defaultMessage: 'Shoe Details' }),
          },
          {
            title: intl.formatMessage({ defaultMessage: 'Match' }),
          },
        ]}
        style={{ width: '90%' }}
      />
      {loading ? (
        <Skeleton />
      ) : (
        <div style={{ marginTop: 20 }}>
          {currentStep === 0 && (
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              {/* <Typography.Title level={4} style={{ marginBottom: 15 }}>
              {intl.formatMessage({ defaultMessage: 'Shoe Detail:' })}
            </Typography.Title> */}
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Store',
                    })}
                    name="business"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select a business for the new shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <BusinessesSelect
                      allowClear
                      disabled={saving}
                      getAddress={(address) => {
                        form.setFieldsValue({
                          businessAddress: address || '',
                        });
                      }}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Search for a business...',
                      })}
                      showSearch
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={14}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Store Address',
                    })}
                    name="businessAddress"
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'UPC',
                    })}
                    name="stockItem"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please search the UPC for the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <StockItemSearch
                      allowClear
                      division={undefined}
                      onAddItem={onSearchStockItem}
                      placeholder={intl.formatMessage({
                        defaultMessage:
                          'Search for the item id for the single shoe',
                      })}
                      showSearch
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Style' })}
                    name="style"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter a style for the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Input disabled={saving} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Type',
                    })}
                    name="type"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select the type of the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Select disabled={saving} options={shoeTypeValues} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Colour' })}
                    name="colour"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter the colour for the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Input disabled={saving} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Size(US)',
                    })}
                    name="size"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select the size of the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      disabled={saving}
                      options={shoeSizes.map((size) => ({
                        label: `${size}`,
                        value: size,
                      }))}
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Status',
                  })}
                  name="status"
                >
                  <Select disabled={saving} options={shoeStatusValues} />
                </Form.Item>
              </Col> */}
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Retail Price',
                    })}
                    name="retailPrice"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter the retail price of the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
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

                <Col span={8}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Side',
                    })}
                    name="side"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select the side of the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Radio.Group disabled={saving}>
                      <Radio.Button value={ShoeSide.Left}>
                        {intl.formatMessage({ defaultMessage: 'Left' })}
                      </Radio.Button>
                      <Radio.Button value={ShoeSide.Right}>
                        {intl.formatMessage({ defaultMessage: 'Right' })}
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Box',
                    })}
                    name="box"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please select the side of the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio.Button value>
                        {intl.formatMessage({ defaultMessage: 'Yes' })}
                      </Radio.Button>
                      <Radio.Button value={false}>
                        {intl.formatMessage({ defaultMessage: 'No' })}
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Description',
                    })}
                    name="description"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter a description for the single shoe.',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea disabled={saving} rows={2} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
                  <Col>
                    <Button disabled={saving} onClick={onClose}>
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
                      {intl.formatMessage({
                        defaultMessage: 'Submit',
                      })}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          )}
          {currentStep === 1 && (
            <div style={{ marginTop: 100 }}>
              <Row gutter={16} justify="center">
                <Typography.Title>{getTitle(info)}</Typography.Title>
              </Row>
              <Row gutter={16} justify="center">
                <Typography.Paragraph style={{ fontSize: 18 }}>
                  {info}
                </Typography.Paragraph>
              </Row>

              <Row gutter={16} justify="end" style={{ marginTop: 150 }}>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    onClick={onClose}
                    type="primary"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Done',
                    })}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddShoe;
