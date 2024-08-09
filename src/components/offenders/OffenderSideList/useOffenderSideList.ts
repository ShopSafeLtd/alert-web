import type { ListOffendersRelayQuery } from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';

import { useListOffendersRelayQuery } from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { OffenderSort, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListOffendersRelayQuery['listOffendersRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
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
    age,
    build,
    businesses,
    createdAt,
    customGalleries,
    ethnicity,
    gallery,
    groups,
    hair,
    peculiarities,
    search,
    sex,
    warnings,
  } = filterVariables;
  const variables = {
    first: 12,
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
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
      active: gallery.includes('ACTIVE')
        ? {
            equals: true,
          }
        : undefined,
      age:
        age.length > 0
          ? {
              in: age,
            }
          : undefined,
      approved:
        role === Role.User
          ? {
              equals: true,
            }
          : gallery.includes('NOT APPROVED')
            ? {
                equals: false,
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
      build:
        build.length > 0
          ? {
              in: build,
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
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
      gender:
        sex.length > 0
          ? {
              in: sex,
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
      hair: hair
        ? {
            contains: hair,
            mode: QueryMode.Insensitive,
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
      name: gallery.includes('ID')
        ? {
            equals: 'Unidentified Offender',
          }
        : undefined,
      peculiarities: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
          }
        : undefined,

      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      schemeId: {
        equals: schemeId,
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
    },
  };
  const { data, fetchMore, loading } = useListOffendersRelayQuery({
    fetchPolicy: 'cache-and-network',
    skip: role === Role.User && gallery.includes('NOT APPROVED'),
    variables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
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
      variables: {
        ...variables,
        after: data?.listOffendersRelay?.pageInfo?.endCursor,
      },
    });
  };

  return {
    data: data?.listOffendersRelay,
    fetchMoreScroll,
    loading: data?.listOffendersRelay ? false : loading,
  };
};

export default useOffenderSideList;
