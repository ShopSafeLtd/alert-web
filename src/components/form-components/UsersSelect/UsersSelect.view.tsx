import React from 'react';
import { SortOrder, useUsersSelectQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';
import { useGroupsContext } from '#/context/groups-context';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  mode?: 'multiple' | 'tags';
  style?: React.CSSProperties;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
}

const UsersSelect = ({
  onChange,
  value,
  mode,
  style,
  allowClear,
  placeholder,
  className,
}: Props) => {
  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { groups } = useGroupsContext();
  const { data, loading } = useUsersSelectQuery({
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
      },
      where: {
        AND: [
          {
            schemes: {
              some: {
                scheme: {
                  id: {
                    equals: currentSchemeId,
                  },
                },
              },
            },
          },
          {
            groups: {
              some: {
                id: {
                  in: groups.map(({ value: id }) => id),
                },
              },
            },
          },
        ],
      },
    },
  });

  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      options={
        data?.listUsers.users.map((user) => ({
          value: user.id,
          label: user.fullName,
        })) || []
      }
      loading={loading}
      disabled={loading}
      style={style}
      optionFilterProp="label"
      allowClear={allowClear}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default UsersSelect;
