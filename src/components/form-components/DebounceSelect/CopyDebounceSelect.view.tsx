/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectProps } from 'antd';
import { Typography, Select, Spin } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  setValue?(args0: ValueType[]): void;
}

/**
 * @param  fetchOptions - the function to call to fetch the options, most likely an apollo query
 * @param  debounceTimeout - the timeout to wait before calling the function
 * @param setValue
 * @param  props { SelectProps}
 * @returns {JSX.Element} - returns a select that when searched will only trigger the search after the debounceTimeout or 200ms after the user has stopped typing. This is used to reduce the number of calls to an api
 * @description - if used in a form, make sure to wrap in a React fragment and use the state as value rather than the form submit value
 * */
const CopyDebounceSelect = <
  ValueType extends {
    key?: string;
    // label: React.ReactNode;
    label: string;
    location?: string;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 200,
  setValue,
  ...props
}: DebounceSelectProps) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      setOptions([]);
      setFetching(true);
      if (setValue && value !== '') {
        setValue([value]);
      }
      void fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select<ValueType>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      optionFilterProp="label"
      optionLabelProp="label"
      // options={options}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {options.map((option) => (
        <Select.Option
          key={option.value}
          value={option.value}
          label={option.label}
        >
          <Typography.Text>{option.label}</Typography.Text>
          {option.location && (
            <Typography.Paragraph
              type="secondary"
              style={{ fontSize: 13, margin: 0 }}
            >
              {option.location}
            </Typography.Paragraph>
          )}
        </Select.Option>
      ))}
    </Select>
  );
};

CopyDebounceSelect.defaultProps = {
  debounceTimeout: 200,
  setValue: () => {},
};
export default CopyDebounceSelect;
