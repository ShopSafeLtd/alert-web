import type { BrandsQueryVariables } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { Select } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: BrandsQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const BusinessesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear,
  className,
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

  const { data, loading } = useBrandsQuery({
    variables: queryVars ?? {
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
      allowClear={allowClear}
      className={className}
      disabled={loading}
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      onChange={onChange}
      optionFilterProp="label"
      options={
        data?.brands.edges.map(({ node: brand }) => ({
          label: brand.name,
          value: brand.id,
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

export default BusinessesSelect;
