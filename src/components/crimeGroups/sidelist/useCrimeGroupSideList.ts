import { useStoreState } from 'state';
import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/list-crime-groups.generated';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';
import { QueryMode } from 'graphql/types';

interface Return {
  data:
    | Exclude<ListCrimeGroupsQuery['listCrimeGroups'], undefined | null>
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
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    gallery,
    order,
  } = filterVariables;
  const variables: ListCrimeGroupsQueryVariables = {
    order: {
      updatedAt: order,
    },
    where: {
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
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
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
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
    },
    take: 12,
  };

  const { data, loading, fetchMore } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const next = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listCrimeGroups.crimeGroups?.length || 0,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listCrimeGroups: {
            ...fetchMoreResult.listCrimeGroups,
            total:
              fetchMoreResult.listCrimeGroups?.total ||
              prev.listCrimeGroups?.total ||
              0,
            crimeGroups: [
              ...(prev.listCrimeGroups?.crimeGroups || []),
              ...(fetchMoreResult.listCrimeGroups?.crimeGroups || []),
            ],
          },
        };
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
