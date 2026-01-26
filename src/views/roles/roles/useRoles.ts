import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';

import { SortOrder } from '#/graphql/types';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { RoleSort } from '#/types/enums/role_sort';
import { useRolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

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
  const [pageSize, setPageSize] = useState(100);

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

  // Simply return rawData instead of filtering
  const data = rawData;

  const fetchPage = (page: number) => {
    void fetchMore({
      updateQuery: (_prev, { fetchMoreResult }) =>
        // Replace data instead of appending
        fetchMoreResult || _prev,
      variables: {
        orderBy: getOrderBy[order],
        schemeId: currentScheme || '',
        skip: (page - 1) * pageSize, // Fix: page is 1-indexed from Ant Design
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
