import React from 'react';
import { SortOrder, useSchemeGroupsQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  mode?: 'multiple' | 'tags';
  style?: React.CSSProperties;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
  size?: SizeType;
  maxTagCount?: number;
}

const GroupsSelect = ({
  onChange,
  value,
  mode,
  style,
  size,
  className,
  placeholder,
  allowClear,
  maxTagCount,
}: Props) => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useSchemeGroupsQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
    },
  });

  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.groups.map((group) => ({
          value: group.id,
          label: group.name,
        })) || []
      }
      loading={loading}
      disabled={loading}
      style={style}
      size={size}
      className={className}
      placeholder={placeholder}
      allowClear={allowClear}
      maxTagCount={maxTagCount}
    />
  );
};

export default GroupsSelect;
