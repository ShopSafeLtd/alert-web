import { ListBusinessesQuery, useListBusinessesQuery } from 'graphql/generated';
import { useStoreState, useStoreActions } from 'state';

interface Return {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const useBusinessSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { data, loading } = useListBusinessesQuery({
    variables: {
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
    setOffendersState({
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
      order,
    });
  };

  return {
    data,
    loading: data?.listBusinesses ? false : loading,
    onPaginationChange,
  };
};

export default useBusinessSideList;
