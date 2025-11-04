import type { BusinessesSelectQueryVariables } from '#/components/form-components/BusinessesSelect/__generated__/BusinessSelectQuery.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type {
  DefaultOptionType,
  LabeledValue,
  SelectProps,
} from 'antd/lib/select';

import {
  useBusinessesSideListLazyQuery,
  useBusinessesSideListQuery,
} from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faSquareCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Select, Tooltip, Typography } from 'antd';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { debounce } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

export type ValueType =
  | LabeledValue
  | LabeledValue[]
  | number
  | number[]
  | string
  | string[];

interface Props {
  allSelected?: boolean;
  allowClear?: boolean;
  allowSelectAll?: boolean;
  className?: string;
  getAddress?: (arg0: string) => void;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  onSelectAll?: () => void;
  placeholder?: string;
  queryVars?: BusinessesSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: ValueType;
}

const useStyles = createUseStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  select: {
    '& .ant-select-selector': {
      borderBottomRightRadius: '0px !important',
      borderTopRightRadius: '0px !important',
    },
  },
});
// ?????
function convertToArrayOfStrings(onChangeValue: ValueType): string[] {
  if (!onChangeValue) return [];
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
  if (typeof option.label === 'string') {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  }
  return false;
};

/*
 TODO Return value is always a string[]. think it is because the onchange is set to always be string[]. Need to look at more
 */
const BusinessesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allSelected,
  allowClear = true,
  allowSelectAll,
  className,
  getAddress,
  maxTagCount,
  mode,
  onChange,
  onSelectAll,
  placeholder,
  queryVars,
  size,
  style = {},
  value,
  ...props
}) => {
  const styles = useStyles();
  const intl = useIntl();
  const take = 50;
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialValues] = useState(value ? convertToArrayOfStrings(value) : []);
  const [selectedMissingBusinesses, setSelectedMissingBusinesses] = useState<
    SelectProps['options']
  >([]);

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

  const [fetchMissing] = useBusinessesSideListLazyQuery({
    onCompleted: (extraData) => {
      if (extraData.businessRelay.edges.length > 0) {
        setSelectedMissingBusinesses(
          extraData.businessRelay.edges.map(
            ({ node: option }) =>
              ({
                children: (
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
                key: option.id,
                label:
                  option.name +
                  (option.siteNumber ? ` (${option.siteNumber})` : ''),
                value: option.id,
              }) as unknown as DefaultOptionType
          )
        );
      }
    },
  });

  useEffect(() => {
    if (initialValues.length > 0) {
      const missing = initialValues.filter(
        (item) =>
          !data?.businessRelay.edges.some(({ node }) => node.id === item)
      );
      if (missing.length > 0) {
        void fetchMissing({
          variables: {
            first: 50,
            orderBy: {
              name: SortOrder.Asc,
            },
            where: {
              id: {
                in: missing,
              },
            },
          },
        });
      }
    }
  }, [initialValues, data]);

  const next = () => {
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
        first: 50,
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
    ({ node: option }) =>
      ({
        children: (
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
        key: option.id,
        label:
          option.name + (option.siteNumber ? ` (${option.siteNumber})` : ''),
        value: option.id,
      }) as unknown as DefaultOptionType
  );

  const merged = [...(selectedMissingBusinesses || []), ...options];

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

  const selectAll = () => {
    if (onSelectAll) {
      onSelectAll();
    }
    if (onChange && !onSelectAll) {
      onChange(merged.map((item) => item.value as string));
    }
  };

  return (
    <Row>
      <Col flex={1}>
        <Select
          allowClear={allowClear}
          className={className ?? allowSelectAll ? styles.select : undefined}
          disabled={allSelected || props.disabled}
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
            const selectedStrings = convertToArrayOfStrings(selected);
            // const newStrings = new Set(
            //   selectedStrings.filter(
            //     (item) =>
            //       !selectedMissingBusinesses?.some(
            //         (missing) => missing.value === item
            //       )
            //   )
            // );

            // const newOptions =
            //   options.filter((item) => newStrings.has(item.value as string)) || [];
            if (onChange) onChange(selectedStrings);
            if (getAddress) {
              const location = sortedData.find(
                ({ node }) => node.id === selected
              );
              if (location) {
                getAddress(location.node.locations[0].full || '');
              }
            }
            // setSelectedMissingBusinesses([
            //   ...(selectedMissingBusinesses || []),
            //   ...newOptions,
            // ]);
          }}
          onClear={() => {
            if (onChange) onChange([]);
          }}
          onPopupScroll={onScroll}
          onSearch={(v: string) => {
            changeHandler(v);
          }}
          optionFilterProp="label"
          options={merged}
          placeholder={placeholder}
          size={size}
          style={style}
          value={allSelected ? [] : value || undefined}
          {...props}
        />
      </Col>
      <Col>
        {allowSelectAll && (
          <Tooltip
            placement="bottom"
            title={
              allSelected
                ? intl.formatMessage({
                    defaultMessage: 'Select specific',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Select all',
                  })
            }
          >
            <Button
              className={styles.button}
              danger={allSelected}
              onClick={selectAll}
              type={allSelected ? 'primary' : undefined}
            >
              <FontAwesomeIcon icon={faSquareCheck} />
            </Button>
          </Tooltip>
        )}
      </Col>
    </Row>
  );
};

export default BusinessesSelect;
