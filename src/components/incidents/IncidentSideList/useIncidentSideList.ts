import type { ListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';

import { useListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { IncidentSort, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        null | undefined
      >
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
    crimeTypes,
    gallery,
    goods,
    groups,
    incidentDate,
    peculiarities,
    search,
  } = filterVariables;

  const variables = {
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    skip: 0,
    take: 12,
    where: {
      AND: [
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
              createdBy: {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },

                  {
                    businesses: {
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
            },
          ],
        },
        {
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
        },
      ],
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
    },
  };
  const { data, fetchMore, loading } = useListIncidentsAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    skip: role === Role.User && gallery.includes('NOT APPROVED'),
    variables,
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listIncidentsAllSchemes: {
            ...fetchMoreResult.listIncidentsAllSchemes,
            incidents: [
              ...(prev.listIncidentsAllSchemes?.incidents || []),
              ...(fetchMoreResult.listIncidentsAllSchemes?.incidents || []),
            ],
            total:
              fetchMoreResult.listIncidentsAllSchemes?.total ||
              prev.listIncidentsAllSchemes?.total ||
              0,
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.listIncidentsAllSchemes?.incidents?.length || 0,
      },
    });
  };

  return {
    data: data?.listIncidentsAllSchemes,
    loading: data?.listIncidentsAllSchemes ? false : loading,
    next,
  };
};

export default useIncidentSideList;
