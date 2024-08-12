/* eslint-disable react/jsx-props-no-spreading */
import type { InputProps } from 'antd';
import type { ChangeEvent } from 'react';

import { Input } from 'antd';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';

/**
 * @param {Pick<InputProps, "onChange">} onChange
 * @param {Omit<InputProps, "onChange">} props
 * @returns {JSX.Element}
 * @constructor
 */

const DebouncedInput = ({ onChange, ...props }: InputProps): JSX.Element => {
  // Define the function that will be debounced
  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(input); // This check ensures onChange is not undefined when invoked
    }
  };

  // Use useCallback to memoize the debounced function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeHandler = useCallback(
    debounce(handleChange, 500), // 800ms delay
    [debounce, handleChange]
  );

  return (
    <Input
      {...props}
      onChange={(e) => {
        console.log(e.target.value);
        if (!e.target.value) {
          changeHandler.cancel();
          handleChange(e);
          return;
        }
        changeHandler(e);
      }}
    />
  );
};
export default DebouncedInput;
