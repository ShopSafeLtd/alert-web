import React, { useCallback } from 'react';
import type { BusinessesSelectQueryVariables } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useBusinessesSideListQuery,
} from 'graphql/generated';
import { Select, Typography } from 'antd';
import { useStoreState } from 'state';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';

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
  allowClear = true,
  maxTagCount,
  queryVars,
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

  const { data, loading, fetchMore } = useBusinessesSideListQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      first: take,
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
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: currentSchemeId,
              },
            },
          },
        },
        orderBy: { name: SortOrder.Asc },
        first: 30,
        after: data?.businessRelay.pageInfo.endCursor,
      },
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
      variables: {
        where: {
          id: {
            notIn: searchedIds,
          },
          schemes: {
            some: {
              id: {
                equals: currentSchemeId,
              },
            },
          },
          name: {
            contains: searchValueInput,
            mode: QueryMode.Insensitive,
          },
        },
        orderBy: { name: SortOrder.Asc },
        first: 100,
      },
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
      value={value || undefined}
      onChange={(selected: string[]) => {
        if (onChange) onChange(selected);
      }}
      mode={mode}
      onPopupScroll={onScroll}
      loading={loading}
      style={style}
      size={size}
      className={className}
      placeholder={placeholder}
      allowClear={allowClear}
      maxTagCount={maxTagCount}
      optionFilterProp="label"
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
      notFoundContent={
        loading
          ? intl.formatMessage({ defaultMessage: 'loading', id: '8LHz4z' })
          : null
      }
      onClear={() => {
        if (onChange) onChange([]);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {sortedData.map(({ node: option }) => (
        <Select.Option key={option.id} value={option.id} label={option.name}>
          {option.name}
          {option.siteNumber &&
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            `(${option.siteNumber})`}

          {option.locations && option.locations.length > 0 ? (
            <Typography.Paragraph
              type="secondary"
              style={{ fontSize: 13, margin: 0 }}
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
