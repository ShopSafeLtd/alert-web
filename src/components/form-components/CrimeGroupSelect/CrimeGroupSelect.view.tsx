import type { CrimeGroupsSelectQueryVariables } from '#/components/form-components/CrimeGroupSelect/graphql/queries/__generated__/CrimeGroupSelectQuery.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useCrimeGroupsSelectQuery } from '#/components/form-components/CrimeGroupSelect/graphql/queries/__generated__/CrimeGroupSelectQuery.generated';
import { useStoreState } from '#/state';
import { Select } from 'antd';
import { SortOrder } from 'graphql/types';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: CrimeGroupsSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const CrimeGroupSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
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

  const { data, fetchMore, loading } = useCrimeGroupsSelectQuery({
    variables: {
      first: take,
      orderBy: [
        {
          alias: SortOrder.Asc,
        },
      ],
      where: {
        schemeIds: [currentSchemeId],
      },
      ...queryVars,
    },
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          crimeGroups: {
            ...fetchMoreResult.crimeGroups,
            edges: [
              ...(prev.crimeGroups?.edges || []),
              ...(fetchMoreResult.crimeGroups?.edges || []),
            ],
          },
        };
      },
      variables: {
        after: data?.crimeGroups.pageInfo.endCursor,
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
      data?.crimeGroups.pageInfo.hasNextPage
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  const handleChange = (searchValueInput: string) => {
    const searchedIds = data?.crimeGroups.edges.map(({ node }) => node.id);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          crimeGroups: {
            ...prev.crimeGroups,
            edges: [
              ...(prev.crimeGroups?.edges || []),
              ...(fetchMoreResult.crimeGroups?.edges || []),
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
          schemes: currentSchemeId,
          search: searchValueInput,
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
  const sortedData = [...(data?.crimeGroups?.edges || [])].sort((a, b) => {
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
        if (data?.crimeGroups?.pageInfo?.hasNextPage) {
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
        <Select.Option key={option.id} label={option.alias} value={option.id}>
          {option.alias}
          {option.reference &&
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            `(${option.reference})`}
        </Select.Option>
      ))}
    </Select>
  );
  // );
};

export default CrimeGroupSelect;
