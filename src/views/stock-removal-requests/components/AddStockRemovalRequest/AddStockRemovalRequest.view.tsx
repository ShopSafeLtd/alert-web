import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateStockRemovalRequestMutation } from '#/views/stock-removal-requests/components/AddStockRemovalRequest/graphql/__generated__/create-stock-removal-request.generated';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import StockRemovalGoods from '../StockRemovalGoods/StockRemovalGoods.container';

interface Props {
  onClose: () => void;
}

export interface FormData {
  approvers: string[];
  businessId: string[];
  description: string;
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
  title: string;
}

const AddStockRemovalRequest = ({ onClose }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [saving, setSaving] = useState(false);

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
          businessId: values.businessId[0],
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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Business' })}
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
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Approvers' })}
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
