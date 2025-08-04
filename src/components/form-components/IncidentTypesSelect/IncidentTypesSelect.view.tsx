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
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string | string[];
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

  const { hasNestedStructure, treeData } = useMemo(() => {
    if (!data?.listIncidentTags) {
      return { hasNestedStructure: false, treeData: [] };
    }

    // Check if any tag has children (nested structure)
    const hasNested = data.listIncidentTags.some((tag) =>
      data.listIncidentTags.some((otherTag) => otherTag.parentId === tag.value)
    );

    const tree = data.listIncidentTags
      .filter((tag) => tag.tier === 0)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((tag) => ({
        children: data.listIncidentTags
          .filter((tag2) => tag2.parentId === tag.value)
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((tag2) => ({
            children: data.listIncidentTags
              .filter((tag3) => tag3.parentId === tag2.value)
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((tag3) => ({
                label: tag3.label,
                value: tag3.value,
              })),
            label: tag2.label,
            value: tag2.value,
          })),
        label: tag.label,
        value: tag.value,
      }));

    return { hasNestedStructure: hasNested, treeData: tree };
  }, [data]);

  // Determine if multiple selection should be allowed
  const allowMultiple = multiple === undefined ? !hasNestedStructure : multiple;

  const onTreeChange = (items: string | string[]) => {
    if (onChange) {
      if (allowMultiple && !Array.isArray(items)) {
        onChange([items]);
      } else if (!allowMultiple && Array.isArray(items)) {
        // For single selection with treeCheckable, take the last selected item
        onChange(items.length > 0 ? items.at(-1) : '');
      } else {
        onChange(items);
      }
    }
  };

  return (
    <TreeSelect
      allowClear={allowClear}
      className={className}
      disabled={loading}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      loading={loading}
      maxTagCount={maxTagCount}
      multiple={allowMultiple}
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
