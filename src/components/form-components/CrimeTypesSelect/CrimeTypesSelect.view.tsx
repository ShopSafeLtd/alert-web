import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { Model, SortOrder, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';

import { useTagsSelectQuery } from './__generated__/tags-select-query.generated';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string[];
}

export const useCrimeTypesData = () => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useTagsSelectQuery({
    variables: {
      order: { name: SortOrder.Asc },
      where: {
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              in: [currentSchemeId],
            },
          },
        },
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
    },
  });

  return {
    data,
    loading,
    tagsData:
      data?.listTags.tags?.map((tag) => ({
        label: tag?.name || '',
        value: tag?.id || '',
      })) || [],
  };
};

const CrimeTypesSelect = ({
  allowClear,
  className,
  maxTagCount,
  mode,
  onChange,
  placeholder,
  style,
  value,
}: Props) => {
  const { loading, tagsData } = useCrimeTypesData();

  return (
    <Select
      allowClear={allowClear}
      className={className}
      disabled={loading}
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      onChange={onChange}
      optionFilterProp="label"
      options={tagsData}
      placeholder={placeholder}
      style={style}
      value={value}
    />
  );
};

export default CrimeTypesSelect;
