import React from 'react';
import { Select } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import type { SchemeGroupsSelectQueryVariables } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import { useSchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import { SortOrder } from 'graphql/types';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  mode?: 'multiple' | 'tags';
  style?: React.CSSProperties;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
  size?: SizeType;
  maxTagCount?: number | 'responsive';
  groupsQueryVars?: SchemeGroupsSelectQueryVariables;
}

const GroupsSelect: React.FC<Props & Omit<SelectProps, keyof Props>> = ({
  onChange,
  value,
  mode,
  style,
  size,
  className,
  placeholder,
  allowClear,
  maxTagCount,
  groupsQueryVars,
  ...props
}) => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);
  const { id: userId } = useStoreState((state) => state.user);

  const { data, loading } = useSchemeGroupsSelectQuery({
    fetchPolicy: 'cache-first',
    variables: groupsQueryVars ?? {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
        users: {
          some: {
            id: {
              equals: userId,
            },
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
      optionFilterProp="label"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default GroupsSelect;
