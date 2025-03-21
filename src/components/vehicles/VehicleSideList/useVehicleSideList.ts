import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { QueryMode } from 'graphql/types';
import { useListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import { useAtomValue } from 'jotai/index';
import { useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListVehiclesQuery['listVehicles'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useVehicleSideList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);
  const filterVariables = useStoreState(
    (state) => state.data.vehicles.variables
  );

  const {
    createdAt: createdAtFilter,
    customGalleries,
    gallery,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;

  const variables = {
    order: {
      updatedAt: order,
    },
    skip: 0,
    take: 12,
    where: {
      OR: [
        {
          make: {
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
          registration: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          model: {
            contains: search,
            mode: QueryMode.Insensitive,
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
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
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
  const { data, fetchMore, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listVehicles: {
            ...fetchMoreResult.listVehicles,
            total:
              fetchMoreResult.listVehicles?.total ||
              prev.listVehicles?.total ||
              0,
            vehicles: [
              ...(prev.listVehicles?.vehicles || []),
              ...(fetchMoreResult.listVehicles?.vehicles || []),
            ],
          },
        };
      },

      variables: {
        ...variables,
        skip: data?.listVehicles.vehicles?.length || 0,
      },
    });
  };

  return {
    data: data?.listVehicles,
    loading: data?.listVehicles ? false : loading,
    next,
  };
};

export default useVehicleSideList;
