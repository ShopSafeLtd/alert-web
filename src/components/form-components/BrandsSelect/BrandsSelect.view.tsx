import React from 'react';

import { Select } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import type { BrandsQueryVariables } from '#/views/settings/brands/graphql/queries/brands.generated';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/brands.generated';
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
  queryVars?: BrandsQueryVariables;
}

const BusinessesSelect: React.FC<Props & Omit<SelectProps, keyof Props>> = ({
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
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.brands.edges.map(({ node: brand }) => ({
          value: brand.id,
          label: brand.name,
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

export default BusinessesSelect;
