import React from 'react';
import { SortOrder, useSchemeGroupsQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  mode?: 'multiple' | 'tags';
  style?: React.CSSProperties;
}

const GroupsSelect = ({ onChange, value, mode, style }: Props) => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useSchemeGroupsQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
    },
  });

  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.groups.map((group) => ({
          value: group.id,
          label: group.name,
        })) || []
      }
      loading={loading}
      disabled={loading}
      style={style}
    />
  );
};

export default GroupsSelect;
