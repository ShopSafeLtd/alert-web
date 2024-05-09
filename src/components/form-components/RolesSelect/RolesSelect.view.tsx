import React from 'react';
import type { UserRolesQueryVariables } from 'graphql/generated';
import { useUserRolesQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

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
  queryVars?: UserRolesQueryVariables;
}

const RolesSelect: React.FC<Props & Omit<SelectProps, keyof Props>> = ({
  onChange,
  value,
  mode,
  style,
  size,
  className,
  placeholder,
  allowClear,
  maxTagCount,
  queryVars,
  ...props
}) => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useUserRolesQuery({
    variables: queryVars ?? {
      schemeId: currentSchemeId,
    },
  });

  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.roles.edges.map(({ node: role }) => ({
          value: role.id,
          label: role.name,
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

export default RolesSelect;
