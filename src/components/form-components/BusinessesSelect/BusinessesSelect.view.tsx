import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useBusinessesSideListQuery } from '#/components/businesses/BusinessSideList/graphql/queries/sidelist.generated';
import { Select, Typography } from 'antd';
import { QueryMode, SortOrder } from 'graphql/types';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

import type { BusinessesSelectQueryVariables } from './BusinessSelectQuery.generated';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: BusinessesSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const BusinessesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear = true,
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
  const intl = useIntl();
  const take = 1000;
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  // const { data, loading } = useBusinessesSelectQuery({
  //   variables: queryVars ?? {
  //     orderBy: {
  //       name: SortOrder.Asc,
  //     },
  //     take,
  //     where: {
  //       schemes: {
  //         some: {
  //           id: {
  //             equals: currentSchemeId,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const { data, fetchMore, loading } = useBusinessesSideListQuery({
    variables: {
      first: take,
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: currentSchemeId,
            },
          },
        },
      },
      ...queryVars,
    },
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          businessRelay: {
            ...fetchMoreResult.businessRelay,
            edges: [
              ...(prev.businessRelay?.edges || []),
              ...(fetchMoreResult.businessRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        after: data?.businessRelay.pageInfo.endCursor,
        first: 30,
        orderBy: { name: SortOrder.Asc },
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
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      data?.businessRelay.pageInfo.hasNextPage
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  // const onSearchBusiness = async (s: string) =>
  //   client
  //     .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
  //       query: SearchBusinessesDocument,
  //       variables: {
  //         where: {
  //           schemes: {
  //             some: {
  //               id: {
  //                 equals: currentSchemeId,
  //               },
  //             },
  //           },
  //           name: {
  //             contains: s,
  //             mode: QueryMode.Insensitive,
  //           },
  //         },
  //       },
  //     })
  //     .then((response) =>
  //       response.data.listBusinesses.businesses.length > 0
  //         ? [...response.data.listBusinesses.businesses].map((item) => ({
  //             label: item.name || '',
  //             value: item?.id || '',
  //             location: item?.locations[0].full || '',
  //           }))
  //         : [
  //             {
  //               label: 'No results found',
  //               value: '',
  //               disabled: true,
  //             },
  //           ]
  //     );

  const handleChange = (searchValueInput: string) => {
    const searchedIds = data?.businessRelay?.edges?.map(({ node }) => node.id);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          businessRelay: {
            ...prev.businessRelay,
            edges: [
              ...(prev.businessRelay?.edges || []),
              ...(fetchMoreResult.businessRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        first: 100,
        orderBy: { name: SortOrder.Asc },
        where: {
          id: {
            notIn: searchedIds,
          },
          name: {
            contains: searchValueInput,
            mode: QueryMode.Insensitive,
          },
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
  };

  // Use useCallback to memoize the debounced function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeHandler = useCallback(
    debounce(handleChange, 500), // 500ms delay
    [] // Empty dependency array because debounce and handleChange won't change
  );
  const sortedData = [...(data?.businessRelay?.edges || [])].sort((a, b) => {
    if (!value) return 0;
    if (value?.includes(a.node.id) && !value?.includes(b.node.id)) {
      return -1;
    }
    if (value?.includes(b.node.id) && !value?.includes(a.node.id)) {
      return 1;
    }
    return 0;
  });
  return (
    <Select
      allowClear={allowClear}
      className={className}
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      notFoundContent={
        loading ? intl.formatMessage({ defaultMessage: 'loading' }) : null
      }
      onChange={(selected: string[]) => {
        if (onChange) onChange(selected);
      }}
      onClear={() => {
        if (onChange) onChange([]);
      }}
      onPopupScroll={onScroll}
      onSearch={(v: string) => {
        if (data?.businessRelay?.pageInfo?.hasNextPage) {
          if (!v) {
            changeHandler.cancel();
            handleChange(v);
            return;
          }
          changeHandler(v);
        }
      }}
      optionFilterProp="label"
      placeholder={placeholder}
      size={size}
      style={style}
      value={value || undefined}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {sortedData.map(({ node: option }) => (
        <Select.Option key={option.id} label={option.name} value={option.id}>
          {option.name}
          {option.siteNumber &&
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            `(${option.siteNumber})`}

          {option.locations && option.locations.length > 0 ? (
            <Typography.Paragraph
              style={{ fontSize: 13, margin: 0 }}
              type="secondary"
            >
              {option.locations[0].full}
            </Typography.Paragraph>
          ) : null}
        </Select.Option>
      ))}
    </Select>
  );
  // );
};

export default BusinessesSelect;
