import { useState } from 'react';
import { useStoreState } from 'state';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useListCrimeGroups = (): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [search, setSearch] = useState('');

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        groups: {
          some: {
            users: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
        },
        OR: [
          {
            alias: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            offenders: {
              some: {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },
                ],
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
    search,
    setSearch,
  };
};

export default useListCrimeGroups;
