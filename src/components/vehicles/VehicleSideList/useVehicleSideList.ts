import type { ListVehiclesQuery } from 'graphql/generated';
import { QueryMode, useListVehiclesQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListVehiclesQuery['listVehicles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const useVehicleSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const filterVariables = useStoreState(
    (state) => state.data.vehicles.variables
  );

  const {
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    gallery,
    customGalleries,
    order,
  } = filterVariables;

  const variables = {
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
          : undefined,
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
    },
    take: 12,
    skip: 0,
  };
  const { data, loading, fetchMore } = useListVehiclesQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const next = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listVehicles.vehicles?.length || 0,
      },

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
    });
  };

  return {
    data: data?.listVehicles,
    loading: data?.listVehicles ? false : loading,
    next,
  };
};

export default useVehicleSideList;
