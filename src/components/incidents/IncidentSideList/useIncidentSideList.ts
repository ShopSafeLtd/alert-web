import type {
  IncidentsFeedQuery,
  IncidentsFeedQueryVariables,
} from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';

import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { useIncidentsFeedQuery } from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import {
  PermissionMethod,
  PermissionModel,
  QueryMode,
  SortOrder,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
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
  const userId = useAtomValue(userIdAtom);

  const hasApprovePermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Approve,
      model: PermissionModel.Incidents,
    },
  });

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
  const variables: IncidentsFeedQueryVariables = {
    approved: hasApprovePermission
      ? gallery.includes('NOT APPROVED')
        ? false
        : undefined
      : true,
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
      approved: hasApprovePermission
        ? gallery.includes('NOT APPROVED')
          ? {
              equals: false,
            }
          : undefined
        : {
            equals: true,
          },
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
    skip: !hasApprovePermission && gallery.includes('NOT APPROVED'),
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
        after: data?.incidentsRelay?.pageInfo.endCursor,
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
