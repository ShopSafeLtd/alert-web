import type { ListVehiclesQuery } from 'graphql/generated';
import { useListVehiclesQuery } from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const useVehicleSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const pagination = useStoreState((state) => state.data.vehicles.pagination);
  const variables = useStoreState((state) => state.data.vehicles.variables);
  const setVehiclesState = useStoreActions(
    (actions) => actions.data.setVehicles
  );

  const { data, loading } = useListVehiclesQuery({
    variables: {
      order: {
        updatedAt: variables.order,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number, pageSize: number) => {
    setVehiclesState({
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
    });
  };

  return {
    data,
    loading: data?.listVehicles ? false : loading,
    onPaginationChange,
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  };
};

export default useVehicleSideList;
