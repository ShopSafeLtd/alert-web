import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateStockRemovalRequestMutation } from '#/views/stock-removal-requests/components/AddStockRemovalRequest/graphql/__generated__/create-stock-removal-request.generated';
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
  personalityInfluences: string;
  reason: string;
  reasonForNonReturn?: string;
  rechargeReference?: string;
  rechargedToBrand: string;
  returnDate: Date;
  smqAccountNumber?: string;
  socialHandles?: string;
  storeOrDC: 'DC' | 'Store';
  title: string;
  willStockBeReturned: string;
}

const AddStockRemovalRequest = ({ onClose }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [saving, setSaving] = useState(false);

  const storeOrDC = Form.useWatch('storeOrDC', form);
  const rechargeBrand = Form.useWatch('rechargedToBrand', form);
  const willStockBeReturned = Form.useWatch('willStockBeReturned', form);
  const personalityInfluences = Form.useWatch('personalityInfluences', form);

  const [createRemovalRequest] = useCreateStockRemovalRequestMutation();

  const onFinish = (values: FormData) => {
    setSaving(true);
    void createRemovalRequest({
      onCompleted: () => {
        setSaving(false);
        notification.success({
          description: intl.formatMessage({
            defaultMessage:
              'The approvers have been notified of your new request.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Request Created',
          }),
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
          description: values.description,
          items: values.items.map((i) => ({
            itemId: i.stockItem ?? '',
            quantity: i.quantity ?? 0,
          })),
          schemeId: currentScheme,
          title: values.title,
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
          >
            <Select
              disabled={saving}
              options={[
                { label: 'Competition', value: 'Competition' },
                { label: 'Influencer Seeding', value: 'Influencer Seeding' },
                {
                  label: 'Promotional Payment - eg. Store DJs',
                  value: 'Promotional Payment - eg. Store DJs',
                },
                { label: 'Photoshoot', value: 'Photoshoot' },
                { label: 'Product testing', value: 'Product testing' },
                { label: 'Staff Uniform', value: 'Staff Uniform' },
                { label: 'Senior Mgmt e.g', value: 'Senior Mgmt e.g' },
                { label: 'Directors', value: 'Directors' },
                { label: 'Product Development', value: 'Product Development' },
                { label: 'Activation', value: 'Activation' },
              ]}
              style={{ width: 350 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Is this being picked from Store or DC ',
            })}
            name="storeOrDC"
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
              <BusinessesSelect disabled={saving} maxTagCount={1} />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Is this being recharged to Brand?',
            })}
            name="rechargedToBrand"
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
            >
              <Input />
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
                defaultMessage: 'Enter SMQ Account Number',
              })}
              name="smqAccountNumber"
            >
              <Input />
            </Form.Item>
          )}
          {willStockBeReturned === 'Yes' && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Return Date',
              })}
              name="Return Date"
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
            >
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Reason For Removal' })}
            name="fascia"
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
            <UsersSelect mode="multiple" />
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
