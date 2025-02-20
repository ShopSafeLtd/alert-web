import type { CreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import type { FetchResult } from '@apollo/client';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  checklistId: string;
  close: () => void;
  createActive: ({
    businessId,

    checklistId,
    title,
  }: {
    businessId: null | string;
    checklistId: string;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  defaultTitle: string;
}

interface FormData {
  businessId: null | string[];
  title: string;
}

const createActiveChecklistDrawer = ({
  checklistId,
  close,
  createActive,
  defaultTitle,
}: Props) => {
  const intl = useIntl();
  const handleSubmit = (formData: FormData) => {
    const { businessId, title } = formData;
    const businessIdFormatted = businessId ? businessId[0] : '';
    void createActive({ businessId: businessIdFormatted, checklistId, title });
    close();
  };

  return (
    <Form
      initialValues={{
        businessId: null,
        title: defaultTitle,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Title' })}
        name="title"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Business' })}
        name="businessId"
      >
        <BusinessesSelect
          allowClear
          placeholder={intl.formatMessage({
            defaultMessage: 'Search for a business...',
          })}
          showSearch
          style={{ width: 300 }}
        />
        {/* <Select>*/}
        {/*  {userBusinesses.map((business) => (*/}
        {/*    <Select.Option key={business.id} value={business.id}>*/}
        {/*      {business.name}*/}
        {/*    </Select.Option>*/}
        {/*  ))}*/}
        {/* </Select>*/}
      </Form.Item>
      <Form.Item>
        <Button onClick={close} style={{ marginRight: 12 }}>
          {intl.formatMessage({ defaultMessage: 'Cancel' })}
        </Button>
        <Button htmlType="submit" type="primary">
          {intl.formatMessage({ defaultMessage: 'Create' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default createActiveChecklistDrawer;
