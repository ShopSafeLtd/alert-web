import type { ListOffendersRelayQuery } from 'graphql/generated';
import {
  QueryMode,
  useListOffendersRelayQuery,
  SortOrder,
  Role,
} from 'graphql/generated';
import { OffenderSort, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListOffendersRelayQuery['listOffendersRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  fetchMoreScroll: () => void;
}

const useOffenderSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);

  const order = useStoreState((state) => state.data.offenders.order);
  const filterVariables = useStoreState(
    (state) => state.data.offenders.variables
  );
  const {
    search,
    groups,
    businesses,
    createdAt,
    peculiarities,
    hair,
    warnings,
    ethnicity,
    age,
    build,
    sex,
    gallery,
    customGalleries,
  } = filterVariables;
  const variables = {
    where: {
      schemeId: {
        equals: schemeId,
      },
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      tags:
        warnings.length > 0
          ? {
              some: {
                id: {
                  in: warnings,
                },
              },
            }
          : undefined,
      groups:
        groups.length > 0
          ? {
              some: {
                id: {
                  in: groups,
                },
              },
            }
          : undefined,
      gender:
        sex.length > 0
          ? {
              in: sex,
            }
          : undefined,
      age:
        age.length > 0
          ? {
              in: age,
            }
          : undefined,
      build:
        build.length > 0
          ? {
              in: build,
            }
          : undefined,
      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      hair: hair
        ? {
            contains: hair,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      peculiarities: peculiarities
        ? {
            mode: QueryMode.Insensitive,
            contains: peculiarities,
          }
        : undefined,
      incidents:
        businesses.length > 0
          ? {
              some: {
                business: {
                  id: {
                    in: businesses,
                  },
                },
              },
            }
          : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      name: gallery.includes('ID')
        ? {
            equals: 'Unidentified Offender',
          }
        : undefined,
      active: gallery.includes('ACTIVE')
        ? {
            equals: true,
          }
        : undefined,
      approved:
        role === 'USER'
          ? {
              equals: true,
            }
          : gallery.includes('NOT APPROVED')
          ? {
              equals: false,
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
      bans: gallery.includes('BANNED')
        ? {
            some: {
              active: {
                equals: true,
              },
            },
          }
        : undefined,
      customGalleries:
        customGalleries && customGalleries.length > 0
          ? {
              some: {
                id: {
                  in: customGalleries,
                },
              },
            }
          : undefined,
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          alias: {
            hasSome: [search],
          },
        },
        {
          referenceStr: {
            contains: search,
          },
        },
      ],
    },
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    take: 12,
    skip: 0,
  };
  const { data, loading, fetchMore } = useListOffendersRelayQuery({
    variables,
    fetchPolicy: 'cache-and-network',
    skip: role === Role.User && gallery.includes('NOT APPROVED'),
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listOffendersRelay?.edges?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffendersRelay: {
            ...fetchMoreResult.listOffendersRelay,
            edges: [
              ...(prev.listOffendersRelay?.edges || []),
              ...(fetchMoreResult.listOffendersRelay?.edges || []),
            ],
          },
        };
      },
    });
  };

  return {
    data: data?.listOffendersRelay,
    loading: data?.listOffendersRelay ? false : loading,
    fetchMoreScroll,
  };
};

export default useOffenderSideList;
