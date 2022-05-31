import {
  ListIncidentsQuery,
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
} from "graphql/generated";
import { useStoreState, IncidentSort, useStoreActions } from "state";

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
  const setIncidentsState = useStoreActions(actions => actions.data.setIncidents)

  const { data, loading } = useListIncidentsQuery({
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
      where: {
        crimeTypes: variables.crimeTypes.length
          ? {
              some: {
                id: {
                  in: variables.crimeTypes,
                },
              },
            }
          : undefined,
        groups: variables.groups.length
          ? {
              some: {
                id: {
                  in: variables.groups,
                },
              },
            }
          : undefined,
        OR: [
          {
            subject: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              OR: [
                {
                  fullName: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  organisation: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const onPaginationChange = (page: number, pageSize: number) => {
    setIncidentsState({
      pagination: {
        ...pagination,
        page,
        pageSize
      },
      variables,
      order
    })
  };

  return {
    data,
    loading,
    onPaginationChange
  };
};

export default useIncidentSideList;
