import type { UsersSelectQueryVariables } from '#/components/form-components/UsersSelect/__generated__/users-select-query.generated';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { LabeledValue, SelectProps } from 'antd/lib/select';

import {
  useUsersSelectLazyQuery,
  useUsersSelectQuery,
} from '#/components/form-components/UsersSelect/__generated__/users-select-query.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { debounce } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

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
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  queryVars?: UsersSelectQueryVariables;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: ValueType;
}

function convertToArrayOfStrings(onChangeValue: ValueType): string[] {
  if (!onChangeValue) return [];
  if (Array.isArray(onChangeValue)) {
    if (onChangeValue.every((item) => typeof item === 'string')) {
      return onChangeValue;
    } else if (onChangeValue.every((item) => typeof item === 'number')) {
      return onChangeValue.map((item) => item.toString());
    } else if (onChangeValue[0].label === undefined) {
      return [];
    } else {
      return onChangeValue.map((item) => item.value.toString());
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

// export const businessSelectValueFormatter = <T extends string | string[]>(
//   value: ValueType,
//   returnType: T
// ): T => {
//   const valueAsArray = convertToArrayOfStrings(value);
//
//   return typeof returnType === 'string'
//     ? (valueAsArray[0] as T)
//     : (valueAsArray as T);
// };
//
// const filterOption = (inputValue: string, option?: DefaultOptionType) => {
//   if (!option?.label) {
//     return false;
//   }
//   if (React.isValidElement(option.label)) {
//     const labelProps = option.label.props as { children: string[] };
//
//     const labelText = labelProps.children[0] || '';
//
//     return labelText.toLowerCase().includes(inputValue.toLowerCase());
//   }
//   return false;
// };

const UsersManySelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
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
  const take = 50;
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialValues] = useState(value ? convertToArrayOfStrings(value) : []);
  const [selectedMissingUsers, setSelectedMissingUsers] = useState<
    SelectProps['options']
  >([]);

  const { data, fetchMore, loading } = useUsersSelectQuery({
    onCompleted: () => {
      setFetchingMore(false);
    },
    onError: () => {
      setFetchingMore(false);
    },
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
      },
      take,
      where: {
        schemes: {
          some: {
            schemeId: {
              equals: currentSchemeId,
            },
          },
        },
      },
      ...queryVars,
    },
  });

  const [fetchMissing] = useUsersSelectLazyQuery({
    onCompleted: (extraData) => {
      if (extraData.listUsers.users.length > 0) {
        setSelectedMissingUsers(
          extraData.listUsers.users.map((option) => ({
            key: option.id,
            label: option.fullName,
            value: option.id,
          }))
        );
      }
    },
  });

  useEffect(() => {
    if (initialValues.length > 0) {
      const missing = initialValues.filter(
        (item) => !data?.listUsers.users.some((node) => node.id === item)
      );
      if (missing.length > 0) {
        void fetchMissing({
          variables: {
            orderBy: {
              fullName: SortOrder.Asc,
            },
            take: 50,
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
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;
        const prevIds = prev.listUsers?.users.map((node) => node.id);
        return {
          listUsers: {
            ...fetchMoreResult.listUsers,
            users: [
              ...(prev.listUsers?.users || []),
              ...(fetchMoreResult.listUsers?.users.filter(
                (node) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        orderBy: { fullName: SortOrder.Asc },
        skip: data?.listUsers.users.length,
        take: 30,
        where: {
          fullName: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
          schemes: {
            some: {
              schemeId: {
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
      (data?.listUsers.users.length || 0) < (data?.listUsers.total || 0)
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
        const prevIds = prev.listUsers?.users.map((node) => node.id);
        return {
          listUsers: {
            ...fetchMoreResult.listUsers,
            users: [
              ...(prev.listUsers?.users || []),
              ...(fetchMoreResult.listUsers?.users.filter(
                (node) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        orderBy: { fullName: SortOrder.Asc },

        take: 50,
        where: {
          fullName: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
          schemes: {
            some: {
              schemeId: {
                equals: currentSchemeId,
              },
            },
          },
        },
      },
    });
  };

  // function handleValue(value: ValueType, id: string): boolean {
  //   if (Array.isArray(value) && value[0] === undefined) {
  //     return false;
  //   }
  //   if (typeof value === 'string') {
  //     return value === id;
  //   } else if (Array.isArray(value) && typeof value[0] === 'string') {
  //     // @ts-expect-error type error
  //     return value.includes(id);
  //   } else if (typeof value === 'number') {
  //     return false;
  //   } else if (Array.isArray(value) && typeof value[0] === 'number') {
  //     return false;
  //   } else if ((value as LabeledValue).label !== undefined) {
  //     return (value as LabeledValue).value === id;
  //   } else if (
  //     Array.isArray(value) &&
  //     (value[0] as LabeledValue).label !== undefined
  //   ) {
  //     return value.some((v) => (v as LabeledValue).value === id);
  //   } else {
  //     console.log('Unknown value type:', value);
  //     return false;
  //   }
  // }

  // Use useCallback to memoize the debounced function
  const changeHandler = useCallback(
    debounce(handleChange, 800), // 800ms delay
    [debounce, handleChange]
  );

  const sortedData = [...(data?.listUsers?.users || [])];

  const options: SelectProps['options'] = sortedData.map((option) => ({
    key: option.id,
    label: option.fullName,
    value: option.id,
  }));

  const merged = [...(selectedMissingUsers || []), ...options];

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
        if (onChange) onChange(selectedStrings);
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
      value={value || undefined}
      {...props}
    />
  );
};

export default UsersManySelect;
