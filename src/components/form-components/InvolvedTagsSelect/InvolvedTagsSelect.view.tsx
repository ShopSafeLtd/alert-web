import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { useListTagsQuery } from 'graphql/tags/queries/__generated__/list_tags.generated';
import { TagType } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React from 'react';

interface Props extends SelectProps {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const InvolvedTagsSelect: React.FC<Props> = ({
  allowClear,
  className,
  maxTagCount,
  onChange,
  placeholder,
  size,
  style,
  value,
  ...props
}) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useListTagsQuery({
    skip: !schemeId,
    variables: {
      where: {
        schemes: { some: { id: { equals: schemeId } } },
        type: { equals: TagType.IncidentInvolved },
      },
    },
  });

  return (
    <Select
      allowClear={allowClear}
      className={className}
      loading={loading}
      maxTagCount={maxTagCount}
      mode="multiple"
      onChange={onChange}
      optionFilterProp="label"
      placeholder={placeholder}
      showSearch
      size={size}
      style={style}
      value={value}
      {...props}
    >
      {data?.listTags.tags.map((tag) => (
        <Select.Option key={tag.id} label={tag.name} value={tag.id}>
          {tag.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default InvolvedTagsSelect;
