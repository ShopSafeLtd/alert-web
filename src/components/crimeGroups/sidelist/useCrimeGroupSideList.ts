import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { QueryMode } from 'graphql/types';
import { useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListCrimeGroupsQuery['listCrimeGroups'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useCrimeGroupSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const filterVariables = useStoreState(
    (state) => state.data.crimeGroups.variables
  );
  const {
    createdAt: createdAtFilter,
    gallery,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;
  const variables: ListCrimeGroupsQueryVariables = {
    order: {
      updatedAt: order,
    },
    take: 12,
    where: {
      OR: [
        {
          alias: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          referenceStr: {
            contains: search,
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
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
          }
        : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : {
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
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
    },
  };

  const { data, fetchMore, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listCrimeGroups: {
            ...fetchMoreResult.listCrimeGroups,
            crimeGroups: [
              ...(prev.listCrimeGroups?.crimeGroups || []),
              ...(fetchMoreResult.listCrimeGroups?.crimeGroups || []),
            ],
            total:
              fetchMoreResult.listCrimeGroups?.total ||
              prev.listCrimeGroups?.total ||
              0,
          },
        };
      },

      variables: {
        ...variables,
        skip: data?.listCrimeGroups.crimeGroups?.length || 0,
      },
    });
  };

  return {
    data: data?.listCrimeGroups,
    loading: data?.listCrimeGroups ? false : loading,
    next,
  };
};

export default useCrimeGroupSideList;
