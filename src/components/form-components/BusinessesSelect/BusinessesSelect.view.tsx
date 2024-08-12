import type { BusinessesSelectQueryVariables } from '#/components/form-components/BusinessesSelect/__generated__/BusinessSelectQuery.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type {
  DefaultOptionType,
  LabeledValue,
  SelectProps,
} from 'antd/lib/select';

import { useBusinessesSideListQuery } from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import { Select, Typography } from 'antd';
import { QueryMode, SortOrder } from 'graphql/types';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

export type ValueType =
  | LabeledValue
  | LabeledValue[]
  | number
  | number[]
  | string
  | string[];

interface Props {
  allowClear?: boolean;
  className?: string;
  getAddress?: (arg0: string) => void;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: BusinessesSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: ValueType;
}

function convertToArrayOfStrings(onChangeValue: ValueType): string[] {
  if (Array.isArray(onChangeValue)) {
    if (onChangeValue.every((item) => typeof item === 'string')) {
      return onChangeValue as string[];
    } else if (onChangeValue.every((item) => typeof item === 'number')) {
      return (onChangeValue as number[]).map((item) => item.toString());
    } else if ((onChangeValue[0] as LabeledValue).label === undefined) {
      return [];
    } else {
      return (onChangeValue as LabeledValue[]).map((item) =>
        item.value.toString()
      );
    }
  } else if (typeof onChangeValue === 'string') {
    return [onChangeValue];
  } else if (typeof onChangeValue === 'number') {
    return [onChangeValue.toString()];
  } else if (onChangeValue.label === undefined) {
    return [];
  } else {
    return [onChangeValue.value.toString()];
  }
}

export const businessSelectValueFormatter = <T extends string | string[]>(
  value: ValueType,
  returnType: T
): T => {
  const valueAsArray = convertToArrayOfStrings(value);

  return typeof returnType === 'string'
    ? (valueAsArray[0] as T)
    : (valueAsArray as T);
};

const filterOption = (inputValue: string, option?: DefaultOptionType) => {
  if (!option?.label) {
    return false;
  }
  if (React.isValidElement(option.label)) {
    const labelProps = option.label.props as { children: string[] };

    const labelText = labelProps.children[0] || '';

    return labelText.toLowerCase().includes(inputValue.toLowerCase());
  }
  return false;
};

/*
 TODO Return value is always a string[]. think it is because the onchange is set to always be string[]. Need to look at more
 */
const BusinessesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear = true,
  className,
  getAddress,
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
  const [fetchingMore, setFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, fetchMore, loading } = useBusinessesSideListQuery({
    onCompleted: () => {
      setFetchingMore(false);
    },
    onError: () => {
      setFetchingMore(false);
    },
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
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;
        const prevIds = prev.businessRelay?.edges.map(({ node }) => node.id);
        return {
          businessRelay: {
            ...fetchMoreResult.businessRelay,
            edges: [
              ...(prev.businessRelay?.edges || []),
              ...(fetchMoreResult.businessRelay?.edges.filter(
                ({ node }) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.businessRelay.pageInfo.endCursor,
        first: 30,
        orderBy: { name: SortOrder.Asc },
        where: {
          name: {
            contains: searchTerm,
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

  const handleChange = (searchValueInput: string) => {
    setSearchTerm(searchValueInput);
    setFetchingMore(true);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;
        const prevIds = prev.businessRelay?.edges.map(({ node }) => node.id);
        return {
          businessRelay: {
            ...fetchMoreResult.businessRelay,
            edges: [
              ...(prev.businessRelay?.edges || []),
              ...(fetchMoreResult.businessRelay?.edges.filter(
                ({ node }) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        first: 100,
        orderBy: { name: SortOrder.Asc },
        where: {
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

  function handleValue(value: ValueType, id: string): boolean {
    if (Array.isArray(value) && value[0] === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return value === id;
    } else if (Array.isArray(value) && typeof value[0] === 'string') {
      // @ts-expect-error type error
      return value.includes(id);
    } else if (typeof value === 'number') {
      return false;
    } else if (Array.isArray(value) && typeof value[0] === 'number') {
      return false;
    } else if ((value as LabeledValue).label !== undefined) {
      return (value as LabeledValue).value === id;
    } else if (
      Array.isArray(value) &&
      (value[0] as LabeledValue).label !== undefined
    ) {
      return value.some((v) => (v as LabeledValue).value === id);
    } else {
      console.log('Unknown value type:', value);
      return false;
    }
  }

  // Use useCallback to memoize the debounced function
  const changeHandler = useCallback(
    debounce(handleChange, 800), // 800ms delay
    [debounce, handleChange]
  );

  const sortedData = [...(data?.businessRelay?.edges || [])].sort((a, b) => {
    if (!value) return 0;

    const aValueIncludes = handleValue(value, a.node.id);
    const bValueIncludes = handleValue(value, b.node.id);

    if (aValueIncludes && !bValueIncludes) {
      return -1;
    }
    if (bValueIncludes && !aValueIncludes) {
      return 1;
    }
    return 0;
  });

  const options: SelectProps['options'] = sortedData.map(
    ({ node: option }) => ({
      key: option.id,
      label: (
        <>
          {option.name}
          {option.siteNumber && `(${option.siteNumber})`}
          {option.locations && option.locations.length > 0 ? (
            <Typography.Paragraph
              style={{ fontSize: 13, margin: 0 }}
              type="secondary"
            >
              {option.locations[0].full}
            </Typography.Paragraph>
          ) : null}
        </>
      ),
      value: option.id,
    })
  );

  // {/* {sortedData.map(({ node: option }) => ( */}
  // {/*   <Select.Option key={option.id} value={option.id} label={option.name}> */}
  // {/*     {option.name} */}
  // {/*     /!* eslint-disable-next-line formatjs/no-literal-string-in-jsx *!/ */}
  // {/*     {option.siteNumber && `(${option.siteNumber})`} */}
  // {/*     {option.locations && option.locations.length > 0 ? ( */}
  // {/*       <Typography.Paragraph */}
  // {/*         type="secondary" */}
  // {/*         style={{ fontSize: 13, margin: 0 }} */}
  // {/*       > */}
  // {/*         {option.locations[0].full} */}
  // {/*       </Typography.Paragraph> */}
  // {/*     ) : null} */}
  // {/*   </Select.Option> */}
  // {/* ))} */}
  // {/* </Select> */}
  //
  return (
    <Select
      allowClear={allowClear}
      className={className}
      filterOption={filterOption}
      loading={loading || fetchingMore}
      maxTagCount={maxTagCount}
      mode={mode}
      notFoundContent={
        loading || fetchingMore
          ? intl.formatMessage({ defaultMessage: 'loading' })
          : null
      }
      onChange={(selected: ValueType) => {
        if (onChange) onChange(convertToArrayOfStrings(selected));
        if (getAddress) {
          const location = sortedData.find(({ node }) => node.id === selected);
          console.log(selected, location);
          if (location) {
            getAddress(location.node.locations[0].full || '');
          }
        }
      }}
      onClear={() => {
        if (onChange) onChange([]);
      }}
      onPopupScroll={onScroll}
      onSearch={(v: string) => {
        changeHandler(v);
      }}
      optionFilterProp="label"
      options={options}
      placeholder={placeholder}
      size={size}
      style={style}
      value={value || undefined}
      {...props}
    />
  );
};

export default BusinessesSelect;
