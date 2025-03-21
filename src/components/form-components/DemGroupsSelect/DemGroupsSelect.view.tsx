import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import type { DemGroupsSelectQueryVariables } from './graphql/queries/__generated__/dem-groups.generated';

import { useDemGroupsSelectQuery } from './graphql/queries/__generated__/dem-groups.generated';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: DemGroupsSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const DemGroupsSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
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
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const { data, fetchMore, loading } = useDemGroupsSelectQuery({
    variables: {
      where: {
        scheme: { id: { equals: currentSchemeId } },
      },
      ...queryVars,
    },
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          demGroups: {
            ...fetchMoreResult.demGroups,
            edges: [
              ...(prev.demGroups?.edges || []),
              ...(fetchMoreResult.demGroups?.edges || []),
            ],
          },
        };
      },
      variables: {
        after: data?.demGroups.pageInfo.endCursor,
        first: 30,
        orderBy: { name: SortOrder.Asc },
        where: {
          scheme: { id: { equals: currentSchemeId } },
        },
      },
    });
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      data?.demGroups.pageInfo.hasNextPage
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  const handleChange = (searchValueInput: string) => {
    const searchedIds = data?.demGroups.edges.map(({ node }) => node.id);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          demGroups: {
            ...prev.demGroups,
            edges: [
              ...(prev.demGroups?.edges || []),
              ...(fetchMoreResult.demGroups?.edges || []),
            ],
          },
        };
      },
      variables: {
        first: 100,
        where: {
          id: {
            notIn: searchedIds,
          },
          scheme: { id: { equals: currentSchemeId } },
          search: searchValueInput,
        },
      },
    });
  };

  // Use useCallback to memoize the debounced function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeHandler = useCallback(
    debounce(handleChange, 500), // 800ms delay
    [debounce, handleChange]
  );
  const sortedData = [...(data?.demGroups?.edges || [])].sort((a, b) => {
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
        if (data?.demGroups?.pageInfo?.hasNextPage) {
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
        </Select.Option>
      ))}
    </Select>
  );
  // );
};

export default DemGroupsSelect;
