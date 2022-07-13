import {
  ListOffendersQuery,
  QueryMode,
  SortOrder,
  useListOffendersQuery,
} from 'graphql/generated';
import { useStoreState, OffenderSort, useStoreActions } from 'state';

interface Return {
  data: ListOffendersQuery | undefined;
  // loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const useOffenderSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const {
    data,
    // loading
  } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt:
          order === OffenderSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        tags: variables.tags.length
          ? {
              some: {
                id: {
                  in: variables.tags,
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
            name: {
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
    // loading,
    onPaginationChange,
  };
};

export default useOffenderSideList;
