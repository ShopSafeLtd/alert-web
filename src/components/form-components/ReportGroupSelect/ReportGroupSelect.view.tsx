import type { ReportGroupsSelectQueryVariables } from '#/components/form-components/ReportGroupSelect/__generated__/ReportGroup.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useReportGroupsSelectQuery } from '#/components/form-components/ReportGroupSelect/__generated__/ReportGroup.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { useAtomValue } from 'jotai/index';
import { debounce } from 'lodash-es';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: ReportGroupsSelectQueryVariables;
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
  const take = 20;
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data, fetchMore, loading } = useReportGroupsSelectQuery({
    variables: {
      first: take,
      where: {
        schemeId,
      },
      ...queryVars,
    },
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          reportGroups: {
            ...fetchMoreResult.reportGroups,
            edges: [
              ...(prev.reportGroups?.edges || []),
              ...(fetchMoreResult.reportGroups?.edges || []),
            ],
          },
        };
      },
      variables: {
        after: data?.reportGroups.pageInfo.endCursor,
        first: 30,
        where: {
          schemeId,
        },
      },
    });
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      data?.reportGroups.pageInfo.hasNextPage
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  const handleChange = (searchValueInput: string) => {
    const searchedIds = data?.reportGroups?.edges?.map(({ node }) => node.id);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          reportGroups: {
            ...prev.reportGroups,
            edges: [
              ...(prev.reportGroups?.edges || []),
              ...(fetchMoreResult.reportGroups?.edges || []),
            ],
          },
        };
      },
      variables: {
        first: 30,
        where: {
          schemeId,
          search: searchValueInput,
          searchedIds,
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
  const sortedData = [...(data?.reportGroups?.edges || [])].sort((a, b) => {
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
        if (data?.reportGroups?.pageInfo?.hasNextPage) {
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
      options={sortedData.map(({ node: option }) => ({
        label: option.name,
        value: option.id,
      }))}
    />
  );
  // );
};

export default BusinessesSelect;
