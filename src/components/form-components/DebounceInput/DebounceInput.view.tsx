/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputProps } from 'antd';
import { Input } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export interface DebounceInputProps<ValueType = any>
  extends Omit<InputProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  setValue?(args0: ValueType[]): void;
}

const DebounceInput = ({
  fetchOptions,
  debounceTimeout = 200,
  setValue,
  ...props
}: DebounceInputProps) => {
  const [searchText, setSearchText] = useState('');

  // Your search function that you want to debounce
  const handleSearch = debounce((value) => {
    setSearch(value);
    // Perform your search action here
  }, 500); // Specify debounce delay (in milliseconds)

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchText(value || '');
    handleSearch(value); // Call the debounced search function
  };

  return (
    <Input.Search
      size="small"
      // style={{ width: 350 }}
      // placeholder={placeholder}
      value={searchText}
      onChange={handleChange}
      enterButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

DebounceInput.defaultProps = {
  debounceTimeout: 200,
  setValue: () => {},
};
export default DebounceInput;
