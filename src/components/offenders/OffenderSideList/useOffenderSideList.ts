import {
  ListOffendersQuery,
  SortOrder,
  useListOffendersQuery,
} from 'graphql/generated';
import { useStoreState, OffenderSort, useStoreActions } from 'state';

interface Return {
  data: ListOffendersQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const useOffenderSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { data, loading } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
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
    loading: data?.listOffenders ? false : loading,
    onPaginationChange,
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
  };
};

export default useOffenderSideList;
