import { useUsersSelectQuery } from '#/components/form-components/UsersSelect/__generated__/users-select-query.generated';
import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
  allowClear?: boolean;
  className?: string;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string[];
}

export const useUserData = () => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
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

  return {
    data,
    loading,
    userData:
      data?.listUsers.users.map((user) => ({
        label: user.fullName,
        value: user.id,
      })) || [],
  };
};

const UsersSelect = ({
  allowClear,
  className,
  mode,
  onChange,
  placeholder,
  style,
  value,
}: Props) => {
  const { loading, userData } = useUserData();

  return (
    <Select
      allowClear={allowClear}
      className={className}
      disabled={loading}
      loading={loading}
      mode={mode}
      onChange={onChange}
      optionFilterProp="label"
      options={userData}
      placeholder={placeholder}
      style={style}
      value={value}
    />
  );
};

export default UsersSelect;
