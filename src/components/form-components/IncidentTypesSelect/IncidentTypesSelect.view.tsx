import type { TreeSelectProps } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { TreeSelect } from 'antd';
import { useListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';

interface Props extends TreeSelectProps {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  multiple: boolean;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

const IncidentTypesSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear,
  className,
  maxTagCount,
  multiple,
  onChange,
  placeholder,
  size,
  style,
  value,
  ...props
}) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useListIncidentTagsQuery({
    variables: {
      where: {
        schemeId,
      },
    },
  });

  const treeData = useMemo(
    () =>
      data?.listIncidentTags
        .filter((tag) => tag.tier === 0)
        .map((tag) => ({
          children: data?.listIncidentTags
            .filter((tag2) => tag2.parentId === tag.value)
            .map((tag2) => ({
              children: data?.listIncidentTags
                .filter((tag3) => tag3.parentId === tag2.value)
                .map((tag3) => ({
                  label: tag3.label,
                  value: tag3.value,
                })),
              label: tag2.label,
              value: tag2.value,
            })),
          label: tag.label,
          value: tag.value,
        })),
    [data]
  );

  const onTreeChange = (items: string[]) => {
    console.log(items);
    if (props.treeCheckable) {
      if (onChange) onChange(items);
    } else if (onChange) onChange(items);
  };

  return (
    <TreeSelect
      allowClear={allowClear}
      className={className}
      disabled={loading}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      loading={loading}
      maxTagCount={maxTagCount}
      multiple={multiple}
      onChange={onTreeChange}
      optionFilterProp="label"
      placeholder={placeholder}
      showSearch
      size={size}
      style={style}
      treeData={treeData}
      treeDefaultExpandAll
      treeNodeFilterProp="label"
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default IncidentTypesSelect;
