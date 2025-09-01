import type { SelectProps } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

import { Select } from 'antd';
import { PoliceForce } from 'graphql/types';
import React from 'react';

interface Props extends Omit<SelectProps, 'onChange' | 'value'> {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string | string[];
}

// Format police force enum to readable text
const formatPoliceForce = (force: string): string =>
  force
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

// Get all police forces from the enum
const policeForces = Object.entries(PoliceForce).map(([_key, value]) => ({
  label: formatPoliceForce(value),
  value,
}));

const PoliceAreaSelect: React.FC<Props> = ({
  allowClear,
  className,
  maxTagCount,
  multiple = true,
  onChange,
  placeholder,
  size,
  style,
  value,
  ...props
}) => (
  <Select
    allowClear={allowClear}
    className={className}
    maxTagCount={maxTagCount}
    mode={multiple ? 'multiple' : undefined}
    onChange={onChange}
    optionFilterProp="label"
    options={policeForces}
    placeholder={placeholder}
    showSearch
    size={size}
    style={style}
    value={value}
    {...props}
  />
);

export default PoliceAreaSelect;
