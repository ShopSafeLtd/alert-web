import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useListCrimeGroups = (): Return => {
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
