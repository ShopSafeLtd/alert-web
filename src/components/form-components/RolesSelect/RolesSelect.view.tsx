import type { UserRolesQueryVariables } from '#/components/form-components/user/graphql/queries/__generated__/custom-roles.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useUserRolesQuery } from '#/components/form-components/user/graphql/queries/__generated__/custom-roles.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
  allowClear?: boolean;
  className?: string;
  excludeIds?: string[];
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: UserRolesQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const RolesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear,
  className,
  excludeIds = [],
  maxTagCount,
  mode,
  onChange,
  placeholder,
  queryVars,
  size,
  style,
  value,
  ...props
}) => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useUserRolesQuery({
    variables: queryVars ?? {
      schemeId: currentSchemeId,
      take: 1000,
    },
  });

  return (
    <Select
      allowClear={allowClear}
      className={className}
      disabled={loading}
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      onChange={onChange}
      optionFilterProp="label"
      options={
        data?.roles.edges
          .filter(({ node: { id } }) => !excludeIds.includes(id))
          .map(({ node: role }) => ({
            label: role.name,
            value: role.id,
          })) || []
      }
      placeholder={placeholder}
      size={size}
      style={style}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default RolesSelect;
