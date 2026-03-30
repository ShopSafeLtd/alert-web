import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { GroupSort } from '#/types/enums/group_sort';
import {
  SchemeGroupsDocument,
  useSchemeGroupsQuery,
} from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';

interface Return {
  addGroup: boolean;
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  order: GroupSort;
  pageSize: number;
  search: string;
  setOrder: (order: GroupSort) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (value: string) => void;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

const getOrderBy = {
  [GroupSort.nameAsc]: [{ name: SortOrder.Asc }],
  [GroupSort.nameDesc]: [{ name: SortOrder.Desc }],
};

const useGroupList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [addGroup, setAddGroup] = useState(false);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<GroupSort>(GroupSort.nameAsc);
  const [pageSize, setPageSize] = useState(25);

  const where = useMemo(
    () => ({
      OR: search
        ? [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ]
        : undefined,
      scheme: { id: { equals: schemeId } },
    }),
    [search, schemeId]
  );

  const { data, loading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: getOrderBy[order],
      where,
    },
  });

  const toggleAddGroup = () => {
    setAddGroup(!addGroup);
  };

  const updateGroupList: MutationUpdaterFn<CreateGroupMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<SchemeGroupsQuery>({
      query: SchemeGroupsDocument,
      variables: {
        orderBy: getOrderBy[order],
        where,
      },
    });

    if (existingData === null) return;

    store.writeQuery<SchemeGroupsQuery>({
      data: {
        __typename: 'Query',
        groups: [...existingData.groups, res.createGroup],
      },
      query: SchemeGroupsDocument,
      variables: {
        orderBy: getOrderBy[order],
        where,
      },
    });
  };

  return {
    addGroup,
    data,
    loading,
    order,
    pageSize,
    search,
    setOrder,
    setPageSize,
    setSearch,
    toggleAddGroup,
    updateGroupList,
  };
};

export default useGroupList;
