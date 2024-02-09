import React from 'react';
import type { FetchResult } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { useIntl } from 'react-intl';
import type { CreateActiveChecklistMutation } from '../../../../graphql/generated';
import { useStoreState } from '../../../../state';

interface Props {
  createActive: ({
    checklistId,

    businessId,
    title,
  }: {
    checklistId: string;
    businessId: string | null;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  checklistId: string;
  defaultTitle: string;
  close: () => void;
}

interface FormData {
  title: string;
  businessId: string | null;
}

const createActiveChecklistDrawer = ({
  createActive,
  checklistId,
  defaultTitle,
  close,
}: Props) => {
  const userBusinesses = useStoreState((state) => state.user.businesses);
  const intl = useIntl();
  const handleSubmit = (formData: FormData) => {
    const { title, businessId } = formData;
    void createActive({ checklistId, businessId, title });
    close();
  };

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{
        title: defaultTitle,
        businessId: null,
      }}
    >
      <Form.Item
        name="title"
        label={intl.formatMessage({ id: '9a9+ww', defaultMessage: 'Title' })}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="businessId"
        label={intl.formatMessage({ id: 'w1Fanr', defaultMessage: 'Business' })}
      >
        <Select>
          {userBusinesses.map((business) => (
            <Select.Option key={business.id} value={business.id}>
              {business.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button onClick={close} style={{ marginRight: 12 }}>
          {intl.formatMessage({ id: '47FYwb', defaultMessage: 'Cancel' })}
        </Button>
        <Button type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'VzzYJk', defaultMessage: 'Create' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default createActiveChecklistDrawer;
