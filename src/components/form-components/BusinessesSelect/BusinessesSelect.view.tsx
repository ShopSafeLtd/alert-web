import React from 'react';
import type {
  BusinessesSelectQueryVariables,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  useBusinessesSelectQuery,
  SortOrder,
  SearchBusinessesDocument,
  QueryMode,
} from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import DebounceSelect from '#/components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import { useApolloClient } from '@apollo/client';

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
  queryVars?: BusinessesSelectQueryVariables;
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
  const intl = useIntl();
  const client = useApolloClient();

  const take = 1000;
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useBusinessesSelectQuery({
    variables: queryVars ?? {
      orderBy: {
        name: SortOrder.Asc,
      },
      take,
      where: {
        schemes: {
          some: {
            id: {
              equals: currentSchemeId,
            },
          },
        },
      },
    },
  });

  const onSearchBusiness = async (searchValue: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentSchemeId,
                },
              },
            },
            name: {
              contains: searchValue,
              mode: QueryMode.Insensitive,
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? [...response.data.listBusinesses.businesses].map((item) => ({
              label: item.name || '',
              value: item?.id || '',
              location: item?.locations[0].full || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );

  return !loading && data && data?.listBusinesses.total > take ? (
    <DebounceSelect
      showSearch
      allowClear
      mode="multiple"
      maxTagCount={3}
      disabled={loading}
      placeholder={intl.formatMessage({
        defaultMessage: 'Search for a business...',
        id: 'qaJxSS',
      })}
      fetchOptions={onSearchBusiness}
      style={{ width: '100%' }}
    />
  ) : (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.listBusinesses.businesses.map((business) => ({
          value: business.id,
          label: business.name,
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
