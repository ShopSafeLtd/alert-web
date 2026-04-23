import type {
  StockRemovalRequestsQuery,
  StockRemovalRequestsQueryVariables,
} from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useCreateStockRemovalRequestMutation } from '#/views/stock-removal-requests/components/AddStockRemovalRequest/graphql/__generated__/create-stock-removal-request.generated';
import { StockRemovalRequestsDocument } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  notification,
} from 'antd';
import { useListStockRemovalReasonOptionsQuery } from 'graphql/stock-removal-reasons/queries/__generated__/list-stock-removal-reason-options.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import StockRemovalGoods from '../StockRemovalGoods/StockRemovalGoods.container';

interface Props {
  onClose: () => void;
}

export interface FormData {
  approvers: string[];
  businessId?: string[];
  costCentreCode?: string;
  description: string;
  fascia: string;
  items: {
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  personalityInfluences: 'No' | 'Yes';
  reason: string;
  reasonForNonReturn: string;
  rechargeBrand: 'No' | 'Yes';
  rechargeReference?: string;
  recipientEmail?: string;
  recipientName?: string;
  recipientPhone?: string;
  returnDate?: Date;
  shippingAddressLine1?: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingCounty?: string;
  shippingPostcode?: string;
  socialHandles?: string;
  storeOrDC: 'DC' | 'Store';
  title: string;
  willStockBeReturned: 'No' | 'Yes';
}

const APPROVER_GROUP_ID = 'cmg9nfl260017ityalcaluw9r';

const AddStockRemovalRequest = ({ onClose }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const currentUserId = useAtomValue(currentUserAtom)?.id;

  const [saving, setSaving] = useState(false);

  const storeOrDC = Form.useWatch('storeOrDC', form);
  const rechargeBrand = Form.useWatch('rechargeBrand', form);
  const willStockBeReturned = Form.useWatch('willStockBeReturned', form);
  const personalityInfluences = Form.useWatch('personalityInfluences', form);

  const { data: reasonOptionsData, loading: reasonOptionsLoading } =
    useListStockRemovalReasonOptionsQuery({
      skip: !currentScheme,
      variables: { where: { id: currentScheme } },
    });
  const reasonOptions = (
    reasonOptionsData?.scheme?.stockRemovalReasonOptions ?? []
  )
    .filter((o) => o.active)
    .sort((a, b) => a.position - b.position)
    .map((o) => ({ label: o.label, value: o.label }));

  const [createRemovalRequest] = useCreateStockRemovalRequestMutation({
    update: (store, { data: res }) => {
      if (
        res?.createStockRemovalRequest === null ||
        res?.createStockRemovalRequest === undefined
      )
        return;
      const existingData = store.readQuery<
        StockRemovalRequestsQuery,
        StockRemovalRequestsQueryVariables
      >({
        query: StockRemovalRequestsDocument,
        variables: {
          orderBy: [
            {
              createdAt: SortOrder.Desc,
            },
          ],
          where: {
            schemeId: currentScheme,
          },
        },
      });

      if (!existingData?.stockRemovalRequests) return;
      store.writeQuery<
        StockRemovalRequestsQuery,
        StockRemovalRequestsQueryVariables
      >({
        data: {
          stockRemovalRequests: {
            edges: [
              {
                node: {
                  ...res.createStockRemovalRequest,
                  createdBy: {
                    __typename: 'User' as const,
                    fullName: '',
                    id: currentUserId || '',
                  },
                },
              },
              ...existingData.stockRemovalRequests.edges,
            ],
            totalCount: existingData.stockRemovalRequests.totalCount + 1,
          },
        },
        query: StockRemovalRequestsDocument,
        variables: {
          orderBy: [
            {
              createdAt: SortOrder.Desc,
            },
          ],
          where: {
            schemeId: currentScheme,
          },
        },
      });
    },
  });

  const onFinish = (values: FormData) => {
    setSaving(true);
    void createRemovalRequest({
      onCompleted: (data) => {
        setSaving(false);
        notification.success({
          description: intl.formatMessage({
            defaultMessage:
              'An email will be sent to the approvers to review your request.',
          }),
          duration: 0,
          message: intl.formatMessage(
            {
              defaultMessage: `Request Created (Alert ID: {var1})`,
            },
            { var1: data.createStockRemovalRequest.reference }
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
            defaultMessage: 'Error Submitting Request',
          }),
          placement: 'bottomRight',
        });
      },
      variables: {
        data: {
          approverIds: values.approvers,
          businessId: values.businessId?.at(0) ?? '',
          costCentreCode: values.costCentreCode,
          description: values.description,
          fascia: values.fascia,
          items: values.items.map((i) => ({
            itemId: i.stockItem ?? '',
            quantity: i.quantity ?? 0,
          })),
          personalityInfluences: values.personalityInfluences,
          reason: values.reason,
          reasonForNonReturn: values.reasonForNonReturn,
          rechargeBrand: values.rechargeBrand,
          rechargeReference: values.rechargeReference,
          recipientEmail: values.recipientEmail,
          recipientName: values.recipientName,
          recipientPhone: values.recipientPhone,
          returnDate: values.returnDate,
          schemeId: currentScheme,
          shippingAddressLine1: values.shippingAddressLine1,
          shippingAddressLine2: values.shippingAddressLine2,
          shippingCity: values.shippingCity,
          shippingCountry: values.shippingCountry,
          shippingCounty: values.shippingCounty,
          shippingPostcode: values.shippingPostcode,
          socialHandles: values.socialHandles,
          storeOrDC: values.storeOrDC,
          title: values.title,
          willStockBeReturned: values.willStockBeReturned,
        },
      },
    });
  };

  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onFinish}>
      <Row>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Subject' })}
            name="title"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a subject',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Description' })}
            name="description"
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Reason For Removal' })}
            name="reason"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select a reason for removal',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              loading={reasonOptionsLoading}
              options={reasonOptions}
              style={{ width: 350 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Is this being picked from Store or DC ',
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
              <Radio.Button value="Store">
                <FormattedMessage defaultMessage="Store" />
              </Radio.Button>
              <Radio.Button value="DC">
                <FormattedMessage defaultMessage="DC" />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        {storeOrDC === 'Store' && (
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Select the store' })}
              name="businessId"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a business',
                  }),
                  required: true,
                },
              ]}
            >
              <BusinessesSelect disabled={saving} maxTagCount={1} showSearch />
            </Form.Item>
          </Col>
        )}
        {storeOrDC === 'DC' && (
          <>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Recipient Name' })}
                name="recipientName"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Recipient Phone',
                })}
                name="recipientPhone"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Recipient Email',
                })}
                name="recipientEmail"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a valid email',
                    }),
                    type: 'email',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Address Line 1',
                })}
                name="shippingAddressLine1"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please provide an address',
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
                  defaultMessage: 'Address Line 2',
                })}
                name="shippingAddressLine2"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'City' })}
                name="shippingCity"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please provide a city',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'County' })}
                name="shippingCounty"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Postcode' })}
                name="shippingPostcode"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please provide a postcode',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Country' })}
                name="shippingCountry"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Is this being recharged to Brand?',
            })}
            name="rechargeBrand"
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
              <Radio.Button value="Yes">
                <FormattedMessage defaultMessage="Yes" />
              </Radio.Button>
              <Radio.Button value="No">
                <FormattedMessage defaultMessage="No" />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          {rechargeBrand === 'Yes' && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Enter Brand Recharge Reference',
              })}
              name="rechargeReference"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'This is a required field.',
                  }),
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          {rechargeBrand === 'No' && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Enter Cost Centre/Nominal Budget code ',
              })}
              name="costCentreCode"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'This is a required field.',
                  }),
                  required: true,
                },
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Cost centre code must be in format 0000-000000 (4 digits, dash, 6 digits)',
                  }),
                  pattern: /^\d{4}-\d{6}$/,
                },
              ]}
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <Input maxLength={11} placeholder="0000-000000" />
            </Form.Item>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Will the stock be returned?',
            })}
            name="willStockBeReturned"
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
              <Radio.Button value="Yes">
                <FormattedMessage defaultMessage="Yes" />
              </Radio.Button>
              <Radio.Button value="No">
                <FormattedMessage defaultMessage="No" />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          {willStockBeReturned === 'Yes' && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Expected Return Date',
              })}
              name="returnDate"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'This is a required field.',
                  }),
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          )}
          {willStockBeReturned === 'No' && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Reason for the stock not being returned',
              })}
              name="reasonForNonReturn"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'This is a required field.',
                  }),
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Does this involve personality influences?',
            })}
            name="personalityInfluences"
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
              <Radio.Button value="Yes">
                <FormattedMessage defaultMessage="Yes" />
              </Radio.Button>
              <Radio.Button value="No">
                <FormattedMessage defaultMessage="No" />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        {personalityInfluences === 'Yes' && (
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Social Media Handles',
              })}
              name="socialHandles"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'This is a required field.',
                  }),
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Fascia' })}
            name="fascia"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'This is a required field.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              options={[
                { label: 'Alpine Bikes', value: 'Alpine Bikes' },
                { label: 'Bertie', value: 'Bertie' },
                {
                  label: 'Blacks',
                  value: 'Blacks',
                },
                { label: 'Champion', value: 'Champion' },
                { label: 'Chausport', value: 'Chausport' },
                { label: 'City Gear', value: 'City Gear' },
                { label: 'Cosmos', value: 'Cosmos' },
                { label: 'DeporVillage', value: 'DeporVillage' },
                { label: 'DTLR', value: 'DTLR' },
                { label: 'Finish Line', value: 'Finish Line' },
                { label: 'Fishing Republic', value: 'Fishing Republic' },
                { label: 'Footpatrol', value: 'Footpatrol' },
                { label: 'George Fisher', value: 'George Fisher' },
                { label: 'Go Express', value: 'Go Express' },
                { label: 'Go Outdoors', value: 'Go Outdoors' },
                { label: 'Hibbett', value: 'Hibbett' },
                { label: 'JD', value: 'JD' },
                { label: 'JD Gym', value: 'JD Gym' },
                { label: 'Kukri', value: 'Kukri' },
                { label: 'Livestock', value: 'Livestock' },
                { label: 'Macys', value: 'Macys' },
                { label: 'Naylors', value: 'Naylors' },
                { label: 'Nice Kicks', value: 'Nice Kicks' },
                { label: 'Oi Polloi', value: 'Oi Polloi' },
                { label: 'Shoe Palace', value: 'Shoe Palace' },
                { label: 'Size', value: 'Size' },
                { label: 'Sport Zone', value: 'Sport Zone' },
                { label: 'Sports Factory', value: 'Sports Factory' },
                { label: 'Sprinter', value: 'Sprinter' },
                { label: 'The Couture Club', value: 'The Couture Club' },
                { label: 'The HIP Store', value: 'The HIP Store' },
                { label: 'Tiso', value: 'Tiso' },
                { label: 'Ultimate Outdoors', value: 'Ultimate Outdoors' },
                { label: 'WellGosh', value: 'WellGosh' },
                { label: 'Woodhouse Clothing', value: 'Woodhouse Clothing' },
              ]}
              style={{ width: 350 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Select Approvers' })}
            name="approvers"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one approver.',
                }),
                required: true,
              },
            ]}
          >
            <UsersSelect
              allowClear
              mode="multiple"
              queryVars={{
                where: {
                  AND: [
                    {
                      groups: {
                        some: {
                          id: {
                            equals: APPROVER_GROUP_ID,
                          },
                        },
                      },
                    },
                    {
                      id: {
                        not: {
                          equals: currentUserId ?? '',
                        },
                      },
                    },
                  ],
                },
              }}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <StockRemovalGoods form={form} />
      <Row justify="end" style={{ paddingTop: 20 }}>
        <Col>
          <Button
            disabled={saving}
            htmlType="submit"
            loading={saving}
            type="primary"
          >
            <FormattedMessage defaultMessage="Submit Request" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStockRemovalRequest;
