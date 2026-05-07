import type { UploadFile } from 'antd/es/upload/interface';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import StockItemSelect, {
  type StockItemValue,
} from '#/components/form-components/StockItemSelect/StockItemSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import customRequest from '#/utils/custom-request';
import { useCreateStockRemovalReturnMutation } from '#/views/stock-removal-requests/components/AddStockRemovalReturn/graphql/__generated__/create-stock-removal-return.generated';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Upload,
  notification,
} from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
}

interface ReturnItemFormData {
  damaged?: boolean;
  name?: string;
  quantity?: number;
  sku?: string;
  stockItem?: string;
}

export interface ReturnFormData {
  businessId?: string[];
  costCentreCode?: string;
  dateofReturn?: Date;
  items: ReturnItemFormData[];
  nominalCode?: string;
  originalAlertId?: string;
  rechargeBrand?: string;
  rechargeReference?: string;
  storeOrDC: 'DC' | 'STORE';
  tracking?: string;
}

const AddStockRemovalReturn = ({ onClose }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<ReturnFormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const storeOrDC = Form.useWatch('storeOrDC', form);
  const rechargeBrand = Form.useWatch('rechargeBrand', form);
  const items: ReturnItemFormData[] = Form.useWatch('items', form) || [];

  const [createReturn] = useCreateStockRemovalReturnMutation();

  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      items: [
        ...items,
        {
          damaged: false,
          name: data.name || '',
          quantity: undefined,
          sku: data.sku || '',
          stockItem: data.id,
        },
      ],
    });
  };

  const onFinish = (values: ReturnFormData) => {
    setSaving(true);

    const images = fileList
      .filter((f) => f.status === 'done' && f.response)
      .map((f) => {
        const response = f.response as
          | Array<{ blobName?: string; mimetype?: string; url?: string }>
          | undefined;
        const data = response?.[0];
        return {
          filename: data?.blobName ?? f.name ?? '',
          mimetype: data?.mimetype ?? f.type ?? 'image/jpeg',
          url: data?.url ?? '',
        };
      })
      .filter((img) => img.url);

    void createReturn({
      onCompleted: (data) => {
        setSaving(false);
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The store/DC will be notified about the return.',
          }),
          duration: 0,
          message: intl.formatMessage(
            {
              defaultMessage: 'Return Request Created (Ref: {var1})',
            },
            { var1: data.createStockRemovalReturn.reference }
          ),
          placement: 'bottomRight',
        });
        onClose();
      },
      onError: () => {
        setSaving(false);
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Something went wrong.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Error Submitting Return Request',
          }),
          placement: 'bottomRight',
        });
      },
      refetchQueries: ['StockRemovalRequests'],
      variables: {
        data: {
          businessId: values.businessId?.at(0),
          costCentreCode: values.costCentreCode,
          dateofReturn: values.dateofReturn,
          images,
          items: values.items.map((i) => ({
            damaged: i.damaged ?? false,
            itemId: i.stockItem ?? '',
            quantity: i.quantity ?? 0,
          })),
          originalAlertId: values.originalAlertId,
          rechargeBrand: values.rechargeReference ? rechargeBrand : undefined,
          rechargeReference: values.rechargeReference,
          schemeId: currentScheme,
          storeOrDC: values.storeOrDC,
          tracking: values.tracking,
        },
      },
    });
  };

  return (
    <Form<ReturnFormData> form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Original Alert ID',
            })}
            name="originalAlertId"
          >
            <Input
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Enter original stock removal reference',
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Returning to DC or Store?',
            })}
            name="storeOrDC"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'This is a required field.',
                }),
                required: true,
              },
            ]}
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value="STORE">
                <FormattedMessage defaultMessage="Store" />
              </Radio.Button>
              <Radio.Button value="DC">
                <FormattedMessage defaultMessage="DC" />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        {storeOrDC === 'STORE' && (
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Select the store',
              })}
              name="businessId"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a store',
                  }),
                  required: true,
                },
              ]}
            >
              <BusinessesSelect disabled={saving} maxTagCount={1} showSearch />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Brand Recharge Reference',
            })}
            name="rechargeReference"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Cost Centre',
            })}
            name="costCentreCode"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Nominal Code',
            })}
            name="nominalCode"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Delivery Tracking Numbers',
            })}
            name="tracking"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Date of Return',
            })}
            name="dateofReturn"
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Photo of Boxed Stock (with label)',
            })}
          >
            <Upload
              customRequest={customRequest}
              fileList={fileList}
              listType="picture-card"
              multiple
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <div>+ Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ marginBottom: 16 }}>
        <Form.List
          name="items"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Add at least one item',
              }),
              // eslint-disable-next-line @typescript-eslint/require-await
              validator: async (_rule, value) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (value === undefined || (value && value.length === 0))
                  throw new Error(
                    intl.formatMessage({
                      defaultMessage: 'Add at least one item',
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
                onChange={onAddItem}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for an item to add to the return...',
                })}
                showSearch
                style={{ marginBottom: 20, width: 500 }}
              />
              {items.length === 0 && (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage:
                      'Search for an item to add to this return request.',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
              {fields.map(({ key, name, ...restField }, index) => (
                <Row gutter={8} key={key}>
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
                    >
                      <Input readOnly style={{ width: 150 }} />
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
                            defaultMessage: 'Required',
                          }),
                          required: true,
                        },
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Must be at least 1',
                          }),
                          min: 1,
                          type: 'number',
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        precision={0}
                        style={{ width: 120 }}
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
                              defaultMessage: 'Damaged?',
                            })
                      }
                      name={[name, 'damaged']}
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => remove(name)}
                      size="small"
                      style={{ marginTop: index === 0 ? 30 : 0 }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </div>

      <Row justify="end" style={{ paddingTop: 20 }}>
        <Col>
          <Button
            disabled={saving}
            htmlType="submit"
            loading={saving}
            type="primary"
          >
            <FormattedMessage defaultMessage="Submit Return Request" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStockRemovalReturn;
