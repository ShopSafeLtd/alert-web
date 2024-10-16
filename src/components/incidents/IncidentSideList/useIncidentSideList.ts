import type {
  IncidentsFeedQuery,
  IncidentsFeedQueryVariables,
} from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';

import { useIncidentsFeedQuery } from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { IncidentSort, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<IncidentsFeedQuery['incidentsRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useIncidentSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const filterVariables = useStoreState(
    (state) => state.data.incidents.variables
  );
  const order = useStoreState((state) => state.data.incidents.order);
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);

  const {
    businesses,
    createdAt,
    createdBy,
    crimeTypes,
    gallery,
    goods,
    groups,
    incidentDate,
    peculiarities,
    priority,
    search,
  } = filterVariables;
  const isUser = role === Role.User;
  const variables: IncidentsFeedQueryVariables = {
    approved: isUser
      ? true
      : gallery.includes('NOT APPROVED')
        ? false
        : undefined,
    first: 12,
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    schemeId,
    where: {
      AND: search
        ? [
            {
              OR: [
                {
                  subject: {
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
                  business: {
                    name: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
                {
                  createdBy: {
                    fullName: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
                {
                  offenders: {
                    some: {
                      name: {
                        contains: search,
                        mode: QueryMode.Insensitive,
                      },
                    },
                  },
                },
                {
                  crimeTypes: {
                    some: {
                      name: {
                        contains: search,
                        mode: QueryMode.Insensitive,
                      },
                    },
                  },
                },
              ],
            },
          ]
        : undefined,
      approved: isUser
        ? {
            equals: true,
          }
        : gallery.includes('NOT APPROVED')
          ? {
              equals: false,
            }
          : undefined,
      business:
        businesses.length > 0
          ? {
              id: {
                in: businesses,
              },
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      createdBy:
        gallery.includes('MYDATA') || createdBy.length > 0
          ? {
              id: {
                in: gallery.includes('MYDATA') ? [userId] : createdBy,
              },
            }
          : undefined,
      crimeTypes:
        crimeTypes.length > 0
          ? {
              some: {
                id: {
                  in: crimeTypes,
                },
              },
            }
          : undefined,
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
          }
        : undefined,
      description: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
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
      incidentItems:
        goods.length > 0
          ? {
              some: {
                goodsType: {
                  id: {
                    in: goods,
                  },
                },
              },
            }
          : undefined,
      policeInvolved: gallery.includes('POLICEINVOLVED')
        ? {
            equals: true,
          }
        : undefined,
      policeReported: gallery.includes('POLICEREPORTED')
        ? {
            equals: true,
          }
        : undefined,
      priority:
        priority.length > 0
          ? {
              in: priority,
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
    },
  };

  const { data, fetchMore, loading } = useIncidentsFeedQuery({
    fetchPolicy: 'cache-and-network',
    skip: role === Role.User && gallery.includes('NOT APPROVED'),
    variables,
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          incidentsRelay: {
            ...fetchMoreResult.incidentsRelay,
            edges: [
              ...(prev.incidentsRelay?.edges || []),
              ...(fetchMoreResult.incidentsRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.incidentsRelay?.edges?.length || 0,
      },
    });
  };

  return {
    data: data?.incidentsRelay,
    loading: data?.incidentsRelay ? false : loading,
    next,
  };
};

export default useIncidentSideList;
