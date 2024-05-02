import React from 'react';
import { SortOrder, useUsersSelectQuery } from 'graphql/generated';
import { Select } from 'antd';
import { useStoreState } from 'state';

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
  const groups = useStoreState((state) => state.user.groups);

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
                  in: groups.map(({ id }) => id),
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
