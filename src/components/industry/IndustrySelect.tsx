import type { SelectProps } from 'antd/lib/select';

import { Select } from 'antd';
import { useIndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  onChange?: (value: string[]) => void;
  value?: string[];
}

const IndustrySelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  onChange,
  value,
}) => {
  const intl = useIntl();
  const { data, loading } = useIndustriesQuery();

  return (
    <Select
      maxTagCount="responsive"
      mode="multiple"
      onChange={onChange}
      placeholder={intl.formatMessage({
        defaultMessage: 'Select Industries',
      })}
      style={{ width: '100%' }}
      value={value}
    >
      {data?.industries?.map((industry) => (
        <Select.Option key={industry.id} loading={loading} value={industry.id}>
          {industry.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IndustrySelect;
