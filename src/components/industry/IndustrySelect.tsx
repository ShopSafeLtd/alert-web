import React from 'react';
import { useIndustriesQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useIntl } from 'react-intl';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const IndustrySelect = ({ value, onChange }: Props) => {
  const intl = useIntl();
  const { data, loading } = useIndustriesQuery();

  return (
    <Select
      placeholder={intl.formatMessage({
        defaultMessage: 'Select Industries',
        id: '7Yehsy',
      })}
      mode="multiple"
      maxTagCount="responsive"
      onChange={onChange}
      value={value}
      style={{ width: '100%' }}
    >
      {data?.industries?.map((industry) => (
        <Select.Option loading={loading} key={industry.id} value={industry.id}>
          {industry.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IndustrySelect;
