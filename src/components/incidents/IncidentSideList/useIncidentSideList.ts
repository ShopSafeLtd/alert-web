import type { ListIncidentsFeedQuery } from 'graphql/generated';
import { SortOrder, useListIncidentsFeedQuery } from 'graphql/generated';
import { IncidentSort, useStoreState } from 'state';

interface Return {
  data: ListIncidentsFeedQuery | undefined;
  loading: boolean;
  next: () => void;
}

const useIncidentSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.incidents.order);
  // const variables = useStoreState((state) => state.data.incidents.variables);
  // const setIncidentsState = useStoreActions(
  //   (actions) => actions.data.setIncidents
  // );
  const role = useStoreState((state) => state.user.role);
  const { data, loading, fetchMore } = useListIncidentsFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
      where: {
        approved:
          role === 'USER'
            ? {
                equals: true,
              }
            : undefined,
      },
      order: {
        createdAt:
          order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: 12,
      skip: 0,
    },
  });

  // const onPaginationChange = (page: number, pageSize: number) => {
  //   setIncidentsState({
  //     pagination: {
  //       ...pagination,
  //       page,
  //       pageSize,
  //     },
  //     variables,
  //     order,
  //   });
  // };

  const next = () => {
    void fetchMore({
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          createdAt:
            order === IncidentSort.createdAtDesc
              ? SortOrder.Desc
              : SortOrder.Asc,
        },
        take: 12,
        skip: data?.listIncidents?.incidents?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listIncidents: {
            ...fetchMoreResult.listIncidents,
            total:
              fetchMoreResult.listIncidents?.total ||
              prev.listIncidents?.total ||
              0,
            incidents: [
              ...(prev.listIncidents?.incidents || []),
              ...(fetchMoreResult.listIncidents?.incidents || []),
            ],
          },
        };
      },
    });
  };

  return {
    data,
    loading: data?.listIncidents ? false : loading,
    next,
  };
};

export default useIncidentSideList;
