import type { ListIncidentsAllSchemesQuery } from 'graphql/generated';
import {
  Role,
  QueryMode,
  useListIncidentsAllSchemesQuery,
  SortOrder,
} from 'graphql/generated';
import { IncidentSort, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        undefined | null
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
    search,
    crimeTypes,
    groups,
    businesses,
    goods,
    createdAt,
    incidentDate,
    peculiarities,
    gallery,
  } = filterVariables;

  const variables = {
    take: 12,
    skip: 0,
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
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
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
      business:
        businesses.length > 0
          ? {
              id: {
                in: businesses,
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
      description: peculiarities
        ? {
            mode: QueryMode.Insensitive,
            contains: peculiarities,
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
    },
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
  };
  const { data, loading, fetchMore } = useListIncidentsAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    skip: role === Role.User && gallery.includes('NOT APPROVED'),
  });

  const next = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listIncidentsAllSchemes?.incidents?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listIncidentsAllSchemes: {
            ...fetchMoreResult.listIncidentsAllSchemes,
            total:
              fetchMoreResult.listIncidentsAllSchemes?.total ||
              prev.listIncidentsAllSchemes?.total ||
              0,
            incidents: [
              ...(prev.listIncidentsAllSchemes?.incidents || []),
              ...(fetchMoreResult.listIncidentsAllSchemes?.incidents || []),
            ],
          },
        };
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
