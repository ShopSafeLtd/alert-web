import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';

import { SortOrder } from '#/graphql/types';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { RoleSort } from '#/types/enums/role_sort';
import { useRolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';

interface Return {
  data: RolesQuery | undefined;
  fetchPage: (page: number) => void;
  loading: boolean;
  order: RoleSort;
  pageSize: number;
  search: string;
  setOrder: (order: RoleSort) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
}

const getOrderBy = {
  [RoleSort.nameAsc]: {
    name: SortOrder.Asc,
  },
  [RoleSort.nameDesc]: {
    name: SortOrder.Desc,
  },
  [RoleSort.typeAsc]: {
    type: SortOrder.Asc,
  },
  [RoleSort.typeDesc]: {
    type: SortOrder.Desc,
  },
  [RoleSort.usersCountAsc]: {
    users: {
      _count: SortOrder.Asc,
    },
  },
  [RoleSort.usersCountDesc]: {
    users: {
      _count: SortOrder.Desc,
    },
  },
};

const useRoles = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<RoleSort>(RoleSort.nameAsc);
  const [pageSize, setPageSize] = useState(25);

  const {
    data: rawData,
    fetchMore,
    loading,
  } = useRolesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: getOrderBy[order],
      schemeId: currentScheme || '',
      take: pageSize,
    },
  });

  // Client-side filtering based on search
  const data = useMemo(() => {
    if (!rawData || !search) return rawData;

    return {
      ...rawData,
      roles: {
        ...rawData.roles,
        edges:
          rawData.roles?.edges.filter(({ node: role }) =>
            role?.name?.toLowerCase().includes(search.toLowerCase())
          ) || [],
        totalCount:
          rawData.roles?.edges.filter(({ node: role }) =>
            role?.name?.toLowerCase().includes(search.toLowerCase())
          ).length || 0,
      },
    };
  }, [rawData, search]);

  const fetchPage = (page: number) => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          roles: {
            ...fetchMoreResult.roles,
            edges: [
              ...(prev.roles?.edges || []),
              ...(fetchMoreResult.roles?.edges || []),
            ],
          },
        };
      },
      variables: {
        orderBy: getOrderBy[order],
        schemeId: currentScheme || '',
        skip: page * pageSize,
        take: pageSize,
      },
    });
  };

  return {
    data,
    fetchPage,
    loading,
    order,
    pageSize,
    search,
    setOrder,
    setPageSize,
    setSearch,
  };
};
export default useRoles;
