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
  fetchPage: (page: number) => void;
  hasNextPage: boolean;
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

  // Fetch one extra to determine if there's a next page
  const {
    data: rawData,
    fetchMore,
    loading,
  } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: getOrderBy[order],
      skip: 0,
      take: pageSize + 1,
      where,
    },
  });

  // Trim the extra record and determine hasNextPage
  const data = useMemo(() => {
    if (!rawData) return rawData;
    const groups = rawData.groups.slice(0, pageSize);
    return {
      ...rawData,
      groups,
    };
  }, [rawData, pageSize]);

  const hasNextPage = useMemo(
    () => (rawData?.groups?.length || 0) > pageSize,
    [rawData, pageSize]
  );

  const toggleAddGroup = () => {
    setAddGroup(!addGroup);
  };

  const fetchPage = (page: number) => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          groups: [...(prev.groups || []), ...(fetchMoreResult.groups || [])],
        };
      },
      variables: {
        orderBy: getOrderBy[order],
        skip: page * pageSize,
        take: pageSize + 1,
        where,
      },
    });
  };

  const updateGroupList: MutationUpdaterFn<CreateGroupMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<SchemeGroupsQuery>({
      query: SchemeGroupsDocument,
      variables: {
        orderBy: getOrderBy[order],
        skip: 0,
        take: pageSize + 1,
        where,
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<SchemeGroupsQuery>({
      data: {
        __typename: 'Query',
        groups: [...existingData.groups, res.createGroup],
      },
      query: SchemeGroupsDocument,
      variables: {
        orderBy: getOrderBy[order],
        skip: 0,
        take: pageSize + 1,
        where,
      },
    });
  };

  return {
    addGroup,
    data,
    fetchPage,
    hasNextPage,
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
