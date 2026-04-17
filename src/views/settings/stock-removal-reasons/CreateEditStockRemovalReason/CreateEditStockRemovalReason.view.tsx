import { Button, Form, Input, InputNumber, Space, Switch } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

export interface ReasonFormData {
  active: boolean;
  label: string;
  position?: number;
}

interface Props {
  initData?: ReasonFormData;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: ReasonFormData) => void;
}

const CreateEditStockRemovalReason = ({
  initData,
  loading,
  onCancel,
  onSubmit,
}: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<ReasonFormData>();

  return (
    <Form
      form={form}
      initialValues={{ active: true, ...initData }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Label' })}
        name="label"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a reason label',
            }),
            required: true,
          },
        ]}
      >
        <Input
          placeholder={intl.formatMessage({
            defaultMessage: 'e.g., Competition, Photoshoot',
          })}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Position' })}
        name="position"
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Active' })}
        name="active"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Space>
        <Button disabled={loading} onClick={onCancel}>
          {intl.formatMessage({ defaultMessage: 'Cancel' })}
        </Button>
        <Button htmlType="submit" loading={loading} type="primary">
          {intl.formatMessage({ defaultMessage: 'Save' })}
        </Button>
      </Space>
    </Form>
  );
};

export default CreateEditStockRemovalReason;
