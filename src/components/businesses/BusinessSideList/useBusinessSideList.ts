import type { ListBusinessesQuery } from 'graphql/generated';
import { SortOrder, useListBusinessesQuery } from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  next: () => void;
}

const useBusinessSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading, fetchMore } = useListBusinessesQuery({
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
      orderBy: { name: SortOrder.Asc },
      take: 12,
    },
    fetchPolicy: 'cache-and-network',
  });

  const next = () => {
    void fetchMore({
      variables: {
        scheme: {
          id: schemeId,
        },
        orderBy: { name: SortOrder.Asc },
        take: 12,
        skip: data?.listBusinesses.businesses?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listBusinesses: {
            ...fetchMoreResult.listBusinesses,
            total:
              fetchMoreResult.listBusinesses?.total ||
              prev.listBusinesses?.total ||
              0,
            businesses: [
              ...(prev.listBusinesses?.businesses || []),
              ...(fetchMoreResult.listBusinesses?.businesses || []),
            ],
          },
        };
      },
    });
  };

  return {
    data,
    loading: data?.listBusinesses ? false : loading,
    next,
  };
};

export default useBusinessSideList;
