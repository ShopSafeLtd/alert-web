import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useListCrimeGroups = (): Return => {
  const userId = useAtomValue(userIdAtom);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [search, setSearch] = useState('');

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
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
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
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
