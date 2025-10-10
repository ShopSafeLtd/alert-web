import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface IncidentStatusData {
  description?: string;
  name: string;
  tooltip?: string;
}

interface Props {
  initData?: IncidentStatusData;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: IncidentStatusData) => void;
}

const CreateEditIncidentStatus = ({
  initData,
  loading,
  onCancel,
  onSubmit,
}: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const handleSubmit = (values: IncidentStatusData) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      initialValues={initData}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Name' })}
        name="name"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a status name',
            }),
            required: true,
          },
        ]}
      >
        <Input
          placeholder={intl.formatMessage({
            defaultMessage: 'e.g., Open, In Progress, Resolved',
          })}
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Description' })}
        name="description"
      >
        <Input.TextArea
          placeholder={intl.formatMessage({
            defaultMessage: 'Description of this status',
          })}
          rows={4}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button htmlType="submit" loading={loading} type="primary">
            {initData
              ? intl.formatMessage({ defaultMessage: 'Update' })
              : intl.formatMessage({ defaultMessage: 'Create' })}
          </Button>
          <Button onClick={onCancel}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateEditIncidentStatus;
