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

  const treeData = useMemo(() => {
    if (!data?.listIncidentTags) {
      return [];
    }

    return data.listIncidentTags
      .filter((tag) => tag.tier === 0)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((tag) => {
        const tier1Children = data.listIncidentTags
          .filter((tag2) => tag2.parentId === tag.value)
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((tag2) => {
            const tier2Children = data.listIncidentTags
              .filter((tag3) => tag3.parentId === tag2.value)
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((tag3) => ({
                label: tag3.label,
                value: tag3.value,
              }));

            return {
              ...(tier2Children.length > 0 && { children: tier2Children }),
              label: tag2.label,
              value: tag2.value,
            };
          });

        return {
          ...(tier1Children.length > 0 && { children: tier1Children }),
          label: tag.label,
          value: tag.value,
        };
      });
  }, [data]);

  // Normalize incoming values: convert labels to IDs if needed
  // This handles legacy data that stores labels instead of IDs
  const normalizedValue = useMemo(() => {
    if (!value || !data?.listIncidentTags) return value;

    // Create lookup maps for both directions
    const valueSet = new Set(data.listIncidentTags.map((tag) => tag.value));
    const labelToIdMap = new Map(
      data.listIncidentTags.map((tag) => [tag.label, tag.value])
    );

    const valueArray = Array.isArray(value) ? value : [value];

    const normalized = valueArray.map((v) => {
      // If it's already a valid ID, keep it as-is (backward compatibility)
      if (valueSet.has(v)) {
        return v;
      }
      // Otherwise, try to convert label to ID
      return labelToIdMap.get(v) || v;
    });

    return Array.isArray(value) ? normalized : normalized[0];
  }, [value, data]);

  // Determine if multiple selection should be allowed
  // Default to true to support multiple selections (most common use case)
  const allowMultiple = multiple ?? true;

  const onTreeChange = (items: string | string[]) => {
    if (onChange) {
      if (allowMultiple && !Array.isArray(items)) {
        onChange([items]);
      } else if (!allowMultiple && Array.isArray(items)) {
        // For single selection with treeCheckable, take the last selected item
        onChange(items.length > 0 ? items.at(-1) || '' : '');
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
      showCheckedStrategy={TreeSelect.SHOW_ALL}
      showSearch
      size={size}
      style={style}
      treeCheckable={allowMultiple}
      treeData={treeData}
      treeDefaultExpandAll
      treeNodeFilterProp="label"
      value={loading ? undefined : normalizedValue}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default IncidentTypesSelect;
