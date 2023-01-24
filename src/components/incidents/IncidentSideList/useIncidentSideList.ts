import {
  ListIncidentsQuery,
  SortOrder,
  useListIncidentsQuery,
} from 'graphql/generated';
import { useStoreState, IncidentSort, useStoreActions } from 'state';

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const useIncidentSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.incidents.order);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const { data, loading } = useListIncidentsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt:
          order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
  });

  const onPaginationChange = (page: number, pageSize: number) => {
    setIncidentsState({
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
    loading: data?.listIncidents ? false : loading,
    onPaginationChange,
  };
};

export default useIncidentSideList;
